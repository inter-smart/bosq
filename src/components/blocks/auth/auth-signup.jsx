import { Text } from "@/components/utils/text";
import Link from "next/link";
import AuthCreateForm from "@/components/form/auth-create-form";
import GoogleLoginButton from "@/components/form/google-login-button";

export default function AuthSignup({locale}) {
  return (
    <>
      <AuthCreateForm  locale={locale} />
      <Text
        as="div"
        size="text1"
        className="text-center text-black mt-1 xl:mt-2 mb-1.5 xl:mb-3"
      >
        or
      </Text>
      <GoogleLoginButton locale={locale} />
      <Text as="div" size="text1" className="text-[#282828]">
        Already have an account?{" "}
        <Link href="login" className="font-normal hover:underline">
          Log in
        </Link>
      </Text>
      <Text as="div" size="text1" className="text-center text-[#282828] mt-1">
        <Link href={`/${locale}/products`} className="font-normal hover:underline">
          Continue Browsing
        </Link>
      </Text>
    </>
  );
}
