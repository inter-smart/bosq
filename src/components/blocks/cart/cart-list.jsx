"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useState } from "react";
import CartCard from "./cart-card";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function CartList({ locale, data }) {
  const [loading, setLoading] = useState(false);
  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:p-2.5 xl:[&>*]:p-8 2xl:[&>*]:p-10">
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)] max-sm:mb-2">
            <div className="flex flex-wrap -m-[5px] *:p-[5px]">
              {data?.items?.map((item, index) => (
                <div
                  key={"cart-item-" + index}
                  className="w-full flex flex-wrap "
                >
                  <CartCard product={item} />
                </div>
              ))}
            </div>
            <div className="mt-3 xl:mt-6">
              <Button variant={"link"} className={"h-auto! gap-1 has-[>svg]:px-0"}>
                <svg
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-2 block"
                >
                  <path
                    d="M-0.000651243 2.6667C-0.000651246 2.7287 0.0210708 2.79076 0.0644594 2.83809L2.28667 5.26233C2.3735 5.35706 2.51411 5.35706 2.60089 5.26233C2.68767 5.1676 2.68772 5.01421 2.60089 4.91954L0.53579 2.6667L2.60089 0.413851C2.68772 0.319124 2.68772 0.16573 2.60089 0.071063C2.51406 -0.0236034 2.37345 -0.023664 2.28667 0.071063L0.0644594 2.4953C0.0210708 2.54264 -0.00065124 2.6047 -0.000651243 2.6667Z"
                    fill="#282828"
                  />
                </svg>
                Continue Shopping
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:p-7 2xl:p-8 sticky top-[var(--header-y)] ">
              <Heading
                as="div"
                size="heading4"
                className="text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Order Summary
              </Heading>
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
