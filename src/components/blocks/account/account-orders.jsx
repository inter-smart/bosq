import { Button } from "@/components/ui/button";
import AccountNav from "./account-nav";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";

import Link from "next/link";
import { cn } from "@/lib/utils";
import OrdersDetailModal from "./orders-detail-modal";
import { OrderEmpty } from "./order-empty";

const labelStyle = cn("text-[#282828] my-0.5 2xl:my-1 [&>span]:font-normal");
const btnStyle = cn(
  "underline underline-offset-1 text-[#282828] h-auto! px-1 xl:px-1.5 gap-0.5"
);

export default function AccountOrders({ data, locale }) {
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2">
          <div className="w-full sm:w-[200px] xl:w-[240px] 2xl:w-[268px] 3xl:w-[330px]">
            <AccountNav />
          </div>

          <div className="w-full sm:w-[calc(100%-200px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-268px)] 3xl:w-[calc(100%-330px)] max-sm:mb-2">
            {data?.length === 0 ? (
              <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
                <OrderEmpty
                  title={"You haven't placed any orders yet"}
                  description={
                    "Once you place your first order, you'll be able to track your deliveries and manage returns from here."
                  }
                />
              </div>
            ) : (
              <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
                <Heading
                  as="h2"
                  size={"heading5"}
                  className="font-semibold text-[#282828] mb-2 xl:mb-4"
                >
                  My Orders
                </Heading>

                {data?.map((item, index) => (
                  <div
                    key={"order" + index}
                    className="w-full mb-4 xl:mb-7 2xl:mb-10"
                  >
                    <div className="flex items-center gap-x-2.5 xl:gap-x-5 mb-0.5 xl:mb-1">
                      <Text as="div" size="text3" className={labelStyle}>
                        Order ID: {""}
                        <span>{item?.order_number}</span>
                      </Text>
                      <span className="flex-1 h-[1px] bg-[#e9e9e9]" />
                    </div>
                    <div className="flex flex-wrap">
                      <div className="flex-1 flex flex-wrap -mx-0.5 xl:-mx-1 [&>*]:p-0.5 xl:[&>*]:p-1">
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          No of Items: {""}
                          <span>{item?.no_of_items}</span>
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          Total: {""}
                          <span>{item?.formatted_total}</span>{" "}
                          <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">
                            Inc Tax
                          </span>
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          Est. Delivery: {""}
                          <span>{item?.formatted_estimated_delivery}</span>
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          Order Date: {""}
                          <span>{item?.formatted_order_date}</span>
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          Payment: {""}
                          <span>{item?.payment_status}</span>
                        </Text>
                        <Text
                          as="div"
                          size="text3"
                          className={cn(labelStyle, "w-full sm:w-1/3")}
                        >
                          Order Status: {""}
                          <span>{item?.order_status}</span>
                        </Text>
                      </div>
                      <div>
                        <OrdersDetailModal data={item} locale={locale}>
                          <Button
                            variant={"black"}
                            disabled={false}
                            className="min-w-[90px] xl:min-w-[100px] 2xl:min-w-[120px]"
                          >
                            View Details
                          </Button>
                        </OrdersDetailModal>
                      </div>
                    </div>

                    <hr className="my-2 2xl:my-4" />

                    <div className="flex flex-wrap -mx-2 xl:-mx-7 2xl:-mx-10 [&>*]:px-2 [&>*]:py-1 xl:[&>*]:px-7 xl:[&>*]:py-1.5 2xl:[&>*]:px-10 2xl:[&>*]:py-2">
                      {item?.items?.map((item, index) => (
                        <div
                          key={"order-item" + index}
                          className="w-full sm:w-1/2"
                        >
                          <div className="w-full bg-[#f2f2f2] flex flex-wrap px-3 xl:px-4 2xl:px-5 3xl:px-6 py-3 xl:py-4 2xl:py-5 3xl:py-6">
                            <div className="w-[80px] xl:w-[100px] 2xl:w-[120px] aspect-square overflow-hidden rounded-[4px] border bg-white">
                              <Image
                                src={item?.media?.path}
                                alt={item?.media?.alt || item?.name}
                                width={120}
                                height={120}
                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                              />
                            </div>
                            <div className="w-[calc(100%-80px)] xl:w-[calc(100%-100px)] 2xl:w-[calc(100%-120px)] px-3 xl:px-5 *:my-1 2xl:*:my-1.5">
                              <Heading
                                as="div"
                                size="heading5"
                                className="truncate text-[#282828] max-lg:font-medium"
                              >
                                {item?.name}
                              </Heading>
                              <Text
                                as="div"
                                size="text3"
                                className="truncate text-[#282828]"
                              >
                                {item?.description}
                              </Text>
                              <Text
                                as="div"
                                size="text3"
                                className="text-[#282828]"
                              >
                                Qty: {""}
                                {item?.quantity}
                              </Text>
                              <Text
                                as="div"
                                size="text3"
                                className="font-normal text-[#282828] mt-2 xl:mt-3"
                              >
                                {item?.formatted_total}{" "}
                                <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">
                                  Inc Tax
                                </span>
                              </Text>
                            </div>

                            <div className="w-full flex flex-wrap items-center justify-end mt-2 xl:mt-4">
                              {item?.actions?.can_track && (
                                <Button
                                  variant={"link"}
                                  className={btnStyle}
                                  asChild
                                >
                                  <Link href={"/"}>Track Order</Link>
                                </Button>
                              )}

                              {item?.actions?.can_cancel && (
                                <Button variant={"link"} className={btnStyle}>
                                  Cancel Order
                                </Button>
                              )}

                              {item?.actions?.can_return && (
                                <Button
                                  variant={"link"}
                                  className={btnStyle}
                                  asChild
                                >
                                  <Link href={"/"}>Return</Link>
                                </Button>
                              )}

                              {item?.actions?.can_reorder && (
                                <Button
                                  variant={"link"}
                                  className={btnStyle}
                                  asChild
                                >
                                  <Link href={"/"}>
                                    <Image
                                      src={"/images/icon-reorder.svg"}
                                      alt={"icon-reorder"}
                                      width={10}
                                      height={10}
                                      className="w-2 xl:w-2.5"
                                    />
                                    Reorder
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
