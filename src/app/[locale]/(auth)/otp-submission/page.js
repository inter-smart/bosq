import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthOtpForm from "@/components/form/auth-otp-form";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";


export default async function OtpSubmissionPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;


  const { data, error } = await getAuthData();

  if (error) {
    return notFound();
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