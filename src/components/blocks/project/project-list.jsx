"use client";
import { cn } from "@/lib/utils";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { motion } from "motion/react";

export default function ProjectList({ locale, data }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [itemsToShow, setItemsToShow] = useState(6);
  const ITEMS_PER_PAGE = 6;

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return data?.items || [];
    }
    return (
      data?.items?.filter((item) => item.category === activeCategory) || []
    );
  }, [activeCategory, data?.items]);

  // Get items to display based on itemsToShow
  const displayedItems = filteredItems.slice(0, itemsToShow);

  // Check if all items are shown
  const allItemsShown = itemsToShow >= filteredItems.length;

  // Show load more button only if there are more items than initial 6
  const showLoadMoreButton = filteredItems.length > ITEMS_PER_PAGE;

  const handleLoadMore = () => {
    if (allItemsShown) {
      // Reset to show only initial items
      setItemsToShow(ITEMS_PER_PAGE);
    } else {
      // Load more items
      setItemsToShow((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setItemsToShow(ITEMS_PER_PAGE); // Reset to initial count when changing category
  };

  return (
    <section className="w-full block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap mb-3 xl:mb-6 2xl:mb-10 gap-2">
          {data?.categoryType?.map((item, index) => (
            <button
              key={`categoryType-${index}`}
              onClick={() => handleCategoryChange(item)}
              className={cn(
                "text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-light px-3 xl:px-4 2xl:px-6 py-1 xl:py-1.5 2xl:py-2 rounded-full xl:rounded-[20px] transition-colors cursor-pointer",
                activeCategory === item
                  ? "text-white bg-[#282828]"
                  : "text-[#282828] bg-gray-100 sm:bg-none hover:bg-gray-100"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap -mx-2 sm:-mx-2 xl:-mx-2 2xl:-mx-3 [&>*]:px-2 xl:[&>*]:px-2 2xl:[&>*]:px-3 [&>*]:py-3 xl:[&>*]:py-5 2xl:[&>*]:py-7">
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3"
            >
              <ProjectCard data={item} />
            </motion.div>
          ))}
        </div>

        {showLoadMoreButton && (
          <div className="flex mt-10 xl:mt-14 2xl:mt-18">
            <Button
              variant="black"
              onClick={handleLoadMore}
              className="min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px] mx-auto"
            >
              {allItemsShown ? "Show Less" : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
