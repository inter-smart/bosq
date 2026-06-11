import { getAuthData } from "@/lib/api/CMS/basicGet";
import ForgotPasswordClient from "@/components/form/forgot-password-client";
import { notFound } from "next/navigation";

export default async function ForgotPasswordPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    return notFound();
  }

  const { authPageData } = data;
  const forgotPasswordData = authPageData?.forgot_password;

  return (
    <>
      <ForgotPasswordClient
        locale={locale}
        forgotPasswordData={forgotPasswordData}
      />
    </>
  );
}
