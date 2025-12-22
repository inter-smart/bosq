import { Text } from "@/components/utils/text";
import Link from "next/link";
import AuthCreateForm from "@/components/form/auth-create-form";

export default function AuthSignup() {
  return (
    <>
      <AuthCreateForm />
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
        className="line-clamp-4 font-light text-center text-black "
      >
        New here?{" "}
        <Link href="/signup" className="font-normal hover:underline">
          Create an Account
        </Link>
      </Text>
    </>
  );
}
