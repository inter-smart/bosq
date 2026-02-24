"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { cn } from "@/lib/utils";
import OrdersDetailModal from "./orders-detail-modal";
import { OrderEmpty } from "./order-empty";

const labelStyle = cn("text-[#282828] my-0.5 2xl:my-1 [&>span]:font-medium");
const btnStyle = cn("underline underline-offset-1 text-[#282828] h-auto! px-1 xl:px-1.5 gap-0.5");

export default function AccountOrders({ data, locale, orders, pagination }) {
  const isEn = locale === "en";
  const t = useTranslations("account");
  const tCommon = useTranslations("common");

  return (
    <>
      {orders?.length === 0 ? (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <OrderEmpty
            title={t("no_orders_title")}
            description={t("no_orders_description")}
          />
        </div>
      ) : (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <Heading as="h2" size={"heading5"} className="font-semibold text-[#282828] mb-2 xl:mb-4">
            {t("my_orders")}
          </Heading>

          {orders?.map((item, index) => (
            <div key={"order" + index} className="w-full mb-4 xl:mb-7 2xl:mb-10">
              <div className="flex items-center gap-x-2.5 xl:gap-x-5 mb-0.5 xl:mb-1">
                <Text as="div" size="text3" className={labelStyle}>
                  {t("order_id")} {""}
                  <span>{item?.order_id}</span>
                </Text>
                <span className="flex-1 h-[1px] bg-[#e9e9e9]" />
              </div>
              <div className="flex flex-wrap">
                <div className="flex-1 flex flex-wrap -mx-0.5 xl:-mx-1 [&>*]:p-0.5 xl:[&>*]:p-1">
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("no_of_items")} {""}
                    <span>{item?.items?.length}</span>
                  </Text>
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("total")} {""}
                    <span>{tCommon("aed")} {item?.grand_total}</span> <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">{tCommon("inc_tax")}</span>
                  </Text>
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("est_delivery")} {""}
                    <span>{item?.est_delivery_details}</span>
                  </Text>
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("order_date")} {""}
                    <span>{item?.createdAt}</span>
                  </Text>
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("payment")} {""}
                    <span>{item?.payment_status}</span>
                  </Text>
                  <Text as="div" size="text3" className={cn(labelStyle, "w-full sm:w-1/3")}>
                    {t("order_status")} {""}
                    <span>{item?.status}</span>
                  </Text>
                </div>
                <div>
                  <OrdersDetailModal order={item} locale={locale}>
                    <Button variant={"black"} disabled={false} className="min-w-[90px] xl:min-w-[100px] 2xl:min-w-[120px]">
                      {t("view_details")}
                    </Button>
                  </OrdersDetailModal>
                </div>
              </div>

              <hr className="my-2 2xl:my-4" />

              <div className="flex flex-wrap -mx-2 xl:-mx-7 2xl:-mx-10 [&>*]:px-2 [&>*]:py-1 xl:[&>*]:px-7 xl:[&>*]:py-1.5 2xl:[&>*]:px-10 2xl:[&>*]:py-2">
                {item?.items?.map((item, index) => (
                  <div key={"order-item" + index} className="w-full sm:w-1/2">
                    <div className="w-full bg-[#f2f2f2] flex flex-wrap items-start px-3 xl:px-4 2xl:px-5 3xl:px-6 py-3 xl:py-4 2xl:py-5 3xl:py-6 pt-4 xl:pt-6 2xl:pt-8 3xl:pt-10 ">
                      <div className="w-[80px] xl:w-[80px] 2xl:w-[100px] aspect-square overflow-hidden rounded-[4px] border border-[#fbfbfb] bg-white">
                        <Image
                          src={item?.variant?.media_path}
                          alt={item?.media?.alt || item?.title}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          quality={90}
                        />
                      </div>
                      <div className="w-[calc(100%-80px)] xl:w-[calc(100%-80px)] 2xl:w-[calc(100%-100px)] px-3 xl:px-6 2xl:px-8 *:my-0.5 2xl:*:my-1">
                        <Heading as="div" size="heading5" className="truncate text-[#282828] max-lg:font-medium">
                          {isEn ? item?.variant?.title : item?.variant?.title_ar}
                        </Heading>
                        <Text as="div" size="text3" className="truncate text-[#282828]">
                          {item?.variant?.description || item?.variant?.sku}
                        </Text>
                        <Text as="div" size="text3" className="text-[#282828]">
                          {t("qty")} {""}
                          {item?.quantity}
                        </Text>
                        <Text as="div" size="text3" className="font-normal text-[#282828] mt-2 xl:mt-3">
                          {tCommon("aed")} {item?.line_total} <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">{tCommon("inc_tax")}</span>
                        </Text>
                      </div>

                      <div className="w-full flex flex-wrap items-center justify-end mt-2 2xl:mt-4">
                        <Button variant={"link"} className={btnStyle} asChild>
                          <Link href={`/${locale}/`}>{t("track_order")}</Link>
                        </Button>

                        {/* {item?.actions?.can_cancel && (
                          <Button variant={"link"} className={btnStyle}>
                            Cancel Order
                          </Button>
                        )} */}

                        {/* {item?.actions?.can_return && (
                          <Button variant={"link"} className={btnStyle} asChild>
                            <Link href={"/"}>Return</Link>
                          </Button>
                        )} */}

                        <Button variant={"link"} className={btnStyle} asChild>
                          <Link href={`/${locale}/`}>
                            <Image src={"/images/icon-reorder.svg"} alt={"icon-reorder"} width={10} height={10} className="w-2 xl:w-2.5"  quality={90} />
                            {t("reorder")}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
