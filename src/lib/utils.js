import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const saveVariantToStorage = ({ label, url, STORAGE_KEY }) => {
  if (typeof window === "undefined") return;

  // Basic validation (prevent bad writes)
  if (!label || !url) return;

  try {
    const existing = localStorage.getItem(STORAGE_KEY);

    let parsed = [];

    if (existing) {
      const temp = JSON.parse(existing);

      if (Array.isArray(temp)) {
        parsed = temp;
      }
    }

    // Remove existing item with same URL (avoid duplicates)
    parsed = parsed.filter((item) => item?.url !== url);

    // Add newest at beginning (recent-first behavior)
    parsed.unshift({ label, url });

    // Optional: limit to last 10
    parsed = parsed.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
  }
};

export const getStoredVariants = (STORAGE_KEY) => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const getLocalizedContent = (isEn, enValue, arValue) => (isEn ? enValue : arValue) || (isEn ? arValue : enValue) || null;
