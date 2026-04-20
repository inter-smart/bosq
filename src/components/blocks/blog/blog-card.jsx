import Image from "@/components/utils/custom-image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense } from "react";
import { format } from "date-fns";

import { Skeleton } from "../../ui/skeleton";

export default function BlogCard({ locale, data, isEn }) {

  return (
    <Suspense fallback={<CartCardSkeleton />}>
      <div className="group w-full h-full flex flex-col justify-between">
        <Link
          href={`/${locale}/blogs/${data?.slug}`}
          className="w-full block aspect-580/290 overflow-hidden border border-gray-100 mb-1.5 sm:mb-3 xl:mb-5"
        >
          <Image
            src={data?.media?.path || "/images/placeholder.jpg"}
            alt={isEn ? data?.media?.alt : data?.media?.alt_ar}
            width={583}
            height={290}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            quality={90}
          />
        </Link>
        <div className="w-full flex-1 flex flex-col justify-between">
          <Heading
            as="div"
            size="heading4"
            className="tracking-tight line-clamp-2 text-[#282828] mb-1 xl:mb-2 hover:underline"
          >
            <Link href={`/${locale}/blogs/${data?.slug}`}>{isEn ? data?.title : data?.title_ar}</Link>
          </Heading>
          <Text
            as="div"
            size="text3"
            className="truncate text-[#b1b3b4] mb-1 xl:mb-2"
          >
            {data?.publishedAt ?? null}
          </Text>
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
