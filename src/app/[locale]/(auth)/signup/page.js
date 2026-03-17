import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthSignup from "@/components/blocks/auth/auth-signup";
import { getAuthData } from "@/lib/api/CMS/basicGet";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-1.jpg",
  },
  title: "Create Your Account",
  description: "<p>Fill the the fields below to login.</p>",
};

export default async function SignupPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    notFound();
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
