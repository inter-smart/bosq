import { Text } from "@/components/utils/text";
import AuthCreateForm from "@/components/form/auth-create-form";
import Link from "next/link";

export default function AuthLogin() {
  return (
    <>
      <AuthCreateForm />
      <Text
        as="div"
        size="text1"
        className="text-center text-black my-2 xl:my-3"
      >
        or
      </Text>
      <div className="w-full p-2 bg-gray-400 text-center my-2 xl:my-4">
        Continue with Google
      </div>
      <Text
        as="div"
        size="text1"
        className="line-clamp-4 font-light text-black "
      >
        Already have an account?{" "}
        <Link href="/login" className="font-normal hover:underline">
          Login
        </Link>
      </Text>
    </>
  );
}
