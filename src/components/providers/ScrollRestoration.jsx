"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  // Restore scroll position on page load
  useEffect(() => {
    const key = `bosq:scroll:${pathname}`;
    const saved = sessionStorage.getItem(key);
    if (!saved) return;

    const targetY = parseInt(saved, 10);
    if (!targetY) return;

    let rafId;
    let attempts = 0;
    const MAX_ATTEMPTS = 30;

    const tryRestore = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable >= targetY || attempts >= MAX_ATTEMPTS) {
        window.scrollTo({ top: targetY, behavior: "instant" });
      } else {
        attempts++;
        rafId = requestAnimationFrame(tryRestore);
      }
    };

    const timerId = setTimeout(() => {
      rafId = requestAnimationFrame(tryRestore);
    }, 50);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  // Save scroll position before page unload
  useEffect(() => {
    const key = `bosq:scroll:${pathname}`;

    const handleBeforeUnload = () => {
      sessionStorage.setItem(key, String(Math.round(window.scrollY)));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname]);

  return null;
}
