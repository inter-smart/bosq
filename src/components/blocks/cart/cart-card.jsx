"use client";
import Image from "next/image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Skeleton } from "../../ui/skeleton";
import parse from "html-react-parser";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartCard({ product }) {
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/, "");
    const numValue = value === "" ? 1 : parseInt(value);
    setQuantity(numValue);
  };

  return (
    <Suspense fallback={<CartCardSkeleton />}>
      <div className="group w-full flex flex-wrap items-center border border-[#e9e9e9] rounded-[4px] p-3 sm:p-3 xl:p-5 2xl:p-6 hover:shadow-sm transition-shadow ">
        <div className="w-[60px] sm:w-[100px] xl:w-[150px] 2xl:w-[200px] aspect-[168/186] rounded-lg bg-white border border-gray-100 sm:border-white max-sm:mb-3">
          <Image
            src={product?.media?.path}
            alt={product?.media?.alt}
            width={168}
            height={168}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-150px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
          <Heading
            as="div"
            size="heading3"
            className="truncate text-[#282828] mb-1 xl:mb-2 max-lg:font-medium"
          >
            <Link href={product?.slug}>{product?.name}</Link>
          </Heading>
          <Text
            as="div"
            size="text3"
            className="leading-tight truncate text-[#282828] mb-2 xl:mb-4"
          >
            <Link href={product?.slug}>{product?.description}</Link>
          </Text>
          <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
            <Text as="div" size="text3" className="font-normal text-[#282828]">
              <Link href={product?.slug}>
                AED {product?.price}{" "}
                <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">
                  Inc Tax
                </span>
              </Link>
            </Text>
            <div className="w-[60px] xl:w-[60px] 2xl:w-[80px] h-[30px] lg:h-[30px] 2xl:h-[40px] flex items-center rounded-[6px] overflow-hidden bg-white border border-[#dedede]">
              <input
                type="text"
                value={quantity}
                onChange={handleChange}
                className="text-[11px] 2xl:text-[12px] leading-none font-normal text-center text-black w-8/10 overflow-hidden focus:outline-none"
              />
              <div className="w-4/10 flex flex-col align-center justify-center">
                <button
                  onClick={handleDecrement}
                  className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <ChevronUp className="size-2.5 text-black" />
                </button>
                <button onClick={handleIncrement} className="transition-colors">
                  <ChevronDown className="size-2.5 text-black" />
                </button>
              </div>
            </div>
          </div>
          <hr className="my-1 xl:mb-2 2xl:my-4" />
          <div className="flex justify-between gap-1">
            <Text
              as="div"
              size="text3"
              className="leading-tight text-[#282828] max-w-[220px] lg:max-w-[200px] 2xl:max-w-[268px] max-sm:text-[8px]"
            >
              {parse(product?.designDescription)}
            </Text>
            <Button
              variant={"link"}
              className={
                "not-hover:opacity-60 h-auto! has-[>svg]:px-0 transition hover:filter-[brightness(0)_saturate(100%)_invert(31%)_sepia(86%)_saturate(6865%)_hue-rotate(354deg)_brightness(100%)_contrast(128%)]"
              }
            >
              Remove
              <Image
                src={"/images/icon-delete.svg"}
                alt="icon-delete"
                width={8}
                height={8}
                className="w-2 sm:w-3 block"
              />
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function CartCardSkeleton() {
  return (
    <div className="w-full flex flex-wrap items-center p-3 sm:p-3 xl:p-5 2xl:p-6 border border-[#e9e9e9] rounded-lg">
      <Skeleton className="w-[60px] sm:w-[100px] xl:w-[168px] 2xl:w-[200px] aspect-168/186 rounded-lg max-sm:mb-3" />
      <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-168px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
        <Skeleton className="w-1/2 h-3 mb-1  xl:mb-2 " />
        <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
        <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
          <Skeleton className="w-1/2 h-3 " />
          <Skeleton className="w-[60px] xl:w-[60px] 2xl:w-20 h-[30px] lg:h-[30px] 2xl:h-10" />
        </div>
        <hr className="my-1 xl:mb-2 2xl:my-4" />
        <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
      </div>
    </div>
  );
}
