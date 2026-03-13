"use client";

import { useState } from "react";
import AuthLayout from "../blocks/auth/auth-layout";
import AuthForgotPasswordForm from "./auth-forgot-password-form";

function ForgotPasswordClient({ locale, forgotPasswordData }) {
  const [step, setStep] = useState(1);

  let recoverData;

  switch (step) {
    case 1:
      recoverData = forgotPasswordData?.recover_email;
      break;

    case 2:
      recoverData = forgotPasswordData?.recover_password_otp;
      break;

    case 3:
      recoverData = forgotPasswordData?.recover_password;
      break;

    default:
      recoverData = forgotPasswordData?.recover_email;
  }

  return (
    <AuthLayout locale={locale} data={recoverData}>
      <AuthForgotPasswordForm locale={locale} step={step} setStep={setStep} />
    </AuthLayout>
  );
}

export default ForgotPasswordClient;
