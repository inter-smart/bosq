import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthPasswordForm from "@/components/form/auth-password-form";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-1.jpg",
  },
  title: "Create Your Password",
  description:
    "<p>Enter the verification code we just sent you on your mail address.</p>",
};

export default function CreatePassword() {
  const locale = "en";
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthPasswordForm />
      </AuthLayout>
    </>
  );
}
