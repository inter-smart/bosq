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
        className="text-center text-black mt-1 xl:mt-2 mb-1.5 xl:mb-3"
      >
        or
      </Text>
      <div className="w-full p-2 bg-gray-400 text-center my-1.5 xl:my-3">
        Continue with Google
      </div>
      <Text as="div" size="text1" className="text-[#282828]">
        Already have an account?{" "}
        <Link href="/login" className="font-normal hover:underline">
          Log in
        </Link>
      </Text>
    </>
  );
}
