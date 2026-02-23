"use client";
import React from "react";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/selectors/cart/selectors";

const CartHeader = ({ data, locale }) => {
  const itemsCount = useSelector(selectCartCount);

  return (
    <>
      {(locale === "en" ? data?.title : data?.title_ar) && (
        <Heading as="h2" size="heading6" className="line-clamp-2 text-black">
          {parse(locale === "en" ? (data?.title ?? "") : (data?.title_ar ?? ""))}{" "}
          {itemsCount > 0 && (
            <Text as="span" size="text2" className="text-[#28282a]">
              {" "}
              ({itemsCount} items){" "}
            </Text>
          )}
          <span
            className={cn(
              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
              locale === "ar" ? "-translate-x-1 xl:-translate-x-2 " : "translate-x-1 xl:translate-x-2 ",
            )}
          />
        </Heading>
      )}
    </>
  );
};

export default CartHeader;
