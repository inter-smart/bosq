import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn, saveVariantToStorage, getStoredVariants } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Heading } from "../utils/heading";
import { Text } from "../utils/text";

import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetSearchQuery,
  useLazyGetSearchQuery,
} from "@/store/services/searchApi";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounce";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";

const placeholders = [
  "Search by Category",
  "Ergonomic Chairs",
  "Office Chairs",
];

export default function SearchDialog({ children, locale }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const debouncedQuery = useDebouncedValue(searchQuery, 500);

  const [triggerSearch] = useLazyGetSearchQuery();

  const { data: initialData, isLoading } = useGetSearchQuery({
    keywords: debouncedQuery,
  });

  if (isLoading) return <div>Loading...</div>;

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const onSubmit = (e) => {
    if (searchQuery.trim()) {
      triggerSearch({ keywords: searchQuery });
    }
  };

  const suggestedData = getStoredVariants("recently_viewed");
  const categories = getStoredVariants("categories");

  const visibleSuggestions = showAllSuggestions
    ? suggestedData
    : suggestedData?.slice(0, 5);

  const suggestedItems = [
    {
      title: "Suggessions",
      items: visibleSuggestions,
    },
    {
      title: "Categories",
      items: categories,
    },
  ];

  const products = initialData?.data || [];
  const hasResults = products.length > 0;

  console.log(categories);
  const handleAddToLocalStorage = (item) => {
    saveVariantToStorage({
      label: item?.title,
      url: `/${locale}/products/${item?.baseSlug}?sku=${item?.slug}`,
      STORAGE_KEY: "recently_viewed",
    });

    console.log(item?.category);
    saveVariantToStorage({
      label: item?.category?.name,
      url: `/${locale}/products?${item?.category?.parent_id ? `category=${item?.category?.slug}` : `sub_category=${item?.category?.slug}`}`,
      STORAGE_KEY: "categories",
    });
  };

  const slicedProducts = products.length < 5 ? products : products.slice(0, 5);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="inset-0 translate-none rounded-none p-0 max-w-full sm:max-w-full mt-(--header-y) mt-0"
      >
        <DialogHeader className={"sr-only"}>
          <DialogTitle>Search products</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button
            variant="none"
            size="none"
            className={cn(
              "block fixed z-1 top-4 xl:top-8 2xl:top-10 ",
              locale === "ar"
                ? "mr-auto left-4 sm:left-[calc((100%-var(--container-sm))/2)] md:left-[calc((100%-var(--container-md))/2)] lg:left-[calc((100%-var(--container-lg))/2)] xl:left-[calc((100%-var(--container-xl))/2)] 2xl:left-[calc((100%-var(--container-2xl))/2)] 3xl:left-[calc((100%-var(--container-3xl))/2)]"
                : "ml-auto right-4 sm:right-[calc((100%-var(--container-sm))/2)] md:right-[calc((100%-var(--container-md))/2)] lg:right-[calc((100%-var(--container-lg))/2)] xl:right-[calc((100%-var(--container-xl))/2)] 2xl:right-[calc((100%-var(--container-2xl))/2)] 3xl:right-[calc((100%-var(--container-3xl))/2)]",
            )}
          >
            <X className="size-5 sm:size-4 2xl:size-5 text-black" />
          </Button>
        </DialogClose>

        <div
          className={cn(
            "w-full min-h-10 bg-[#f4f4f4] transition duration-800 shadow-lg",
            //  "absolute z-10 top-(--header-y) left-0 right-0 "
          )}
        >
          <div
            className={cn(
              "py-8 sm:py-8 xl:py-10 2xl:py-12",
              // "lg:h-[calc(100vh-var(--header-y))]",
              "lg:h-screen",
              "mask-[linear-gradient(to_bottom,transparent_0%,white_4%,white_98%,transparent_100%)] overflow-y-auto",
            )}
          >
            <div className="container">
              <div className="flex flex-wrap -mx-4 xl:-mx-10 2xl:-mx-16 [&>div]:px-4 xl:[&>div]:px-10 2xl:[&>div]:px-16">
                <div className="w-full sm:w-[200px] lg:w-[220px] xl:w-[420px] 2xl:w-[468px] 3xl:w-[576px]">
                  <Heading
                    as="div"
                    size="heading6"
                    className="text-[#282828] mb-2 xl:mb-3 2xl:mb-6"
                  >
                    Search Now
                    <span
                      className={cn(
                        "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                        locale === "ar"
                          ? "-translate-x-1 xl:-translate-x-2 "
                          : "translate-x-1 xl:translate-x-2 ",
                      )}
                    />
                  </Heading>
                  {/* <RecaptchaProvider> */}
                    <PlaceholdersAndVanishInput
                      placeholders={placeholders}
                      onChange={handleChange}
                      onSubmit={onSubmit}
                      autoFocus
                      locale={locale}
                      className="max-w-full"
                      variant="search"
                    />
                  {/* </RecaptchaProvider> */}

                  {suggestedItems?.map((item, index) => (
                    <div
                      className="w-full mt-4 sm:mt-3 xl:mt-4 2xl:mt-8"
                      key={index}
                    >
                      {item?.items.length > 0 && (
                        <Heading
                          as="div"
                          size="heading4"
                          className="text-[#282828] mb-2 xl:mb-3 2xl:mb-4"
                        >
                          {item?.title}
                        </Heading>
                      )}
                      {item?.items?.map((item, idx) => (
                        <Text
                          key={"suggesions-item-" + idx}
                          as="div"
                          size="text3"
                          className="text-black flex items-center gap-1 my-1 xl:my-1.5"
                        >
                          <Image
                            src={"/images/search-right.svg"}
                            alt={"search-right"}
                            width={6}
                            height={4}
                            className={cn(
                              "w-1 xl:w-1.5",
                              locale === "ar" && "rotate-180",
                            )}
                            quality={90}
                          />

                          <DialogClose asChild>
                            <Link href={item.url}>{item.label}</Link>
                          </DialogClose>
                        </Text>
                      ))}

                      {item?.items?.length > 5 && !showAllSuggestions && (
                        <Text
                          as="div"
                          size="text3"
                          className="text-black hover:underline flex items-center gap-1 my-1 xl:my-1.5"
                          onClick={() => setShowAllSuggestions(true)}
                        >
                          <Link href={"/products"}>
                            <Plus className="size-2 xl:size-2 inline-block" />{" "}
                            See More
                          </Link>
                        </Text>
                      )}
                    </div>
                  ))}
                </div>

                <MediaQuery minWidth={639}>
                  <div className="w-full sm:w-[calc(100%-200px)] lg:w-[calc(100%-220px)] xl:w-[calc(100%-420px)] 2xl:w-[calc(100%-468px)] 3xl:w-[calc(100%-576px)]">
                    <Heading
                      as="div"
                      size="heading4"
                      className="text-[#282828] my-2 xl:my-3 2xl:my-4"
                    >
                      {isLoading
                        ? "Loading..."
                        : searchQuery
                          ? hasResults
                            ? `Found ${products.length} results for "${searchQuery}"`
                            : "No results found"
                          : `Showing ${slicedProducts.length} products`}
                    </Heading>

                    <div className="flex flex-wrap -mx-1 sm:-mx-1.5 xl:-mx-2 2xl:-mx-2.5 [&>*]:p-1 sm:[&>*]:p-1.5 xl:[&>*]:p-2 2xl:[&>*]:p-2.5">
                      {products?.slice(0, 5)?.map((item) => (
                        <div
                          key={item.id}
                          className="w-full 2xs:w-1/2 sm:w-1/3 md:w-1/3"
                        >
                          <div className="group w-full block">
                            <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-white mb-2 2xl:mb-3 bg-white relative z-0">
                              {!item?.stock > 0 && (
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
                                src={
                                  item?.media?.path ?? "/images/placeholder.jpg"
                                }
                                alt={item?.media?.alt}
                                width={550}
                                height={440}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                quality={90}
                              />
                              {item?.hoverMedia?.path && (
                                <Image
                                  src={
                                    item?.hoverMedia?.path ??
                                    "/images/placeholder.jpg"
                                  }
                                  alt={item?.hoverMedia?.alt}
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
                                {" "}
                                {item?.stock > 0 ? (
                                  <DialogClose asChild>
                                    <Link
                                      href={`/${locale}/products?${item?.category?.parent_id ? `category=${item?.category?.slug}` : `sub_category=${item?.category?.slug}`}`}
                                    >
                                      {item?.category?.name}
                                    </Link>
                                  </DialogClose>
                                ) : (
                                  <span className="opacity-50">
                                    {item?.category?.name}
                                  </span>
                                )}
                              </Heading>
                              <Heading
                                as="div"
                                size="none"
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
                              >
                                <DialogClose asChild>
                                  <Link
                                    href={`/${locale}/products/${item?.baseSlug}?sku=${item?.slug}`}
                                    onClick={() =>
                                      handleAddToLocalStorage(item)
                                    }
                                  >
                                    {item?.title}
                                  </Link>
                                </DialogClose>
                              </Heading>
                            </div>
                          </div>
                        </div>
                      ))}
                      {products.length > 5 && (
                        <div className="w-full 2xs:w-1/2 sm:w-1/3 md:w-1/3">
                          <div className="group w-full block">
                            <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#e9e9e9] bg-[#f4f4f4] flex items-center justify-center">
                              <Text
                                as="div"
                                size="text3"
                                className="font-normal text-black hover:underline"
                              >
                                <DialogClose asChild>
                                  <Link href={`/${locale}/products`}>
                                    See All Results ({products.length})
                                  </Link>
                                </DialogClose>
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </MediaQuery>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
