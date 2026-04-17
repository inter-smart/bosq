"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({ children }) {

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if(!siteKey) {
        console.error("RECAPTCHA_SITE_KEY is not defined");
        return <>{children}</>;
    }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
