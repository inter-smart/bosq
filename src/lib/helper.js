import { locales, defaultLocale } from "@/il8n/config";

export function getLocale() {
  if (typeof window !== "undefined") {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

    const pathname = window.location.pathname;
    const locale = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
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
    const nameMatch = attributes.match(/name=["']([^"']+)["']/i);
    const propertyMatch = attributes.match(/property=["']([^"']+)["']/i);
    const httpEquivMatch = attributes.match(/http-equiv=["']([^"']+)["']/i);
    const contentMatch = attributes.match(/content=["']([^"']+)["']/i);

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
    } catch (e) {}
  }

  return { other, scripts };
}

export function parseMetaTags(htmlString) {
  if (!htmlString || typeof htmlString !== "string" || htmlString.trim() === "") {
    return { other: {}, links: [], scripts: [], inlineScripts: [] };
  }

  const other = {};
  const links = [];
  const scripts = [];
  const inlineScripts = []; // NEW: Store inline scripts separately

  try {
    // ==========================================
    // 1. PARSE META TAGS (same as before)
    // ==========================================
    const metaRegex = /<meta\s+([^>]+?)>/gi;
    let metaMatch;

    while ((metaMatch = metaRegex.exec(htmlString)) !== null) {
      const attributes = metaMatch[1];

      const nameMatch = attributes.match(/name\s*=\s*["']([^"']+)["']/i);
      const propertyMatch = attributes.match(/property\s*=\s*["']([^"']+)["']/i);
      const httpEquivMatch = attributes.match(/http-equiv\s*=\s*["']([^"']+)["']/i);
      const charsetMatch = attributes.match(/charset\s*=\s*["']?([^"'\s>]+)["']?/i);
      const contentMatch = attributes.match(/content\s*=\s*["']([^"']*)["']/i);
      const itemPropMatch = attributes.match(/itemprop\s*=\s*["']([^"']+)["']/i);

      const content = contentMatch ? contentMatch[1] : "";

      if (charsetMatch) {
        other["charset"] = charsetMatch[1];
      } else if (nameMatch) {
        other[nameMatch[1]] = content;
      } else if (propertyMatch) {
        other[propertyMatch[1]] = content;
      } else if (httpEquivMatch) {
        other[httpEquivMatch[1]] = content;
      } else if (itemPropMatch) {
        other[`itemprop:${itemPropMatch[1]}`] = content;
      }
    }

    // ==========================================
    // 2. PARSE LINK TAGS (same as before)
    // ==========================================
    const linkRegex = /<link\s+([^>]+?)>/gi;
    let linkMatch;

    while ((linkMatch = linkRegex.exec(htmlString)) !== null) {
      const attributes = linkMatch[1];

      const relMatch = attributes.match(/rel\s*=\s*["']([^"']+)["']/i);
      const hrefMatch = attributes.match(/href\s*=\s*["']([^"']+)["']/i);
      const hreflangMatch = attributes.match(/hreflang\s*=\s*["']([^"']+)["']/i);
      const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i);
      const sizesMatch = attributes.match(/sizes\s*=\s*["']([^"']+)["']/i);
      const mediaMatch = attributes.match(/media\s*=\s*["']([^"']+)["']/i);
      const asMatch = attributes.match(/as\s*=\s*["']([^"']+)["']/i);
      const crossoriginMatch = attributes.match(/crossorigin\s*=\s*["']([^"']+)["']/i);

      if (relMatch && hrefMatch) {
        const linkObj = {
          rel: relMatch[1],
          href: hrefMatch[1],
        };

        if (hreflangMatch) linkObj.hreflang = hreflangMatch[1];
        if (typeMatch) linkObj.type = typeMatch[1];
        if (sizesMatch) linkObj.sizes = sizesMatch[1];
        if (mediaMatch) linkObj.media = mediaMatch[1];
        if (asMatch) linkObj.as = asMatch[1];
        if (crossoriginMatch) linkObj.crossOrigin = crossoriginMatch[1];

        links.push(linkObj);
      }
    }

    // ==========================================
    // 3. PARSE ALL SCRIPT TAGS
    // ==========================================

    // 3a. JSON-LD Scripts
    const jsonLdRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;

    while ((jsonLdMatch = jsonLdRegex.exec(htmlString)) !== null) {
      try {
        const jsonContent = jsonLdMatch[1].trim();
        const cleanedJson = jsonContent.replace(/<!--[\s\S]*?-->/g, "");
        const parsedJson = JSON.parse(cleanedJson);
        scripts.push(parsedJson);
      } catch (e) {
        console.warn("Failed to parse JSON-LD script:", e.message);
      }
    }

    // 3b. External Scripts (with src attribute)
    const externalScriptRegex = /<script[^>]*src\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/gi;
    let externalMatch;

    while ((externalMatch = externalScriptRegex.exec(htmlString)) !== null) {
      const srcMatch = externalMatch[1];
      if (srcMatch) {
        inlineScripts.push({
          type: "external",
          src: srcMatch,
          content: null,
        });
      }
    }

    // 3c. Inline Scripts (NEW - handles your case)
    // Match <script>...</script> that are NOT JSON-LD and NOT external
    const inlineScriptRegex = /<script(?![^>]*type\s*=\s*["']application\/ld\+json["'])(?![^>]*src\s*=)([^>]*)>([\s\S]*?)<\/script>/gi;
    let inlineMatch;

    while ((inlineMatch = inlineScriptRegex.exec(htmlString)) !== null) {
      const attributes = inlineMatch[1];
      const scriptContent = inlineMatch[2].trim();

      if (scriptContent) {
        const scriptObj = {
          type: "inline",
          content: scriptContent,
          attributes: attributes.trim(),
        };

        // Parse any attributes (async, defer, type, etc.)
        const asyncMatch = attributes.match(/async/i);
        const deferMatch = attributes.match(/defer/i);
        const typeMatch = attributes.match(/type\s*=\s*["']([^"']+)["']/i);

        if (asyncMatch) scriptObj.async = true;
        if (deferMatch) scriptObj.defer = true;
        if (typeMatch) scriptObj.scriptType = typeMatch[1];

        inlineScripts.push(scriptObj);
      }
    }

    return {
      other,
      links,
      scripts, // JSON-LD only
      inlineScripts, // Inline + External scripts
    };
  } catch (error) {
    console.error("Error parsing meta tags:", error);
    return { other: {}, links: [], scripts: [], inlineScripts: [] };
  }
}

export function sanitizeMetadata(parsedMeta) {
  const { other, links, scripts, inlineScripts } = parsedMeta;

  const reservedMetaTags = ["viewport", "charset"];

  const sanitizedOther = {};
  Object.keys(other).forEach((key) => {
    if (!reservedMetaTags.includes(key.toLowerCase())) {
      sanitizedOther[key] = other[key];
    }
  });

  const sanitizedLinks = links.filter((link) => {
    try {
      if (link.href.startsWith("http") || link.href.startsWith("https") || link.href.startsWith("/")) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  // ⚠️ SECURITY WARNING: Inline scripts can be dangerous!
  // Only allow if you trust the admin completely
  const sanitizedInlineScripts = inlineScripts
    .map((script) => {
      if (script.type === "inline") {
        // You can add content filtering here
        // For example, block certain dangerous patterns
        const dangerousPatterns = [/eval\s*\(/gi, /Function\s*\(/gi, /document\.write/gi, /<iframe/gi];

        const isDangerous = dangerousPatterns.some((pattern) => pattern.test(script.content));

        if (isDangerous) {
          console.warn("Blocked potentially dangerous inline script:", script.content);
          return null;
        }
      }
      return script;
    })
    .filter(Boolean);

  return {
    other: sanitizedOther,
    links: sanitizedLinks,
    scripts,
    inlineScripts: sanitizedInlineScripts,
  };
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

export async function callLogoutApi(endpoint, options = {}) {
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
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error?.message || "Network error. Please check your connection.",
    };
  }
}

let _refreshPromise = null;

export function resetRefreshPromise() {
  _refreshPromise = null;
}

export async function attemptTokenRefresh() {
  // Deduplicate concurrent refresh calls
  if (_refreshPromise) return _refreshPromise;

  _refreshPromise = (async () => {
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/api/frontend/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
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
    const status_code = data?.status_code;

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

    if (status_code === 401) {
      throw {
        message: message,
        requiresLogin: true,
      };
    } else {
      throw message;
    }
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

export const getExternalLink = (link, locale) => {
  return link.startsWith("/") ? `/${locale}${link}` : link;
};

export const getTarget = (link) => {
  // return link.startsWith("/") ? "_self" : "_blank";
  return "_self";
};

export const paymentStatusTranslate = (status, isEn) => {
  if (!status) return "-";
  switch (status.toLowerCase().trim()) {
    case "pending":
      return isEn ? "Pending" : "قيد الانتظار";
    case "paid":
      return isEn ? "Paid" : "مدفوع";
    case "failed":
      return isEn ? "Failed" : "فشل";
    case "refunded":
      return isEn ? "Refunded" : "مسترد";
    case "cancelled":
      return isEn ? "Cancelled" : "تم الإلغاء";
  }
};

export const orderStatusTranslate = (status, isEn) => {
  if (!status) return "-";
  switch (status.toLowerCase().trim()) {
    case "pending":
      return isEn ? "Pending" : "قيد الانتظار";
    case "confirmed":
      return isEn ? "Confirmed" : "تم التأكيد";
    case "packed":
      return isEn ? "Packed" : "تم التعبئة";
    case "shipped":
      return isEn ? "Shipped" : "تم الشحن";
    case "delivered":
      return isEn ? "Delivered" : "تم التوصيل";
    case "cancelled":
      return isEn ? "Cancelled" : "تم الإلغاء";
    case "returned":
      return isEn ? "Returned" : "تم الإرجاع";
  }
};

export function formatOrderDate(dateStr, isEn) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(isEn ? "en-AE" : "ar-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
