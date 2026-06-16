"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useReorderOrderMutation } from "@/store/services/orderApi";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { orderStatusTranslate, paymentStatusTranslate } from "@/lib/helper";

const labelStyle = cn("text-[#282828] my-2 xl:my-2.5 2xl:my-4 [&>span]:font-normal flex justify-between");

export default function OrdersDetailModal({ children, order, locale }) {
  const router = useRouter();
  const [reorderOrder, { isLoading: isReordering }] = useReorderOrderMutation();

  const [Loading, setLoading] = useState(false);

  const t = useTranslations("account");
  const tCommon = useTranslations("common");
  const tCart = useTranslations("cart");
  const tToast = useTranslations("toast");

  const handleReorder = async () => {
    try {
      const result = await reorderOrder({ orderId: order?.id }).unwrap();
      const skipped = result?.data?.skipped_variant_ids ?? [];
      if (skipped.length > 0 && skipped.length === order?.items?.length) {
        toast.error(t("all_items_out_of_stock"));
        return;
      }
      if (skipped.length > 0) {
        toast.warning(t("some_items_out_of_stock"));
      } else {
        toast.success(tToast("items_added_to_cart"));
      }
      router.push(`/${locale}/cart`);
    } catch (error) {
      toast.error(typeof error?.[locale] === "string" ? error[locale] : t("failed_to_reorder"));
    }
  };

  const handleDownloadInvoice = async () => {
    setLoading(true);
    try {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;

      const aed = (val) =>
        `AED ${parseFloat(String(val || 0)).toLocaleString("en-AE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

      // ── HEADER ──────────────────────────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(15, 15, 15);
      doc.text("BOSQ", margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("Tax Invoice / Receipt", margin, y + 6);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 15, 15);
      doc.text(`Invoice: ${order?.order_id}`, pageWidth - margin, y, {
        align: "right",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const orderDate = order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "";
      doc.text(`Date: ${orderDate}`, pageWidth - margin, y + 6, {
        align: "right",
      });
      doc.text(`Status: ${(order?.status || "").toUpperCase()}`, pageWidth - margin, y + 11, { align: "right" });
      y += 18;

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // ── PAYMENT STRIP ────────────────────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      const paymentLine = `Payment: ${(order?.payment_status || "").toUpperCase()}${order?.payment_type ? `   |   Method: ${order.payment_type.toUpperCase()}` : ""}`;
      doc.text(paymentLine, margin, y);
      y += 8;
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageWidth - margin, y);
      y += 7;

      // ── ADDRESS SECTION ──────────────────────────────────────────────
      if (order?.billing_address || order?.shipping_address) {
        if (y > 240) {
          doc.addPage();
          y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);

        if (order?.billing_address) doc.text("BILLING ADDRESS", margin, y);
        if (order?.shipping_address)
          doc.text("SHIPPING ADDRESS", pageWidth - margin, y, {
            align: "right",
          });
        y += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(30, 30, 30);

        let billingEndY = y;
        let shippingEndY = y;

        if (order?.billing_address) {
          order.billing_address.split(", ").forEach((part) => {
            doc.text(part, margin, billingEndY);
            billingEndY += 5;
          });
        }

        if (order?.shipping_address) {
          order.shipping_address.split(", ").forEach((part) => {
            doc.text(part, pageWidth - margin, shippingEndY, {
              align: "right",
            });
            shippingEndY += 5;
          });
        }

        y = Math.max(billingEndY, shippingEndY) + 4;
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, y, pageWidth - margin, y);
        y += 7;
      }

      // ── ITEMS TABLE ──────────────────────────────────────────────────
      const cols = {
        product: margin,
        qty: margin + 90,
        price: margin + 118,
        discount: margin + 150,
        subtotal: pageWidth - margin,
      };

      doc.setFillColor(245, 245, 245);
      doc.rect(margin, y - 4, contentWidth, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text("PRODUCT", cols.product, y);
      doc.text("QTY", cols.qty, y, { align: "center" });
      doc.text("PRICE", cols.price, y, { align: "center" });
      doc.text("DISCOUNT", cols.discount, y, { align: "center" });
      doc.text("SUBTOTAL", cols.subtotal, y, { align: "right" });
      y += 5;
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(20, 20, 20);

      (order?.items ?? []).forEach((item, idx) => {
        if (idx % 2 === 1) {
          doc.setFillColor(250, 250, 250);
          doc.rect(margin, y - 4, contentWidth, 10, "F");
        }
        const productTitle = item?.variant?.title ?? "Unknown Product";
        const sku = item?.variant?.sku ? `SKU: ${item.variant.sku}` : "";
        const t = productTitle.length > 38 ? productTitle.substring(0, 36) + ".." : productTitle;
        const unitPrice = parseFloat(item?.line_total ?? 0);
        const discountAmt = parseFloat(item?.discount_amount ?? 0);
        const useCouponOverride =
          (order?.items ?? []).length === 1 &&
          discountAmt === 0 &&
          parseFloat(order?.discount_total || "0") > 0;
        const displayDiscount = useCouponOverride
          ? parseFloat(order.discount_total)
          : discountAmt;
        const lineSubtotal = useCouponOverride
          ? parseFloat(order?.grand_total)
          : unitPrice - discountAmt;

        doc.setFont("helvetica", "bold");
        doc.text(t, cols.product, y);
        if (sku) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.setTextColor(120, 120, 120);
          doc.text(sku, cols.product, y + 4);
          doc.setFontSize(8.5);
          doc.setTextColor(20, 20, 20);
        }
        doc.setFont("helvetica", "normal");
        doc.text(String(item?.quantity ?? 0), cols.qty, y, { align: "center" });
        doc.text(aed(unitPrice), cols.price, y, { align: "center" });
        const hasDiscount =
          typeof displayDiscount === "number" &&
          !isNaN(displayDiscount) &&
          displayDiscount > 0;
        if (hasDiscount) {
          doc.setTextColor(180, 30, 30);
          doc.text(`- ${aed(displayDiscount)}`, cols.discount, y, { align: "center" });
          doc.setTextColor(20, 20, 20);
        } else {
          doc.text("-", cols.discount, y, { align: "center" });
        }
        doc.setFont("helvetica", "bold");
        doc.text(aed(lineSubtotal), cols.subtotal, y, { align: "right" });
        y += 11;

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      });

      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // ── FINANCIAL SUMMARY ────────────────────────────────────────────
      const summaryLabelX = pageWidth - margin - 70;
      const summaryValueX = pageWidth - margin;

      const drawRow = (label, value, bold = false, color = [30, 30, 30]) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(bold ? 10 : 9);
        doc.setTextColor(...color);
        doc.text(label, summaryLabelX, y);
        doc.text(value, summaryValueX, y, { align: "right" });
        y += 6;
      };

      if (order?.subtotal != null) drawRow("Subtotal", aed(order.subtotal));
      if (parseFloat(String(order?.discount_total || 0)) > 0) {
        drawRow("Discount", `- ${aed(order.discount_total)}`, false, [180, 30, 30]);
      }
      if (order?.tax_total != null && order?.tax_total > 0) drawRow("Tax", aed(order.tax_total));
      const shippingVal = parseFloat(String(order?.shipping_total || 0));
      drawRow("Shipping", shippingVal > 0 ? aed(shippingVal) : "Free");
      doc.setDrawColor(80, 80, 80);
      doc.line(summaryLabelX, y, summaryValueX, y);
      y += 5;
      drawRow("Grand Total", aed(order?.grand_total), true);

      // ── FOOTER ───────────────────────────────────────────────────────
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
      doc.text("Thank you for shopping with BOSQ. For queries, contact support.", pageWidth / 2, pageHeight - 12, { align: "center" });

      doc.save(`invoice-${order?.order_id || "BOSQ"}.pdf`);
      toast.success(t("invoice_downloaded_success"));
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error(t("failed_to_download_invoice"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog dir={locale === "ar" ? "rtl" : "ltr"}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={"xl:max-w-[576px] 2xl:max-w-[840px] gap-0"}>
        <DialogHeader className={"flex-row items-center justify-between mb-1 2xl:mb-3"}>
          <DialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
            {t("order_details")}
          </DialogTitle>
          <DialogDescription className={"sr-only"}>{t("order_details")}</DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-[60vh] xl:max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)]">
          <div className="h-full overflow-auto flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2.5 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2.5">
            <div className="w-full sm:w-1/2">
              <div className="w-full h-full bg-[#f2f2f2] border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  {t("order_information")}
                </Heading>

                <Text as="div" size="text3" className={labelStyle}>
                  {t("order_id")} {""}
                  <span>{order?.order_id}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  {t("order_date")} {""}
                  <span>{order?.createdAt}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  {t("order_status")} {""}
                  <span>{orderStatusTranslate(order?.status, locale === "en")}</span>
                </Text>

                <Text as="div" size="text3" className={labelStyle}>
                  {t("payment")} {""}
                  <span>{paymentStatusTranslate(order?.payment_status, locale === "en")}</span>
                </Text>

                {order?.est_delivery_details && (
                  <Text as="div" size="text3" className={labelStyle}>
                    {t("est_delivery")} {""}
                    <span>{order?.est_delivery_details}</span>
                  </Text>
                )}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="w-full h-full bg-[#f2f2f2] border border-[#dedede] p-2 xl:p-3 2xl:p-5">
                <Heading
                  as="div"
                  size="none"
                  className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  {t("products_count", { count: order?.items_count })}
                </Heading>

                {order?.items?.map((item, index) => (
                  <div key={"order-item" + index} className="w-full">
                    <div className="w-full flex gap-2 justify-between">
                      <div className="w-7/10">
                        <Text as="div" size="text3" className="line-clamp-2 text-[#282828] max-lg:font-medium">
                          {locale === "en" ? item?.variant?.title : item?.variant?.title_ar}
                        </Text>
                        <Text as="div" size="text3" className="text-[#282828] mt-0.5 2xl:mt-1">
                          <span className="text-[90%]">
                            {t("qty")} {""}
                            {item?.quantity}
                          </span>
                        </Text>
                      </div>
                      <div className="text-end shrink-0 min-w-fit">
                        {item?.is_coupon_applied ? (
                          <>
                            <Text as="div" size="text3" className="font-normal text-[#bbbcbc] line-through mt-0.5 whitespace-nowrap">
                              {tCommon("aed")} {item?.line_total}
                            </Text>
                            <Text as="div" size="text3" className="font-normal text-[#282828] whitespace-nowrap">
                              {tCommon("aed")} {item?.final_amount}
                            </Text>
                            <Text as="div" size="text3" className="text-green-600 font-medium whitespace-nowrap">
                              -{tCommon("aed")} {item?.discount_amount}
                            </Text>
                          </>
                        ) : (
                          <Text as="div" size="text3" className="font-normal text-[#282828] mt-0.5 whitespace-nowrap">
                            {tCommon("aed")} {item?.line_total}
                          </Text>
                        )}
                      </div>
                    </div>
                    <hr className="mt-1.5 my-2" />
                  </div>
                ))}

                <Text as="div" size="text3" className={labelStyle}>
                  {tCart("shipping_charge")} {""}
                  <span>{parseFloat(order?.shipping_total || 0) > 0 ? `${tCommon("aed")} ${order?.shipping_total}` : tCommon("free")}</span>
                </Text>

                <Text as="div" size="text3" className={cn(labelStyle, "font-bold mb-1! [&>span]:font-bold")}>
                  {t("total_amount")} {""}
                  <span>{tCommon("aed")} {order?.grand_total}</span>
                </Text>
              </div>
            </div>

            {order?.billing_address && (
              <div className="w-full sm:w-1/2">
                <div className="w-full h-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                  <Heading
                    as="div"
                    size="none"
                    className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 2xl:mb-3"
                  >
                    {t("billing_address")}
                  </Heading>
                  <Text as="div" size="text3" className={cn("m-0!", labelStyle)}>
                    {order?.billing_address && parse(order?.billing_address)}
                  </Text>
                </div>
              </div>
            )}

            {order?.shipping_address && (
              <div className="w-full sm:w-1/2">
                <div className="w-full h-full bg-white border border-[#dedede] p-2.5 xl:p-3.5 2xl:p-5">
                  <Heading
                    as="div"
                    size="none"
                    className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-bold text-[#282828] mb-2 2xl:mb-3"
                  >
                    {t("shipping_address")}
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
          <Button variant={"black"} disabled={Loading} onClick={handleDownloadInvoice} className="min-w-[120px] xl:min-w-[155px] 2xl:min-w-[200px]">
            {Loading ? t("downloading") : t("download_invoice")}
          </Button>
          <Button
            variant={"white"}
            disabled={isReordering}
            onClick={handleReorder}
            className="min-w-[60px] xl:min-w-[80px] 2xl:min-w-[120px] border border-black hover:border-[#f17423]"
          >
            {isReordering ? t("adding") : t("reorder")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
