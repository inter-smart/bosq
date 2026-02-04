import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthPasswordForm from "@/components/form/auth-password-form";
import { getAuthData } from "@/lib/api/CMS/basicGet";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-1.jpg",
  },
  title: "Create Your Password",
  description:
    "<p>Enter the verification code we just sent you on your mail address.</p>",
};

export default async function CreatePasswordPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();
  
    if (error) {
      notFound();
    }
  
    const { authPageData } = data;
    const CreatePasswordData = authPageData?.create_password_data;
  

  return (
    <>
      <AuthLayout locale={locale} data={CreatePasswordData}>
        <AuthPasswordForm locale={locale} />
      </AuthLayout>
    </>
  );
}
