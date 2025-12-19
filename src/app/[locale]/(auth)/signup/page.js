import AuthLayout from "@/components/blocks/auth/auth-layout";
import AuthLogin from "@/components/blocks/auth/auth-login";

const local_data = {
  media: {
    type: "image",
    alt: "hero",
    path: "/images/auth-login-1.jpg",
  },
  title: "Create Your Account",
  description: "<p>Fill the the fields below to login.</p>",
};

export default function LoginPage() {
  const locale = "en";
  return (
    <>
      <AuthLayout locale={locale} data={local_data}>
        <AuthLogin />
      </AuthLayout>
    </>
  );
}
