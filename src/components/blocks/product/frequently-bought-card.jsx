"use client";
import Image from "next/image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense, useState } from "react";
import { motion } from "motion/react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FrequentlyBoughtCard({ product }) {
  const [selected, setSelected] = useState(true);

  return (
    <Suspense fallback={<FrequentlyBoughtCardSkelton />}>
      <div className="group w-full block">
        <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#f4f4f4] mb-1 2xl:mb-2 bg-[#f4f4f4] relative z-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelected(!selected)}
            className="w-3 xl:w-3.5 2xl:w-4.5 aspect-square bg-white flex items-center justify-center absolute z-2 top-1 xl:top-2 left-1 xl:left-2"
          >
            <Check
              className={cn("size-2 2xl:size-3", selected ? "text-black" : "text-white")}
            />
          </motion.button>
          {!product?.isStock && (
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
            src={product?.media?.path}
            alt={product?.media?.alt}
            width={550}
            height={440}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            quality={90}
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
            className="text-[8px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
          >
            <Link href={product?.slug}>{product?.category}</Link>
          </Heading>
          <Heading
            as="div"
            size="none"
            className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
          >
            <Link href={product?.slug}>{product?.name}</Link>
          </Heading>
          <Text
            as="div"
            size="none"
            className="text-[11px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828]"
          >
            <Link href={product?.slug}>
              AED {product?.price}{" "}
              <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc] ">
                Inc Tax
              </span>
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
