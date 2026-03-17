import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthLogin from "@/components/blocks/auth/auth-login";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-2.jpg",
  },
  title: "Welcome Back",
  description: "<p>Please Enter Your Details to Login.</p>",
};

export default async function LoginPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();

  if (error) {
    notFound();
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
