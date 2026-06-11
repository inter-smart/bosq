import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthLogin from "@/components/blocks/auth/auth-login";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";


export default async function LoginPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    return notFound();
  }

  const { authPageData } = data;
  const loginData = authPageData?.login_data;

  return (
    <>
      <AuthLayout locale={locale} data={loginData} isApiData={true}>
        <AuthLogin locale={locale} data={loginData} />
      </AuthLayout>
    </>
  );
}
