import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthOtpForm from "@/components/form/auth-otp-form";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import NotFound from "../../(public)/not-found";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-2.jpg",
  },
  title: "Recover your Password",
  description:
    "<p>Enter the verification code we just sent you on your mail address.</p>",
};

export default async function OtpSubmissionPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;


  const { data, error } = await getAuthData();

  if (error) {
    return <NotFound />
  }

  const { authPageData } = data;
  const otpData = authPageData?.verify_otp_data;


  return (
    <>
      <AuthLayout locale={locale} data={otpData}>
        <AuthOtpForm locale={locale} />
      </AuthLayout>
    </>
  );
}