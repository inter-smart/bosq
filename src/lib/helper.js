import { locales, defaultLocale } from "@/il8n/config";

export function getLocale() {
  if (typeof window !== "undefined") {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

    const pathname = window.location.pathname;
    const locale = locales.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
    );
    return locale || defaultLocale;
  }
  return defaultLocale;
}

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
  const scriptRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
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

function getApiBaseUrl() {
  // Server-side (SSR/API routes): use API_URL (full backend URL)
  // Client-side: use NEXT_PUBLIC_API_BASE_URL (may be /api/proxy in production)
  if (typeof window === "undefined") {
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

export async function fetchFromAPI(endpoint, options = {}) {
  const API_BASE_URL = getApiBaseUrl();

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
        message:
          data?.message ||
          data?.error?.message ||
          `Error: ${response.status} ${response.statusText}`,
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
  const API_BASE_URL = getApiBaseUrl();
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
    let response = await fetch(url, defaultOptions);
    let data = await response.json();

    // Attempt silent token refresh on 401 and retry once
    if (response.status === 401) {
      const refreshed = await attemptTokenRefresh();
      if (refreshed) {
        response = await fetch(url, defaultOptions);
        data = await response.json();
      }
    }

    if (!response.ok) {
      return {
        data: null,
        error: true,
        message:
          data?.message ||
          data?.error?.message ||
          `Error: ${response.status} ${response.statusText}`,
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

let _refreshPromise = null;

export async function attemptTokenRefresh() {
  // Deduplicate concurrent refresh calls
  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = (async () => {
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(
        `${API_BASE_URL}/api/frontend/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      return response.ok;
    } catch {
      return false;
    } finally {
      _refreshPromise = null;
    }
  })();

  return _refreshPromise;
}

export async function fetchWithCredentials(endpoint, options = {}) {
  const API_BASE_URL = getApiBaseUrl();
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
  return fetchFromAPI("/api/frontend/auth/verify-reset-password-otp", {
    method: "POST",
    body: JSON.stringify({ otp, email }),
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
  return fetchFromAPIWithCredentials("/api/frontend/profile/my-profile", {
    method: "GET",
  });
}

export const getExternalLink = (link) => {
  const locale = getLocale();

  return link.startsWith("/") ? `/${locale}${link}` : link;
};

export const getTarget = (link) => {
  // return link.startsWith("/") ? "_self" : "_blank";
  return "_self";
};
