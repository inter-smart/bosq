"use client";
import { Skeleton } from "@/components/ui/skeleton";
import AccountNav from "@/components/blocks/account/account-nav";
import { useParams } from "next/navigation";

export default function AccountLoading() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <>
      {/* Hero / breadcrumb skeleton — kept so height matches the real hero */}
      <section className="w-full pt-[calc(var(--header-y)_+_20px)] sm:pt-[calc(var(--header-y)_+_10px)] pb-1 sm:pb-2.5">
        <div className="container">
          <div className="flex items-center gap-2 mb-1 xl:mb-2">
            <Skeleton className="h-3.5 w-10" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-28" />
          </div>
          <Skeleton className="h-8 w-52" />
        </div>
      </section>

      {/* Layout — real sidebar, skeleton content only */}
      <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[40px_100px]">
        <div className="container">
          <div className="flex flex-wrap -mx-1 xl:-mx-1 2xl:-mx-1.2 [&>*]:p-1 xl:[&>*]:p-1 2xl:[&>*]:p-1.2">

            {/* Real sidebar nav — stays visible during loading */}
            <div className="w-full sm:w-[200px] xl:w-[240px] 2xl:w-[268px] 3xl:w-[330px]">
              <AccountNav locale={locale} />
            </div>

            {/* Content skeleton — stretches to match sidebar height */}
            <div className="w-full sm:w-[calc(100%-200px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-268px)] 3xl:w-[calc(100%-330px)] flex">
              <Skeleton className="w-full h-full rounded-md" />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
