import MatchingProductDialog from "@/components/common/matching-product-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/utils/text";
import Link from "next/link";
import React from "react";

const MatchingProduct = ({ data, locale }) => {
  return (
    <div className="w-full">
      <MatchingProductDialog data={data?.frequentlyBought} locale={locale}>
        <div className="w-full border border-[#d4d4d4] flex justify-between p-2 xl:p-3 2xl:p-4">
          <div className="flex items-center gap-2.5 2xl:gap-3">
            <div className="text-white w-6 xl:w-8 2xl:w-10 aspect-square bg-black rounded-full flex justify-center items-center">
              <Plus className="size-4" />
            </div>
            <div>
              <Text as="div" size="text3" className="font-medium text-[#282828]">
                Add Complementary Items to Your Order?
              </Text>
              <Text as="div" size="text3" className="text-[#282828] [&>a]:font-medium">
                Save up to AED 110 with our curated bundles • <Link href="#">Click to view options</Link>
              </Text>
            </div>
          </div>
          <div>
            <Button variant={"black"} disabled={false} className="min-w-[100px] sm:min-w-[120px] xl:min-w-[140px] 2xl:min-w-[210px]">
              View Bundles
            </Button>
          </div>
        </div>
      </MatchingProductDialog>
    </div>
  );
};

export default MatchingProduct;
