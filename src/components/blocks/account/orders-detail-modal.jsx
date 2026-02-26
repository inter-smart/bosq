"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReorderOrderMutation } from "@/store/services/orderApi";
import { generateInvoiceHTML } from "@/lib/invoice-template";
import html2canvas from 'html2canvas-pro';
import { useState } from "react";

const labelStyle = cn("text-[#282828] my-2 xl:my-2.5 2xl:my-4 [&>span]:font-normal flex justify-between");

export default function OrdersDetailModal({ children, order, locale, userName }) {
  const router = useRouter();
  const [reorderOrder, { isLoading: isReordering }] = useReorderOrderMutation();


  const [Loading, setLoading] = useState(false);

  const handleReorder = async () => {
    try {
      await reorderOrder({ orderId: order?.id }).unwrap();
      toast.success("Items added to cart");
      router.push(`/${locale}/cart`);
    } catch (error) {
      toast.error(typeof error?.en === "string" ? error.en : "Failed to reorder");
    }
  };

  const handleDownloadInvoice = async () => {
    setLoading(true)
    try {
      const jsPDF = (await import("jspdf")).default;
      const html = generateInvoiceHTML(order, locale, userName);

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "700px";
      container.innerHTML = html;
      document.body.appendChild(container);


      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width / 2, canvas.height / 2],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${order?.order_id || "BOSQ"}.pdf`);

      document.body.removeChild(container);
      setLoading(false)
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download invoice. Please try again.");
      setLoading(false)
    }
  };

  return (
    <Dialog dir={locale === "ar" ? "rtl" : "ltr"}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={"xl:max-w-[576px] 2xl:max-w-[840px] gap-0"}>
        <DialogHeader className={"flex-row items-center justify-between mb-1 2xl:mb-3"}>
          <DialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
            Order Details
          </DialogTitle>
          <DialogDescription className={"sr-only"}>Order Details go here.</DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-[60vh] xl:max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)]">
          <div className="h-full overflow-auto flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2.5 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2.5">
            <div className="w-full sm:w-1/2">
              <div className="w-full bg-[#f2f2f2] border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  Order Information
                </Heading>

                <Text as="div" size="text3" className={labelStyle}>
                  Order ID: {""}
                  <span>{order?.order_id}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Order Date: {""}
                  <span>{order?.createdAt}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Order Status: {""}
                  <span>{order?.status}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Payment: {""}
                  <span>{order?.payment_status}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  Est. Delivery: {""}
                  <span>{order?.est_delivery_details}</span>
                </Text>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="w-full bg-[#f2f2f2] border border-[#dedede] p-2 xl:p-3 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  Products ({order?.items_count} Items)
                </Heading>

                {order?.items?.map((item, index) => (
                  <div key={"order-item" + index} className="w-full">
                    <div className="w-full flex justify-between">
                      <div className="w-7/10">
                        <Text as="div" size="text3" className="line-clamp-2 text-[#282828] max-lg:font-medium">
                          {item?.variant?.title}
                        </Text>
                        <Text as="div" size="text3" className="text-[#282828] mt-0.5 2xl:mt-1">
                          <span className="text-[90%]">
                            Qty: {""}
                            {item?.quantity}
                          </span>
                        </Text>
                      </div>
                      <div>
                        <Text as="div" size="text3" className="font-normal text-[#282828] mt-0.5">
                          AED {item?.line_total}{" "}
                        </Text>
                      </div>
                    </div>
                    <hr className="mt-1.5 my-2" />
                  </div>
                ))}

                <Text as="div" size="text3" className={cn(labelStyle, "font-bold mb-1! [&>span]:font-bold")}>
                  Total Amount : {""}
                  <span>{order?.grand_total}</span>
                </Text>
              </div>
            </div>

            {order?.billing_address && (
              <div className="w-full sm:w-1/2">
                <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                  <Heading
                    as="div"
                    size="none"
                    className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 2xl:mb-3"
                  >
                    Billing Address
                  </Heading>
                  <Text as="div" size="text3" className={cn("m-0!", labelStyle)}>
                    {order?.billing_address && parse(order?.billing_address)}
                  </Text>
                </div>
              </div>
            )}

            {order?.shipping_address && (
              <div className="w-full sm:w-1/2">
                <div className="w-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                  <Heading
                    as="div"
                    size="none"
                    className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 2xl:mb-3"
                  >
                    Shipping Address
                  </Heading>
                  <Text as="div" size="text3" className={cn("m-0!", labelStyle)}>
                    {order?.shipping_address && parse(order?.shipping_address)}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className={"sm:justify-center mt-2 xl:mt-4 2xl:mt-10"}>
          <Button
            variant={"black"}
            disabled={Loading}
            onClick={handleDownloadInvoice}
            className="min-w-[120px] xl:min-w-[155px] 2xl:min-w-[200px]"
          >
            {Loading ? "Downloading..." : "Download Invoice"}
          </Button>
          <Button
            variant={"white"}
            disabled={isReordering}
            onClick={handleReorder}
            className="min-w-[60px] xl:min-w-[80px] 2xl:min-w-[120px] border border-black hover:border-[#f17423]"
          >
            {isReordering ? "Adding..." : "Reorder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
