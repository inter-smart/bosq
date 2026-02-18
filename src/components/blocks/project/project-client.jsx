// project-client.jsx (Client Component)
"use client";
import { cn } from "@/lib/utils";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { useMemo, useTransition } from "react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectClient({ locale, data, projects, slug, currentLimit, totalItems }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isEN = locale === "en";
  const ITEMS_PER_PAGE = 6;

  // Check if all items are shown
  const allItemsShown = currentLimit >= totalItems;

  // Show load more button only if there are more items than initial 6
  const showLoadMoreButton = totalItems > ITEMS_PER_PAGE;

  const handleLoadMore = () => {
    if (allItemsShown) {
      // Reset to show only initial items
      const params = new URLSearchParams();
      
      if (slug && slug !== "all") {
        params.set("slug", slug);
      }

      startTransition(() => {
        const queryString = params.toString();
        router.push(
          `/${locale}/projects${queryString ? `?${queryString}` : ""}`,
          { scroll: true }
        );
      });
    } else {
      // Load more items - increase limit by 6
      const newLimit = currentLimit + ITEMS_PER_PAGE;
      const params = new URLSearchParams(searchParams);
      params.set("limit", newLimit.toString());
      
      if (slug && slug !== "all") {
        params.set("slug", slug);
      }

      startTransition(() => {
        router.push(`/${locale}/projects?${params.toString()}`, {
          scroll: false,
        });
      });
    }
  };

  const handleCategoryChange = (newSlug) => {
    const params = new URLSearchParams();
    
    if (newSlug !== "all") {
      params.set("slug", newSlug);
    }
    // Don't set limit - will reset to default 6

    startTransition(() => {
      const queryString = params.toString();
      router.push(
        `/${locale}/projects${queryString ? `?${queryString}` : ""}`,
        { scroll: false }
      );
    });
  };

  const categories = useMemo(() => {
    return [
      { slug: "all", title: "All", title_ar: "الجميع" },
      ...(data?.list || []),
    ];
  }, [data?.list]);


  console.log("categories", categories)
  return (
    <section className="w-full block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap mb-3 xl:mb-6 2xl:mb-10 gap-2">
          {categories?.map((item, index) => (
            <button
              key={`categoryType-${index}`}
              onClick={() => handleCategoryChange(item?.slug)}
              disabled={isPending}
              className={cn(
                "text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-light px-3 xl:px-4 2xl:px-6 py-1 xl:py-1.5 2xl:py-2 rounded-full xl:rounded-[20px] transition-colors cursor-pointer",
                slug === item?.slug
                  ? "text-white bg-[#282828]"
                  : "text-[#282828] bg-gray-100 sm:bg-none hover:bg-gray-100",
                isPending && "opacity-50 cursor-not-allowed"
              )}
            >
              {isEN ? item?.title : item?.title_ar}
            </button>
          ))}
        </div>

        <div 
          className={cn(
            "flex flex-wrap -mx-2 sm:-mx-2 xl:-mx-2 2xl:-mx-3 [&>*]:px-2 xl:[&>*]:px-2 2xl:[&>*]:px-3 [&>*]:py-3 xl:[&>*]:py-5 2xl:[&>*]:py-7",
            isPending && "opacity-60"
          )}
        >
          {projects?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3"
            >
              <ProjectCard locale={locale} data={item} />
            </motion.div>
          ))}
        </div>

        {/* Pagination Info */}
        {/* {!isPending && projects?.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-600">
            {isEN
              ? `Showing ${projects.length} of ${totalItems} projects`
              : `عرض ${projects.length} من ${totalItems} مشروع`}
          </div>
        )} */}

        {showLoadMoreButton && (
          <div className="flex mt-10 xl:mt-14 2xl:mt-18">
            <Button
              variant="black"
              onClick={handleLoadMore}
              disabled={isPending}
              className="min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px] mx-auto"
            >
              {isPending
                ? isEN
                  ? "Loading..."
                  : "جاري التحميل..."
                : allItemsShown
                ? isEN
                  ? "Show Less"
                  : "عرض أقل"
                : isEN
                ? "Load More"
                : "تحميل المزيد"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}