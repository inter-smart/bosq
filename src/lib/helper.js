export function parseOtherMeta(htmlString) {
  if (!htmlString || htmlString.trim() === "") {
    return { other: {}, scripts: [] };
  }

  const other = {};
  const scripts = [];

  // Extract meta tags
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match;

  while ((match = metaRegex.exec(htmlString)) !== null) {
    const attributes = match[1];

    // Parse attributes
    const nameMatch = attributes.match(/name=["']([^"']+)["']/);
    const propertyMatch = attributes.match(/property=["']([^"']+)["']/);
    const httpEquivMatch = attributes.match(/http-equiv=["']([^"']+)["']/);
    const contentMatch = attributes.match(/content=["']([^"']+)["']/);

    const content = contentMatch ? contentMatch[1] : "";

    if (nameMatch) {
      other[nameMatch[1]] = content;
    } else if (propertyMatch) {
      other[propertyMatch[1]] = content;
    } else if (httpEquivMatch) {
      other[httpEquivMatch[1]] = content;
    }
  }

  // Extract script tags (for JSON-LD)
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;

  while ((scriptMatch = scriptRegex.exec(htmlString)) !== null) {
    try {
      const jsonContent = scriptMatch[1].trim();
      scripts.push(JSON.parse(jsonContent));
    } catch (e) {
      console.error("Failed to parse JSON-LD:", e);
    }
  }

  return { other, scripts };
}

export async function fetchFromAPI(endpoint, options = {}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: true,
        message: data?.message || data?.error?.message || `Error: ${response.status} ${response.statusText}`,
      };
    }

    return {
      data: data?.success ? data?.data : null,
      error: !data?.success,
      message: data?.message || data?.error.message || "An error occurred",
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error?.message || "Network error. Please check your connection.",
    };
  }
}

export async function fetchFromAPIWithCredentials(endpoint, options = {}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: true,
        message: data?.message || data?.error?.message || `Error: ${response.status} ${response.statusText}`,
      };
    }

    return {
      data: data?.success ? data?.data : null,
      error: !data?.success,
      message: data?.message || data?.error?.message || "An error occurred",
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error?.message || "Network error. Please check your connection.",
    };
  }
}

export async function fetchWithCredentials(endpoint, options = {}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  const data = await response.json();

  if (!response.ok || data?.success === false) {
    let message = data?.message || data?.error;

    if (typeof message === "string") {
      message = {
        en: message,
        ar: message, // fallback (or you can customize)
      };
    } else if (typeof message === "object" && message !== null) {
      message = {
        en: message.en || message.ar || "Something went wrong",
        ar: message.ar || message.en || "حدث خطأ ما",
      };
    } else {
      message = {
        en: "Something went wrong",
        ar: "حدث خطأ ما",
      };
    }

    throw message; // ✅ ALWAYS object now
  }

  return data?.data;
}

export async function register(credentials) {
  return fetchFromAPI("/api/frontend/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function verifyOtp(credentials) {
  const email = localStorage.getItem("email");
  return fetchFromAPI("/api/frontend/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ ...credentials, email }),
  });
}

export async function createPassword(password) {
  const token = localStorage.getItem("auth-token");
  return fetchFromAPI("/api/frontend/auth/create-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
}

// login
export async function login(credentials) {
  return fetchFromAPIWithCredentials("/api/frontend/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// forgot password
export async function forgotPassword(email) {
  return fetchFromAPI("/api/frontend/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// verifyResetPasswordOtp

export async function verifyResetPasswordOtp({ otp, email }) {
  console.log(otp, email);
  return fetchFromAPI("/api/frontend/auth/verify-reset-password-otp", {
    method: "POST",
    body: JSON.stringify({ otp, email }),
  });
}

// reset password
export async function resetPassword({ password }) {
  const resetToken = localStorage.getItem("reset_token");
  return fetchFromAPI("/api/frontend/auth/reset-password", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resetToken}`,
    },
    body: JSON.stringify({ password }),
  });
}

// google login
export async function googleLogin(token) {
  return fetchFromAPIWithCredentials("/api/frontend/auth/google-login", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

// logout
export async function logout() {
  return fetchFromAPIWithCredentials("/api/frontend/profile/logout", {
    method: "POST",
  });
}

// fetch user profile
export async function fetchUserProfileAPI() {
  return fetchFromAPIWithCredentials("/api/frontend/auth/profile", {
    method: "GET",
  });
}
