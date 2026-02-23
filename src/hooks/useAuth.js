"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyOtpThunk,
  createPasswordThunk,
  forgotPasswordThunk,
  verifyResetOtpThunk,
  resetPasswordThunk,
  fetchUserProfile,
  googleLoginUser,
  clearError,
  clearAuth,
  setPendingEmail,
} from "@/store/slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const {
    user,
    accessToken,
    tempToken,
    resetToken,
    pendingEmail,
    isAuthenticated,
    isGoogleUser,
    isLoading,
    error,
  } = useAppSelector((state) => state.auth);

  // Login
  const login = useCallback(
    async (credentials) => {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Logout
  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    return { success: true };
  }, [dispatch]);

  // Register
  const register = useCallback(
    async (credentials) => {
      const result = await dispatch(registerUser(credentials));
      if (registerUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Set pending email (for OTP flow)
  const setEmail = useCallback(
    (email) => {
      dispatch(setPendingEmail(email));
    },
    [dispatch]
  );

  // Verify OTP
  const verifyOtp = useCallback(
    async (otp, email) => {
      const result = await dispatch(verifyOtpThunk({ otp, email }));
      if (verifyOtpThunk.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Create Password
  const createPassword = useCallback(
    async (password) => {
      const result = await dispatch(createPasswordThunk(password));
      if (createPasswordThunk.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Forgot Password
  const forgotPassword = useCallback(
    async (email) => {
      const result = await dispatch(forgotPasswordThunk(email));
      if (forgotPasswordThunk.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Verify Reset OTP
  const verifyResetOtp = useCallback(
    async (otp, email) => {
      const result = await dispatch(verifyResetOtpThunk({ otp, email }));
      if (verifyResetOtpThunk.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Reset Password
  const resetPassword = useCallback(
    async (password) => {
      const result = await dispatch(resetPasswordThunk(password));
      if (resetPasswordThunk.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );


  // Google Login
  const googleLogin = useCallback(
    async (token) => {
      const result = await dispatch(googleLoginUser(token));
      if (googleLoginUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      }
      return { success: false, error: result.payload };
    },
    [dispatch]
  );

  // Clear error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Full clear
  const clearAllAuth = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    // State
    user,
    accessToken,
    tempToken,
    resetToken,
    pendingEmail,
    isAuthenticated,
    isGoogleUser,
    isLoading,
    error,

    // Actions
    login,
    logout,
    register,
    setEmail,
    verifyOtp,
    createPassword,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    googleLogin,
    clearAuthError,
    clearAllAuth,
  };
}
