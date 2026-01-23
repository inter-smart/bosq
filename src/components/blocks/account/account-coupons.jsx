import AccountNav from "./account-nav";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";

import { cn } from "@/lib/utils";
import { OrderEmpty } from "./order-empty";

export default function AccountCoupons({ data, locale }) {
  return (
    <>
      {data?.coupons?.length === 0 ? (
        <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
          <OrderEmpty
            title={"No Coupons Available"}
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
            Coupons & Offers
          </Heading>

          <div className="flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2">
            {data?.coupons?.map((item, index) => (
              <div key={"order-item" + index} className="w-full">
                <div
                  className={cn(
                    "w-full rounded-[4px] border border-[#dedede] flex flex-wrap p-3 xl:p-4 2xl:p-6 relative z-0 max-lg:gap-2",
                    item?.status === "used"
                      ? "bg-[#f17423]/20"
                      : "bg-[#f2f2f2]",
                    item?.status === "expired" &&
                      "opacity-50 pointer-events-none",
                  )}
                >
                  <div className="w-full lg:w-1/12">
                    <div className="text-[10px] 2xl:text-[12px] leading-normal font-semibold text-white bg-black rounded-[4px] py-0.5 px-1.5 inline-block">
                      {item?.title}
                    </div>
                  </div>
                  <div className="w-full lg:w-7/12">
                    <Text as="div" size="none" className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#282828] mb-1">
                      {parse(item?.description)}
                    </Text>
                    <Text
                      as="div"
                      size="text3"
                      className="font-normal truncate text-[#282828]"
                    >
                      {parse(item?.expiry_text)}
                      {item?.status === "used" && (
                        <span className="text-[10px] xl:text-[12px] leading-normal font-normal text-center text-white bg-[#f17423] rounded-lg horizontal-center origin-top-left px-2 xl:px-4 mx-2">
                          Used
                        </span>
                      )}
                    </Text>
                  </div>
                  <div className="w-full lg:w-4/12">
                    <div className="flex flex-wrap justify-end gap-2.5 xl:gap-5">
                      {item?.code && (
                        <div className="text-[10px] xl:text-[12px] leading-normal font-light text-[#282828] bg-[#dedede] border border-[#ccc] rounded-[4px] py-0.5 px-2.5 hover:bg-[#cfcfcf] transition duration-300">
                          {item?.code}
                        </div>
                      )}
                      {item?.code && (
                        <div className="text-[10px] xl:text-[12px] leading-normal font-medium text-[#282828] bg-[#f2f2f2] border border-[#ccc] rounded-[4px] py-0.5 px-2.5 flex gap-1 xl:gap-1.5 hover:bg-[#aaa] transition duration-300">
                          <Image
                            src={"/images/icon-copy.svg"}
                            alt={"icon-copy"}
                            width={10}
                            height={10}
                            className="w-2 xl:w-2.5 hover:scale-105 transition duration-300"
                          />
                          COPY
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
