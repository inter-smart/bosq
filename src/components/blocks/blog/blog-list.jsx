"use client";
import React, { useState } from "react";
import BlogCard from "./blog-card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export default function BlogList({ locale, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  
    
  // Access the blog array from data structure
  const blogs = data?.blog || [];
  const pagination = data?.pagination || {};

  const { totalCount, currentPage: limit, page } = pagination;

  const isEn = locale === "en";

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 6;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <section className="w-full block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2 sm:-mx-2 xl:-mx-2 2xl:-mx-3 [&>*]:p-2 sm:[&>*]:p-2 xl:[&>*]:p-2 2xl:[&>*]:p-3">
          {currentBlogs.map((item) => (
            <div key={item?.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <BlogCard data={item}  isEn={isEn}/>
            </div>
          ))}
        </div>

        {/* Bottom Section with Pagination */}
        {blogs.length > 0 && (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-5 xl:mt-10 2xl:mt-16">
            <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
              Showing {startIndex + 1}-{Math.min(endIndex, blogs.length)} of{" "}
              {blogs.length} blogs
            </div>
            {totalPages > 1 && (
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          goToPrevious();
                        }}
                        className={cn(
                          "cursor-pointer",
                          currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                    {getPaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(item);
                            }}
                            isActive={currentPage === item}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          goToNext();
                        }}
                        className={cn(
                          "cursor-pointer",
                          currentPage === totalPages &&
                            "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
