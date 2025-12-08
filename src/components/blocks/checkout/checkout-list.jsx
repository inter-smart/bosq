"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useState } from "react";
import dynamic from "next/dynamic";
import ProductEnquiryForm from "@/components/form/product-enquiry-form";
import EnquiryForm from "@/components/form/enquiry-form";
import SoftLoginForm from "@/components/form/soft-login-form";
import AddressForm from "@/components/form/address-form";
import Link from "next/link";
import Image from "next/image";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function CheckoutList({ locale, data }) {
  const [loading, setLoading] = useState(false);
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:p-2.5 xl:[&>*]:p-8 2xl:[&>*]:10">
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-420px)] 2xl:w-[calc(100%-520px)] 3xl:w-[calc(100%-576px)] ">
            <div className="w-full h-auto block p-2 xl:p-5 2xl:p-7 rounded-lg border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
              <Heading
                as="h4"
                size="heading4"
                className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Personal Information
              </Heading>
              <SoftLoginForm />
            </div>
            <div className="w-full h-auto block p-2 xl:p-5 2xl:p-7 rounded-lg border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
              <Heading
                as="h4"
                size="heading4"
                className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Addresses
              </Heading>
              <AddressForm />
            </div>
          </div>
          <div className="w-full lg:w-[320px] xl:w-[420px] 2xl:w-[520px] 3xl:w-[576px] xl:p-5">
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-lg p-3 sm:p-4 xl:p-7 2xl:p-8 sticky top-[var(--header-y)] ">
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                2 Items
              </Text>
              <div className="w-full bg-white">
                <div className="group w-full flex flex-wrap items-center border border-[#e9e9e9] rounded-lg p-3 sm:p-3 xl:p-5 2xl:p-6 hover:shadow-sm transition-shadow ">
                  <div className="w-[40px] xl:w-[45px] 2xl:w-[60px] aspect-3/4 rounded-lg bg-white border border-gray-100 sm:border-white max-sm:mb-3">
                    <Image
                      src={data?.product?.media?.path}
                      alt={data?.product?.media?.alt}
                      width={168}
                      height={168}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-168px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
                    <Heading
                      as="div"
                      size="heading3"
                      className="truncate text-[#282828] mb-1 xl:mb-2 max-lg:font-medium"
                    >
                      {data?.product?.name}
                    </Heading>
                    <Text
                      as="div"
                      size="text3"
                      className="leading-tight truncate text-[#282828] mb-2 xl:mb-4"
                    >
                      {data?.product?.description}
                    </Text>
                    <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
                      <Text
                        as="div"
                        size="text3"
                        className="font-normal text-[#282828]"
                      >
                        AED {data?.product?.price}{" "}
                        <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">
                          Inc Tax
                        </span>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Subtotal (2)</span>
                AED 1058
              </Text>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Shipping Charge</span>
                Free
              </Text>
              <hr />
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4  flex justify-between"
              >
                <span>
                  Total Price
                  <br />
                  <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">
                    Inc Tax
                  </span>
                </span>
                AED 1058
              </Text>
              <MediaQuery minWidth={640}>
                <Button
                  variant={"black"}
                  disabled={loading}
                  className="min-w-full mt-2"
                >
                  {loading ? "Sending..." : "Checkout"}
                </Button>
              </MediaQuery>
            </div>
          </div>
        </div>
      </div>
      <MediaQuery maxWidth={639}>
        <hr />
        <div className="w-full py-1 px-4 pb-2 bg-white sticky z-1 bottom-0 left-0 right-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)]">
          <Button variant={"black"} disabled={loading} className="min-w-full">
            {loading ? "Sending..." : "Checkout"}
          </Button>
        </div>
      </MediaQuery>
    </section>
  );
}
