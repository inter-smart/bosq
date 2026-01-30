"use client";
import Image from "next/image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense, useState } from "react";
import { motion } from "motion/react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product, isEn, locale = "en" }) {
  const productUrl = `/${locale}/products/${product?.slug}?base=${product?.base_slug || ""}&model=${product?.model_slug || ""}`;
  const [wishlist, setWishlist] = useState(product?.isWishlisted || false);

  return (
    <Suspense fallback={<ProductCardSkelton />}>
      <div className="group w-full block">
        <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#f4f4f4] mb-3 2xl:mb-4 bg-[#f4f4f4] relative z-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlist(!wishlist)}
            className="absolute z-2 top-2 xl:top-4 right-2 xl:right-4"
          >
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.39062 2.03027C8.85818 0.419111 10.5094 0.0894194 11.749 0.544922C12.9908 1.00129 13.9263 2.28275 13.8955 4.12402C13.8676 5.78912 12.7686 7.51198 11.3096 9.04004C9.9379 10.4766 8.3011 11.6826 7.12598 12.4326C5.95106 11.6827 4.3155 10.4769 2.94434 9.04102C1.48523 7.51297 0.385558 5.78917 0.357422 4.12402C0.326449 2.28301 1.26218 1.00146 2.50391 0.544922C3.74349 0.0891915 5.39453 0.418918 6.8623 2.03027L7.12695 2.32031L7.39062 2.03027Z"
                fill={wishlist ? "black" : "none"}
                stroke="#282828"
                strokeWidth="1"
              />
            </svg>
          </motion.button>
          {product?.stock == 0 && (
            <div className="w-full h-full bg-[#f4f4f4]/90 flex items-center justify-center absolute z-2 inset-0">
              <Button
                variant={"black"}
                disabled={true}
                className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[200px] disabled:opacity-100 rounded-[2px] m-auto"
              >
                Out of Stock
              </Button>
            </div>
          )}
          <Image
            src={product?.media_path}
            alt={isEn ? product?.title : product?.title_ar}
            width={550}
            height={440}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product?.hoverMedia && (
            <Image
              src={product?.hoverMedia?.path}
              alt={product?.hoverMedia?.alt}
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
            className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
          >
            <Link href={productUrl}>{product?.category_name}</Link>
          </Heading>
          <Heading
            as="div"
            size="none"
            className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
          >
            <Link href={productUrl}>{isEn ? product?.title : product?.title_ar}</Link>
          </Heading>
          <Text
            as="div"
            size="none"
            className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
          >
            <Link href={productUrl}>
              AED {product?.price} <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc] ">Inc Tax</span>
            </Link>
          </Text>
          <div className="flex items-center gap-0.5 xl:gap-1">
            {product?.colorVariant?.length > 0 ? (
              <>
                {product?.colorVariant?.slice(0, 3).map((color, index) => (
                  <Link
                    key={"color" + index}
                    href={productUrl}
                    className="w-2.5 h-2.5 rounded-full hover:scale-110 transition-transform duration-300 block"
                    style={{ backgroundColor: color }}
                  ></Link>
                ))}
                {product?.colorVariant?.length > 3 && (
                  <div className="text-[8px] 2xl:text-[10px] leading-normal font-light text-[#28288] pt-0.5">
                    <Link href={productUrl}>+ More</Link>
                  </div>
                )}
              </>
            ) : (
              <Link href={productUrl} className="text-[8px] 2xl:text-[10px] leading-normal font-light text-[#28288] hover:text-[#f17423]">
                View Product
              </Link>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function ProductCardSkelton() {
  return (
    <div className="group w-full block">
      <Skeleton className="w-full aspect-[550/440] mb-3 2xl:mb-4 " />
      <div>
        <Skeleton className="w-1/2 h-3 mb-1 " />
        <Skeleton className="w-full h-4 mb-1 " />
        <Skeleton className="w-full h-4 mb-3 xl:mb-4 2xl:mb-6 " />
        <div className="flex gap-0.5 xl:gap-1">
          {[1, 2, 3].map((index) => (
            <Skeleton key={"color" + index} className="w-2.5 h-2.5 rounded-full hover:scale-110 transition-transform duration-300"></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
