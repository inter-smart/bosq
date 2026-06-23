"use client";

import { useState, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({ children }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;

    const handleInteraction = () => {
      setShouldLoad(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Add interaction listeners
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    // Fallback: load after 4 seconds if no interaction
    const timer = setTimeout(() => {
      setShouldLoad(true);
      removeListeners();
    }, 4000);

    return () => {
      removeListeners();
      clearTimeout(timer);
    };
  }, [siteKey]);

  if (!siteKey) {
    return <>{children}</>;
  }

  // Only render the provider when we are ready to load the script
  if (!shouldLoad) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

