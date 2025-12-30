import { Button } from "@/components/ui/button";
import AccountNav from "./account-nav";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrderEmpty } from "./order-empty";

const btnStyle = cn(
  "underline underline-offset-1 text-[#282828] h-auto! px-1 xl:px-1.5 gap-0.5"
);

export default function AccountCancelled({ data, locale }) {
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
                  title={"You haven't cancelled any orders yet"}
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
                  Cancelled Orders
                </Heading>

                <div className="flex flex-wrap -mx-2 xl:-mx-7 2xl:-mx-10 [&>*]:px-2 [&>*]:py-1 xl:[&>*]:px-7 xl:[&>*]:py-1.5 2xl:[&>*]:px-10 2xl:[&>*]:py-2">
                  {data?.map((item, index) => (
                    <div key={"order-item" + index} className="w-full sm:w-1/2">
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
                          <Text
                            as="div"
                            size="text3"
                            className="truncate text-[#282828]"
                          >
                            Order ID: {item?.order_number}
                          </Text>
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

                        <div className="w-full flex justify-between gap-5 mt-2 xl:mt-4">
                          <div>
                            <Text
                              as="div"
                              size="text3"
                              className="text-[#8d8d8d]"
                            >
                              Cancelled on {item?.formatted_cancelled_date}
                            </Text>
                            <Text
                              as="div"
                              size="text3"
                              className="font-normal text-[#282828]"
                            >
                              {parse(item?.cancelledReason)}
                            </Text>
                          </div>
                          <div>
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
