import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Skeleton } from "../../ui/skeleton";
import { Text } from "@/components/utils/text";

export default function ProjectCard({ data, locale }) {
  const isEN = locale === "en";

  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <div className="group w-full h-full flex flex-col justify-between">
        <Link
          href={`/${locale}/projects/${data?.slug}`}
          className="w-full block aspect-square overflow-hidden border border-gray-100 bg-black mb-1.5 sm:mb-3 xl:mb-4"
        >
          <Image
            src={data?.media?.media_path || "/images/placeholder.jpg"}
            alt={isEN ? data?.media_alt : data?.media_alt_ar}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
            quality={90}
          />
        </Link>
        <Text
          as="div"
          size="text3"
          className="font-normal turncate text-[#282828] hover:underline"
        >
          <Link href={`/${locale}/projects/${data?.slug}`}>
            {isEN ? data?.title : data?.title_ar}
          </Link>
        </Text>
      </div>
    </Suspense>
  );
}

function ProjectSkeleton() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Skeleton className="w-full block aspect-square mb-1.5 sm:mb-3 xl:mb-4" />
      <Skeleton className="w-1/2 h-3 mb-1 xl:mb-2" />
    </div>
  );
}
