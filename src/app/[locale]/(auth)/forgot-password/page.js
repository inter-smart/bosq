import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthForgotPasswordForm from "@/components/form/auth-forgot-password-form";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import NotFound from "../../(public)/not-found/page";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-2.jpg",
  },
  title: "Recover Your Password",
  description:
    "<p>Please enter the email you used when you signed up in order to recover your password. You will receive a one-time password.</p>",
};

export default async function ForgotPasswordPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();


  if (error) {
    return <NotFound />
  }

  const { authPageData } = data;
  const loginData = authPageData?.login_data;


  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthForgotPasswordForm locale={locale} />
      </AuthLayout>
    </>
  );
}
