import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const labelStyle = cn(
  "text-[#282828] my-2 xl:my-2.5 2xl:my-4 [&>span]:font-normal flex justify-between"
);

export default function OrdersDetailModal({ children, data, locale }) {
  return (
    <Dialog dir={locale === "ar" ? "rtl" : "ltr"}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={"xl:max-w-[576px] 2xl:max-w-[840px] gap-0"}>
        <DialogHeader
          className={"flex-row items-center justify-between mb-1 2xl:mb-3"}
        >
          <DialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
            Order Details
          </DialogTitle>
          <DialogDescription className={"sr-only"}>
            Order Details go here.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-[60vh] xl:max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)]">
          <div className="h-full overflow-auto flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2.5 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2.5">
            <div className="w-full sm:w-1/2">
              <div className="w-full bg-[#f2f2f2] border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  Order Information
                </Heading>

                <Text as="div" size="text3" className={labelStyle}>
                  Order ID: {""}
                  <span>{data?.order_number}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Order Date: {""}
                  <span>{data?.formatted_order_date}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Order Status: {""}
                  <span>{data?.order_status}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Payment: {""}
                  <span>{data?.payment_status}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Est. Delivery: {""}
                  <span>{data?.formatted_estimated_delivery}</span>
                </Text>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="w-full bg-[#f2f2f2] border border-[#dedede] p-2 xl:p-3 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  Products ({data?.no_of_items} Items)
                </Heading>

                {data?.items?.map((item, index) => (
                  <div key={"order-item" + index} className="w-full">
                    <div className="w-full flex justify-between">
                      <div className="w-7/10">
                        <Text
                          as="div"
                          size="text3"
                          className="line-clamp-2 text-[#282828] max-lg:font-medium"
                        >
                          {item?.name}
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className="text-[#282828] mt-0.5 2xl:mt-1"
                        >
                          <span className="text-[90%]">
                            Qty: {""}
                            {item?.quantity}
                          </span>
                        </Text>
                      </div>
                      <div>
                        <Text
                          as="div"
                          size="text3"
                          className="font-normal text-[#282828] mt-0.5"
                        >
                          {item?.formatted_total}{" "}
                        </Text>
                      </div>
                    </div>
                    <hr className="mt-1.5 my-2" />
                  </div>
                ))}

                <Text
                  as="div"
                  size="text3"
                  className={cn(labelStyle, "font-medium mb-1!")}
                >
                  Total Amount : {""}
                  <span>{data?.formatted_total}</span>
                </Text>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-[#282828] mb-2 2xl:mb-3"
                >
                  Billing Address
                </Heading>
                <Text as="div" size="text3" className={cn("m-0!", labelStyle)}>
                  {data?.billing_address?.address_line_2 &&
                    parse(data?.billing_address?.address_line_1) + ", "}
                  {data?.billing_address?.address_line_2 &&
                    parse(data?.billing_address?.address_line_2)}
                </Text>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-[#282828] mb-2 2xl:mb-3"
                >
                  Shipping Address
                </Heading>
                <Text as="div" size="text3" className={cn("m-0!", labelStyle)}>
                  {data?.shipping_address?.address_line_2 &&
                    parse(data?.shipping_address?.address_line_1) + ", "}
                  {data?.shipping_address?.address_line_2 &&
                    parse(data?.shipping_address?.address_line_2)}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className={"sm:justify-center mt-2 xl:mt-4 2xl:mt-10"}>
          <Button
            variant={"black"}
            disabled={false}
            className="min-w-[120px] xl:min-w-[155px] 2xl:min-w-[200px]"
          >
            Download Invoice
          </Button>
          <Button
            variant={"white"}
            disabled={false}
            className="min-w-[60px] xl:min-w-[80px] 2xl:min-w-[120px] border border-black hover:border-[#f17423]"
          >
            Reorder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
