"use client";

import { Text } from "@/components/utils/text";
import Link from "next/link";
import AuthLoginForm from "@/components/form/auth-login-form";
import GoogleLoginButton from "@/components/form/google-login-button";
import { useTranslations } from "next-intl";

export default function AuthLogin({ locale, data }) {
  
  const t = useTranslations("auth");

  return (
    <>
      <AuthLoginForm locale={locale} data={data} />
      <Text as="div" size="text1" className="text-center text-black my-1.5 xl:my-3">
        {t("or")}
      </Text>
      <GoogleLoginButton locale={locale} />
      <Text as="div" size="text1" className="text-center text-black">
        {t("new_here")}{" "}
        <Link href="signup" className="font-normal hover:underline">
          {t("create_account")}
        </Link>
      </Text>
      <Text as="div" size="text1" className="text-center text-[#282828] mt-1">
        <Link href={`/${locale}/products`} className="font-normal hover:underline">
          {t("continue_browsing")}
        </Link>
      </Text>
    </>
  );
}
