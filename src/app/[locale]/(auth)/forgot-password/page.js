import { getAuthData } from "@/lib/api/CMS/basicGet";
import NotFound from "../../(public)/not-found/page";
import ForgotPasswordClient from "@/components/form/forgot-password-client";

export default async function ForgotPasswordPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    return <NotFound />;
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
