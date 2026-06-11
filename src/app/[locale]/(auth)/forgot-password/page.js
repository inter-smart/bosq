import { getAuthData } from "@/lib/api/CMS/basicGet";
import ForgotPasswordClient from "@/components/form/forgot-password-client";
import NotFound from "../../../not-found";

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
