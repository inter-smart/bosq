import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthSignup from "@/components/blocks/auth/auth-signup";

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
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthSignup locale={locale} />
      </AuthLayout>
    </>
  );
}
