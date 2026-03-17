import { Text } from "@/components/utils/text";
import Link from "next/link";
import AuthLoginForm from "@/components/form/auth-login-form";
import GoogleLoginButton from "@/components/form/google-login-button";

export default function AuthLogin({ locale, data }) {
  return (
    <>
      <AuthLoginForm locale={locale} data={data} />
      <Text as="div" size="text1" className="text-center text-black my-1.5 xl:my-3">
        or
      </Text>
      <GoogleLoginButton locale={locale} />
      <Text as="div" size="text1" className="text-center text-black">
        New here?{" "}
        <Link href="signup" className="font-normal hover:underline">
          Create an Account
        </Link>
      </Text>
    </>
  );
}
