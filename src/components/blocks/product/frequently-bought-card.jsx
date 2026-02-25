"use client";
import Image from "next/image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "motion/react";
import { Skeleton } from "../../ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FrequentlyBoughtCard({ product, locale, selected = true, onToggle }) {
  const productUrl = product?.query_params ? `/${locale}/products/${product?.base_slug}${product?.query_params}` : "#";

  return (
    <Suspense fallback={<FrequentlyBoughtCardSkelton />}>
      <div className="group w-full block">
        <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#f4f4f4] mb-1 2xl:mb-2 bg-[#f4f4f4] relative z-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="w-3 xl:w-3.5 2xl:w-4.5 aspect-square bg-white flex items-center justify-center absolute z-2 top-1 xl:top-2 left-1 xl:left-2"
          >
            <Check className={cn("size-2 2xl:size-3", selected ? "text-black" : "text-white")} />
          </motion.button>

          <Image
            src={product?.variant_image}
            alt={locale === "ar" ? product?.title_ar : product?.title}
            width={550}
            height={440}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            quality={90}
          />
          {product?.hover_image && (
            <Image
              src={product?.hover_image}
              alt={locale === "ar" ? product?.title_ar : product?.title}
              width={550}
              height={440}
              quality={100}
              className="w-full h-full object-cover absolute z-1 inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
            />
          )}
        </div>
        <div>
          <Heading
            as="div"
            size="none"
            className="text-[8px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
          >
            <Link href={product?.query_params ? `/${locale}/product?.query_params` : "#"}>
              {" "}
              {product?.categories?.map((cat) => (locale === "en" ? cat.name : cat.name_ar)).join(", ")}
            </Link>
          </Heading>
          <Heading
            as="div"
            size="none"
            className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
          >
            <Link href={productUrl}>{locale == "ar" ? product?.title_ar : product?.title}</Link>
          </Heading>
          <Text
            as="div"
            size="none"
            className="text-[11px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828]"
          >
            <Link href={productUrl}>
              AED {product?.price} <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc] ">Inc Tax</span>
            </Link>
          </Text>
        </div>
      </div>
    </Suspense>
  );
}

function FrequentlyBoughtCardSkelton() {
  return (
    <div className="group w-full block">
      <Skeleton className="w-full aspect-[550/440] mb-1 2xl:mb-2" />
      <div>
        <Skeleton className="w-1/2 h-3 mb-0.5" />
        <Skeleton className="w-full h-3 mb-0.5" />
        <Skeleton className="w-full h-3" />
      </div>
    </div>
  );
}
