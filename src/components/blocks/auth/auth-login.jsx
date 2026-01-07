import { Text } from "@/components/utils/text";
import Link from "next/link";
import AuthLoginForm from "@/components/form/auth-login-form";

export default function AuthLogin({ locale }) {
  return (
    <>
      <AuthLoginForm locale={locale} />
      <Text
        as="div"
        size="text1"
        className="text-center text-black my-1.5 xl:my-3"
      >
        or
      </Text>
      <div className="w-full p-2 bg-gray-400 text-center my-1.5 xl:my-3">
        Continue with Google
      </div>
      <Text
        as="div"
        size="text1"
        className="line-clamp-4 font-light text-black"
      >
        Already have an account?{" "}
        <Link href="/en/signup" className="font-normal hover:underline">
          signup
        </Link>
      </Text>
    </>
  );
}
