import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthLogin from "@/components/blocks/auth/auth-login";
import AuthOtpForm from "@/components/form/auth-otp-form";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-1.jpg",
  },
  title: "Create Your Account",
  description:
    "<p>Enter the verification code we just sent you on your mail address.</p>",
};

export default function CreatePassword() {
  const locale = "en";
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthOtpForm />
      </AuthLayout>
    </>
  );
}
