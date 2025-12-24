"use client";
import { Button } from "@/components/ui/button";
import AccountNav from "./account-nav";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";

import parse from "html-react-parser";

export default function AccountProfile({ data }) {
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2">
          <div className="w-full sm:w-[200px] xl:w-[240px] 2xl:w-[268px] 3xl:w-[330px]">
            <AccountNav />
          </div>

          <div className="w-full sm:w-[calc(100%-200px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-268px)] 3xl:w-[calc(100%-330px)] max-sm:mb-2">
            <div className="w-full border border-[#e9e9e9] rounded-lg sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
              <Heading
                as="h2"
                size={"heading5"}
                className="font-semibold text-[#282828] mb-3 xl:mb-7"
              >
                My Profile
              </Heading>
              <div className="w-full flex flex-wrap items-center mb-4 xl:mb-8">
                <div className="w-[50px] 2xl:w-[70px] aspect-square overflow-hidden rounded-full border">
                  <Image
                    src={data?.image}
                    alt={data?.first_name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="flex-1 px-3 xl:px-5">
                  <Text
                    as="div"
                    size="text3"
                    className="font-normal text-[#282828] my-0.5 2xl:my-1"
                  >
                    {data?.first_name + " " + data?.last_name}
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="font-normal text-[#282828] my-0.5 2xl:my-1"
                  >
                    {data?.email}
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="font-normal text-[#282828] my-0.5 2xl:my-1"
                  >
                    {data?.phone}
                  </Text>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 max-sm:mb-3">
                  <Heading
                    as="h2"
                    size={"heading5"}
                    className="font-normal text-[#282828] mb-1.5 xl:mb-2"
                  >
                    Personal Information
                  </Heading>

                  <Text
                    as="div"
                    size="text3"
                    className="text-[#282828] my-0.5 2xl:my-1"
                  >
                    Name: {""}
                    {data?.first_name + " " + data?.last_name}
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="text-[#282828] my-0.5 2xl:my-1"
                  >
                    Email: {""}
                    {data?.email}
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="text-[#282828] my-0.5 2xl:my-1"
                  >
                    Phone: {""}
                    {data?.phone}
                  </Text>
                </div>
                <div className="w-full sm:w-1/2">
                  <Heading
                    as="h2"
                    size={"heading5"}
                    className="font-normal text-[#282828] mb-1.5 xl:mb-2"
                  >
                    Default Address
                  </Heading>

                  <Text
                    as="div"
                    size="text3"
                    className="leading-relaxed text-[#282828]"
                  >
                    {parse(data?.address)}
                  </Text>
                </div>
              </div>
              <Button
                variant={"black"}
                disabled={false}
                className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[180px] mt-3 xl:mt-4 2xl:mt-6"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
