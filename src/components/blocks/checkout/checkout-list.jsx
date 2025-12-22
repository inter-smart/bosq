"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useState } from "react";
import dynamic from "next/dynamic";
import SoftLoginForm from "@/components/form/soft-login-form";
import AddressForm from "@/components/form/address-form";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { set } from "zod";
import CheckoutResponse from "./checkout-response";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const paymentMethods = [
  {
    id: 1,
    name: "Cash On Delivery (COD)",
    description: "Pay by card or another accepted payment method",
  },
  {
    id: 2,
    name: "Pay Online",
    description: "You will be redirected to payment gateway.",
  },
];

export default function CheckoutList({ locale, data }) {
  const [loading, setLoading] = useState(false);
  const [checkoutList, setCheckoutList] = useState(false);
  const [couponStatus, setCouponStatus] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:p-2.5 xl:[&>*]:p-8 2xl:[&>*]:p-10">
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)]">
            <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-lg border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
              <Heading
                as="h4"
                size="heading4"
                className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Personal Information
              </Heading>
              {!isAuth ? (
                <SoftLoginForm setIsAuth={setIsAuth} />
              ) : (
                <div>
                  <Text
                    as="div"
                    size="text3"
                    className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]"
                  >
                    <span>Connected as</span>{" "}
                    {data?.customer?.first_name +
                      " " +
                      data?.customer?.last_name}
                    .
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]"
                  >
                    <span>Not you?</span>{" "}
                    <div
                      className="inline hover:underline cursor-default"
                      onClick={() => setIsAuth(false)}
                    >
                      {" "}
                      Log out
                    </div>
                  </Text>
                </div>
              )}
            </div>

            <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-lg border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
              <Heading
                as="h4"
                size="heading4"
                className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Addresses
              </Heading>
              <AddressForm />
            </div>

            {orderStatus && <CheckoutResponse orderStatus={orderStatus} />}
          </div>
          <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-lg p-3 sm:p-4 xl:p-7 2xl:p-8 mb-2 xl:mb-4">
              <Text
                as="div"
                size="text3"
                className="text-[#808080] mb-1 xl:mb-2 2xl:mb-3"
              >
                {data?.items_count} Items
              </Text>
              <button
                onClick={() => setCheckoutList((prev) => !prev)}
                className="text-[10px] 2xl:text-[12px] leading-none font-light truncate text-black mb-2 xl:mb-2.5 flex hover:underline"
              >
                Show Details{" "}
                <ChevronDown
                  className={cn(
                    "size-3 transition",
                    checkoutList ? "rotate-180" : ""
                  )}
                />
              </button>
              <div
                className={cn(
                  "w-full bg-white rounded-lg border border-[#e0e0e0] p-1 xl:p-2 transition duration-300 ease-in-out ",
                  checkoutList ? "h-auto block" : "h-0 hidden"
                )}
              >
                {data?.items?.map((item, index) => (
                  <div
                    key={"checkout-item-" + index}
                    className="group w-full flex flex-wrap items-center py-0.5"
                  >
                    <div className="w-[30px] xl:w-[30px] 2xl:w-[40px] aspect-3/4 rounded-lg bg-white border border-gray-100 ">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={168}
                        height={168}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="w-[calc(100%-30px)] sm:w-[calc(100%-35px)] xl:w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] px-1 sm:px-1 xl:px-1.5 flex justify-between gap-x-1 items-center">
                      <div className="w-[calc(100%-50px)]">
                        <Text
                          as="div"
                          size="text3"
                          className="truncate leading-none text-[#282828] mb-0.5 xl:mb-1"
                        >
                          {item?.name}
                        </Text>
                        <Text
                          as="div"
                          size="none"
                          className="text-[8px] 2xl:text-[10px] leading-none font-light truncate text-[#808080]"
                        >
                          {item?.description}
                        </Text>
                      </div>
                      <div className="w-[50px]">
                        <Text
                          as="div"
                          size="text3"
                          className="font-normal text-[#282828]"
                        >
                          {item?.formatted_price}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Subtotal ({data?.items_count})</span>
                {data?.formatted_sub_total}
              </Text>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Shipping Charge</span>
                {data?.formatted_shipping_charge}
              </Text>
              <div className="w-full mb-2 xl:mb-3 2xl:mb-4">
                <div className="w-full bg-[#eee] p-1 xl:p-2 rounded-lg flex gap-1.5">
                  <Input
                    type="text"
                    placeholder="Have a coupon code?"
                    className={
                      "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1 flex-1"
                    }
                  />
                  <Button
                    variant={"black"}
                    disabled={false}
                    onClick={() => setCouponStatus(true)}
                    className="min-w-[60px] sm:min-w-[60px] xl:min-w-[80px] 2xl:min-w-[100px] h-[35px] lg:h-[35px] 2xl:h-[45px] 3xl:h-[45px] "
                  >
                    {loading ? "Applying" : "Add"}
                  </Button>
                </div>
                {couponStatus && (
                  <div className="flex justify-between gap-2 my-1">
                    <Text
                      as="div"
                      size="none"
                      className={cn(
                        "text-[10px] 2xl:text-[12px] leading-normal font-normal",
                        couponStatus && "text-[#8e8e8e]"
                      )}
                    >
                      '{data?.coupon_code}' Coupon Applied
                    </Text>
                    <div
                      className="text-[10px] 2xl:text-[12px] leading-normal font-normal hover:underline cursor-default"
                      onClick={() => setCouponStatus(false)}
                    >
                      Remove
                    </div>
                  </div>
                )}
              </div>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 flex justify-between max-sm:font-semibold"
              >
                <span>
                  Total Price
                  <br />
                  <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">
                    Inc Tax
                  </span>
                </span>
                {data?.formatted_grand_total}
              </Text>
            </div>

            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-lg p-3 sm:p-4 xl:p-7 2xl:p-8 mb-2 xl:mb-4">
              <RadioGroup
                defaultValue="payment1"
                className={"grid-cols-1 3xs:grid-cols-2"}
              >
                {paymentMethods?.map((method, idx) => (
                  <div key={"paymentMethods" + idx} className="w-full">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={"payment" + method?.id}
                        id={"payment" + method?.id}
                      />
                      <Label
                        htmlFor={"payment" + method?.id}
                        className={
                          "text-[11px] lg:text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-light text-[#282828]"
                        }
                      >
                        {method?.name}
                      </Label>
                    </div>
                    <Text
                      as="div"
                      size="none"
                      className="text-[8px] lg:text-[9px] 2xl:text-[14px] leading-tight font-light text-[#808080] mt-1 xl:mt-2.5"
                    >
                      {method?.description}
                    </Text>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Text
              as="div"
              size="text3"
              className="leading-tight text-[#808080] [&_a]:underline mb-2 xl:mb-4"
            >
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Text>

            <div className="flex items-center gap-3 mb-2 xl:mb-4">
              <Checkbox id="agree" />
              <Label htmlFor="agree">
                <Text
                  as="span"
                  size="text3"
                  className="leading-tight text-[#282828] [&_a]:underline"
                >
                  I have read and agree to the website{" "}
                  <Link href="/terms-and-conditions">
                    Terms and Conditions *
                  </Link>
                </Text>
              </Label>
            </div>

            <MediaQuery minWidth={640}>
              <Button
                variant={"black"}
                disabled={loading}
                onClick={() => setOrderStatus(true)}
                className="min-w-full mt-2"
              >
                {loading ? "Placing order..." : "Place Order"}
              </Button>
            </MediaQuery>
          </div>
        </div>
      </div>
      <MediaQuery maxWidth={639}>
        <hr />
        <div className="w-full py-1 px-4 pb-2 bg-white sticky z-1 bottom-0 left-0 right-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)]">
          <Button
            variant={"black"}
            disabled={loading}
            onClick={() => setOrderStatus(true)}
            className="min-w-full"
          >
            {loading ? "Placing order..." : "Place Order"}
          </Button>
        </div>
      </MediaQuery>
    </section>
  );
}
