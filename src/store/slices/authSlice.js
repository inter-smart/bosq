"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import {
  login as loginAPI,
  register as registerAPI,
  verifyOtp as verifyOtpAPI,
  forgotPassword as forgotPasswordAPI,
  verifyResetPasswordOtp as verifyResetPasswordOtpAPI,
  logout as logoutAPI,
  fetchFromAPI,
  fetchUserProfileAPI,
  googleLogin as googleLoginAPI,
  resetRefreshPromise,
} from "@/lib/helper";
import { mergeCartAPI } from "@/lib/api/cart/cartApi";
import { getPersistor } from "../persistorInstance";

// Async Thunks

// Login user
export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data, error, message } = await loginAPI(credentials);

    if (error) {
      return rejectWithValue(message);
    }

    try {
      await mergeCartAPI();
    } catch (mergeError) {
      console.error("Cart merge failed:", mergeError);
    }

    const user = data.user || null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel("bosq_auth");
      bc.postMessage({ type: "LOGIN", user });
      bc.close();
    }
    return { accessToken: data.accessToken, user };
  } catch (error) {
    return rejectWithValue(error.message || "Login failed");
  }
});

// Google login
export const googleLoginUser = createAsyncThunk("auth/googleLogin", async (token, { rejectWithValue }) => {
  try {
    const { data, error, message } = await googleLoginAPI(token);

    if (error) {
      return rejectWithValue(message);
    }

    try {
      await mergeCartAPI();
    } catch (mergeError) {
      console.error("Cart merge failed:", mergeError);
    }

    const user = data.user || null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel("bosq_auth");
      bc.postMessage({ type: "LOGIN", user });
      bc.close();
    }
    return { accessToken: data.accessToken, user };
  } catch (error) {
    return rejectWithValue(error.message || "Google login failed");
  }
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logout", async (_, { getState }) => {
  const wasAuthenticated = getState().auth.isAuthenticated;
  resetRefreshPromise();
  // Call server to clear HTTP-only cookie — always clear local state even if API fails
  try {
    await logoutAPI();
  } catch (e) {
    // ignore network/server errors
  }
  // Explicitly purge persisted auth data from localStorage so stale user/isGoogleUser
  // can't be rehydrated if the tab was closed before redux-persist flushed null values.
  getPersistor()?.purge();
  // Only broadcast if the user was actually authenticated — prevents re-broadcast loops
  // when logoutUser() is called reactively (e.g. from baseQueryWithReauth on 401).
  if (wasAuthenticated && typeof window !== "undefined" && "BroadcastChannel" in window) {
    const bc = new BroadcastChannel("bosq_auth");
    bc.postMessage({ type: "LOGOUT" });
    bc.close();
  }
  return true;
});

// Register user
export const registerUser = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data, error, message } = await registerAPI(credentials);

    if (error) {
      return rejectWithValue(message);
    }

    localStorage.setItem("email", data.email);

    return {
      email: data.email || credentials.email,
      ...data,
    };
  } catch (error) {
    return rejectWithValue(error.message || "Registration failed");
  }
});

// Verify OTP (registration flow)
export const verifyOtpThunk = createAsyncThunk("auth/verifyOtp", async ({ otp, email }, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const verifyEmail = email || state.auth.pendingEmail || localStorage.getItem("email");

    const { data, error, message } = await verifyOtpAPI({
      otp,
      email: verifyEmail,
    });

    if (error) {
      return rejectWithValue(message);
    }

    if (data) {
      localStorage.removeItem("email");
    }

    return {
      tempToken: data.tempToken,
    };
  } catch (error) {
    return rejectWithValue(error.message || "OTP verification failed");
  }
});

// Create password (after OTP verification)
export const createPasswordThunk = createAsyncThunk("auth/createPassword", async (password, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState();

    const { data, error, message } = await fetchFromAPI("/api/frontend/auth/create-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.tempToken}`,
      },
      body: JSON.stringify({ password }),
    });

    if (error) {
      return rejectWithValue(message);
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Password creation failed");
  }
});

// Forgot password - send OTP
export const forgotPasswordThunk = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const { data, error, message } = await forgotPasswordAPI(email);

    if (error) {
      return rejectWithValue(message);
    }

    return { email, ...data };
  } catch (error) {
    return rejectWithValue(error.message || "Failed to send reset email");
  }
});

// Verify reset password OTP
export const verifyResetOtpThunk = createAsyncThunk("auth/verifyResetOtp", async ({ otp, email }, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const verifyEmail = email || state.auth.pendingEmail;

    const { data, error, message } = await verifyResetPasswordOtpAPI({
      otp,
      email: verifyEmail,
    });

    if (error) {
      return rejectWithValue(message);
    }

    return {
      resetToken: data.resetToken,
    };
  } catch (error) {
    return rejectWithValue(error.message || "Reset OTP verification failed");
  }
});

// Reset password
export const resetPasswordThunk = createAsyncThunk("auth/resetPassword", async (password, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState();

    const { data, error, message } = await fetchFromAPI("/api/frontend/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.resetToken}`,
      },
      body: JSON.stringify({ password }),
    });

    if (error) {
      return rejectWithValue(message);
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Password reset failed");
  }
});

// Fetch user profile
export const fetchUserProfile = createAsyncThunk("frontend/profile/my-profile", async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data, error, message } = await fetchUserProfileAPI();

    if (error) {
      dispatch(logoutUser());
      return rejectWithValue(message);
    }

    return data;
  } catch (error) {
    dispatch(logoutUser());
    return rejectWithValue(error.message || "Failed to fetch profile");
  }
});

// Initial state
const initialState = {
  user: null,
  tempToken: null,
  resetToken: null,
  pendingEmail: null,
  isAuthenticated: false,
  isGoogleUser: false,
  isLoading: false,
  error: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.tempToken = null;
      state.resetToken = null;
      state.pendingEmail = null;
      state.isAuthenticated = false;
      state.isGoogleUser = false;
      state.error = null;
    },
    setTempToken: (state, action) => {
      state.tempToken = action.payload;
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loginFromBroadcast: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        if (action.key === "auth" && action.payload?.user) {
          state.isAuthenticated = true;
        }
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isGoogleUser = false;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      // Google Login
      .addCase(googleLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isGoogleUser = true;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Google login failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.tempToken = null;
        state.resetToken = null;
        state.pendingEmail = null;
        state.isAuthenticated = false;
        state.isGoogleUser = false;
        state.error = null;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })

      // Verify OTP
      .addCase(verifyOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempToken = action.payload.tempToken;
        state.error = null;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "OTP verification failed";
      })

      // Create Password
      .addCase(createPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.tempToken = null;
        state.pendingEmail = null;
        state.error = null;
      })
      .addCase(createPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Password creation failed";
      })

      // Forgot Password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to send reset email";
      })

      // Verify Reset OTP
      .addCase(verifyResetOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyResetOtpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetToken = action.payload.resetToken;
        state.error = null;
      })
      .addCase(verifyResetOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Reset OTP verification failed";
      })

      // Reset Password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.resetToken = null;
        state.pendingEmail = null;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Password reset failed";
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isGoogleUser = false;
        state.tempToken = null;
        state.resetToken = null;
        state.pendingEmail = null;
        state.error = null;
      });
  },
});

export const { clearError, clearAuth, setTempToken, setResetToken, setPendingEmail, setUser, loginFromBroadcast } = authSlice.actions;

export default authSlice.reducer;
