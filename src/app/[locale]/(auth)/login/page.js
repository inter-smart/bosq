import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthLogin from "@/components/blocks/auth/auth-login";

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
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthLogin locale={locale} />
      </AuthLayout>
    </>
  );
}
