"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "@/components/utils/custom-image";

import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AccountProfile({ data, locale }) {
  const tAccount = useTranslations("account");
  const tAddress = useTranslations("address");



  const {isAuthenticated} = useSelector((state) => state.auth);

  console.log("isAuthenticated ", isAuthenticated)

  return (
    <div className="w-full border border-[#e9e9e9] sm:rounded-e-[4px] py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
      <Heading as="h2" size={"heading5"} className="font-semibold text-[#282828] mb-3 xl:mb-7">
        {tAccount("my_profile")}
      </Heading>
      <div className="w-full flex flex-wrap items-center mb-4 xl:mb-8">
        <div className="w-[50px] 2xl:w-[70px] aspect-square overflow-hidden rounded-full border">
          <Image
            src={data?.image ?? "/images/user-1.jpg"}
            alt={data?.name}
            width={100}
            height={100}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
            quality={90}
          />
        </div>
        <div className="flex-1 px-3 xl:px-5">
          <Text as="div" size="text3" className="font-normal text-[#282828] my-0.5 2xl:my-1">
            {data?.first_name ? data?.first_name + " " + data?.last_name : data?.name}
          </Text>
          <Text as="div" size="text3" className="font-normal text-[#282828] my-0.5 2xl:my-1">
            {data?.email}
          </Text>
          <Text as="div" size="text3" className="font-normal text-[#282828] my-0.5 2xl:my-1">
            {data?.phone}
          </Text>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 max-sm:mb-3">
          <Heading as="h2" size={"heading5"} className="font-normal text-[#282828] mb-1.5 xl:mb-2">
            {tAccount("personal_info")}
          </Heading>

          <Text as="div" size="text3" className="text-[#282828] my-0.5 2xl:my-1">
            {tAccount("name")} {""}
            {data?.first_name ? data?.first_name + " " + data?.last_name : data?.name}
          </Text>
          <Text as="div" size="text3" className="text-[#282828] my-0.5 2xl:my-1">
            {tAccount("email")} {""}
            {data?.email}
          </Text>
          {data?.phone && (
            <Text as="div" size="text3" className="text-[#282828] my-0.5 2xl:my-1">
              {tAccount("phone")} {""}
              {data?.phone}
            </Text>
          )}
        </div>
        <div className={`w-full ${data?.shipping_address ? "sm:w-1/4" : "sm:w-1/2"}`}>
          {data?.address && (
            <>
              <Heading as="h2" size={"heading5"} className="font-normal text-[#282828] mb-1.5 xl:mb-2">
                {tAccount("default_address")}
              </Heading>

              <Text as="div" size="text3" className="leading-relaxed mr-2 text-[#282828]">
                {parse(data?.address)}
              </Text>
            </>
          )}
        </div>

        {data?.shipping_address && (
          <div className="w-full sm:w-1/4">
            <Heading as="h2" size={"heading5"} className="font-normal text-[#282828] mb-1.5 xl:mb-2">
              {tAddress("shipping")}
            </Heading>

            <Text as="div" size="text3" className="leading-relaxed text-[#282828]">
              {parse(data?.shipping_address)}
            </Text>
          </div>
        )}
      </div>
      <Link href={`/${locale}/account/settings`}>
        <Button variant={"black"} disabled={false} className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[180px] mt-3 xl:mt-4 2xl:mt-6">
          {tAccount("edit_profile")}
        </Button>
      </Link>
    </div>
  );
}
