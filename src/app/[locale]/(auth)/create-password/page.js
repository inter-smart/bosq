import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthPasswordForm from "@/components/form/auth-password-form";
import { getAuthData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";

export default async function CreatePasswordPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getAuthData();
  
    if (error) {
return notFound();
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
