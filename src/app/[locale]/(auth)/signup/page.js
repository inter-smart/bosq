import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthSignup from "@/components/blocks/auth/auth-signup";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import NotFound from "../../(public)/not-found";

export default async function SignupPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    <NotFound />
  }

  const { authPageData } = data;
  const signupData = authPageData?.signup_data;

  return (
    <>
      <AuthLayout locale={locale} data={signupData} isApiData={true}>
        <AuthSignup locale={locale} />
      </AuthLayout>
    </>
  );
}
