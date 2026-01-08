import AuthLayout from "@/components/blocks/auth/auth-layout";
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

export default async function OtpSubmissionPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthOtpForm locale={locale} />
      </AuthLayout>
    </>
  );
}
