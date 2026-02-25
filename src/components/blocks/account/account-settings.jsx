
"use client";

import { Heading } from "@/components/utils/heading";
import { useTranslations } from "next-intl";
import { OrderEmpty } from "./order-empty";
import PersonalInformationForm from "@/components/form/personal-information-form";
import PasswordChangeForm from "@/components/form/password-change-form";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";
import { useAuth } from "@/hooks/useAuth";

export default function AccountSettings({ data, locale }) {
  const t = useTranslations("account");
  const { isGoogleUser } = useAuth();
  return (
    <>
      {data?.coupons?.length === 0 ? (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <OrderEmpty
            title={t("no_coupons_title")}
            description={t("no_coupons_description")}
          />
        </div>
      ) : (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <Heading
            as="h2"
            size={"heading5"}
            className="font-semibold text-[#282828] mb-2 xl:mb-4"
          >
            {t("account_settings")}
          </Heading>
          <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
            <Heading
              as="h4"
              size="heading5"
              className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
            >
              {t("personal_info")}
            </Heading>
            <RecaptchaProvider>
              <PersonalInformationForm data={data} locale={locale} />
              {!isGoogleUser && (
                <>
                  <Heading
                    as="h4"
                    size="heading5"
                    className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8 mt-6 xl:mt-10 2xl:mt-12"
                  >
                    {t("password_change")}
                  </Heading>
                  <div className="flex">
                    <div className="w-full lg:w-1/2">
                      <PasswordChangeForm locale={locale} />
                    </div>
                  </div>
                </>
              )}
            </RecaptchaProvider>
          </div>
        </div>
      )}
    </>
  );
}
