"use client";
import React, { useState, useEffect, useCallback } from "react";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import ProductEnquireModal from "./ProductEnquireModal";
import ProductDetails from "./ProductDetails";
import ProductChooseDesign from "./ProductChooseDesign";

const enq = {
  title: "Enquire Now",
  subtitle: "Bulk Orders & Customisation Available!",
  description: "<p>Need 10 or 100 chairs? Want them in your brand colours or a unique design? No problem. Just tell us what you need below!</p>",
};

export default function ProductDetailCopy({ locale, initialData, productData, models, productSlug }) {
  console.log("initialData", initialData?.title);
  const [isModelLoading, setIsModelLoading] = useState(false);

  console.log("initialData", initialData);

  const productImages = initialData?.images || [];
  const currentModelId = initialData?.model_id;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      dragFree: false,
      align: "start",
      direction: locale === "ar" ? "rtl" : "ltr",
    },
    [Fade()],
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [frequentlyEmblaRef, frequentlyEmblaApi] = useEmblaCarousel({ loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/, "");
    const numValue = value === "" ? 1 : parseInt(value);
    setQuantity(numValue);
  };

  const [openProduct, setOpenProduct] = useState(false);

  const [indexProduct, setIndexProduct] = useState(0);

  const [isChooseDesignOpen, setIsChooseDesignOpen] = useState(false);

  const [wishlist, setWishlist] = useState(false);

  return (
    <section className="w-full block py-[10px_30px] xl:py-[0_60px] 2xl:py-[5px_100px]">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-4 2xl:-mx-5 [&>*]:p-2.5 xl:[&>*]:p-4 2xl:[&>*]:p-5">
          <div className="w-full lg:w-[520px] xl:w-[668px] 2xl:w-[800px] 3xl:w-[1000px]">
            <div
              className={cn(
                "max-w-[576px] xl:max-w-[1080px] flex flex-wrap  max-lg:flex-direction-row-reverse",
                !isChooseDesignOpen && "lg:sticky lg:top-[var(--header-y)]",
              )}
            >
              <div className="w-[60px] sm:w-[80px] xl:w-[100px] 2xl:w-[140px] mask-[linear-gradient(to_bottom,transparent_0%,white_5%,white_95%,transparent_100%)]">
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                  <div className="flex flex-col h-[320px] sm:h-[376px] xl:h-[420px] 2xl:h-[576px] 3xl:h-[740px] touch-pan-x touch-pinch-zoom">
                    {productImages?.map((item, index) => (
                      <div key={index} className="flex-[0_0_25%] min-h-0 py-1 xl:py-2">
                        <button
                          onClick={() => onThumbClick(index)}
                          type="button"
                          className={cn(
                            "w-full h-full bg-black rounded-[4px] overflow-hidden border transition select-none",
                            index === selectedIndex ? " border-[#282828]" : "border-[#e9e9e9]",
                          )}
                        >
                          <Image src={item?.media_path} alt={item?.alt || "thumb"} width={512} height={512} className="w-full h-full object-cover" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "w-[calc(100%-60px)] sm:w-[calc(100%-80px)] xl:w-[calc(100%-100px)] 2xl:w-[calc(100%-140px)]",
                  locale === "ar" ? "pr-2 xl:pr-4" : "pl-2 xl:pl-4",
                  isChooseDesignOpen ? "lg:relative lg:z-51" : "relative z-0",
                )}
              >
                <div className="overflow-hidden" ref={emblaMainRef}>
                  <div className="flex h-[320px] sm:h-[376px] xl:h-[420px] 2xl:h-[576px] 3xl:h-[740px] touch-pan-y touch-pinch-zoom">
                    {productImages?.map((item, index) => (
                      <div
                        key={index}
                        className="flex-[0_0_100%] min-w-0"
                        onClick={() => {
                          setIndexProduct(index);
                          setOpenProduct(true);
                        }}
                      >
                        <div className={cn("w-full h-full rounded-[4px] overflow-hidden border transition-all duration-300 bg-white select-none")}>
                          {item?.media_type === "video" ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={item?.media_path} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={item?.media_path || "/images/placeholder.jpg"}
                              alt={item?.alt || "main"}
                              width={1080}
                              height={1080}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <Lightbox
                      open={openProduct}
                      close={() => setOpenProduct(false)}
                      index={indexProduct}
                      slides={productImages?.map((item) =>
                        item.media_type === "video"
                          ? {
                              type: "video",
                              width: 1280,
                              height: 720,
                              poster: item.thumbnail_path,
                              autoPlay: true,
                              sources: [
                                {
                                  src: item.path,
                                  type: "video/mp4",
                                },
                              ],
                            }
                          : {
                              src: item.path,
                            },
                      )}
                      animation={{ fade: 10 }}
                      controller={{
                        closeOnPullDown: true,
                        closeOnBackdropClick: true,
                      }}
                      plugins={[Video, Zoom]}
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "flex gap-3 2xl:gap-4 absolute z-2 top-2 xl:top-4",
                    locale === "ar" ? "left-2 xl:left-4 2xl:left-5" : "right-2 xl:right-4 2xl:right-5",
                  )}
                >
                  <button onClick={() => setWishlist(!wishlist)} className="w-3 2xl:w-4.5 hover:cursor-pointer transition hover:scale-105">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
                      <path
                        d="M7.39062 2.03027C8.85818 0.419111 10.5094 0.0894194 11.749 0.544922C12.9908 1.00129 13.9263 2.28275 13.8955 4.12402C13.8676 5.78912 12.7686 7.51198 11.3096 9.04004C9.9379 10.4766 8.3011 11.6826 7.12598 12.4326C5.95106 11.6827 4.3155 10.4769 2.94434 9.04102C1.48523 7.51297 0.385558 5.78917 0.357422 4.12402C0.326449 2.28301 1.26218 1.00146 2.50391 0.544922C3.74349 0.0891915 5.39453 0.418918 6.8623 2.03027L7.12695 2.32031L7.39062 2.03027Z"
                        fill={wishlist ? "black" : "none"}
                        stroke="#282828"
                        strokeWidth="1"
                      />
                    </svg>
                  </button>
                  <button className="w-2.5 2xl:w-3.5 hover:cursor-pointer transition hover:scale-105">
                    <Image src="/images/icon-share.svg" alt="icon-share" width={12} height={12} className="w-full h-full block" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[calc(100%-520px)] xl:w-[calc(100%-668px)] 2xl:w-[calc(100%-800px)] 3xl:w-[calc(100%-1000px)] max-sm:mb-2">
            <div className="w-full xl:max-w-[390px] 2xl:max-w-[468px] 3xl:max-w-[576px]">
              <Heading
                as="div"
                size="none"
                className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-1"
              >
                {productData?.category_name}
              </Heading>
              <Heading as="div" size="heading2" className="font-normal text-[#282828] mb-1 2xl:mb-2 max-sm:font-bold">
                {initialData?.title}
              </Heading>
              <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
                {parse(productData?.description)}
              </Text>

              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

              <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4">
                Choose Your Design
              </Heading>

              <div className="mb-2">
                <div className="w-full max-w-[468px] bg-[#f2f2f2] border border-[#dedede] flex items-center p-1 rounded-[4px]">
                  <div className="w-[40px] xl:w-[45px] 2xl:w-[55px] aspect-square rounded-[4px] overflow-hidden bg-white">
                    <Image
                      src={initialData?.model_media}
                      alt={initialData?.alt || "design"}
                      width={1080}
                      height={1080}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex justify-between gap-2 p-2 xl:p-2.5 2xl:p-[15px] ">
                    <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#282828]">
                      {initialData?.model_title}
                    </div>
                    <ProductChooseDesign
                      data={initialData}
                      locale={locale}
                      onOpenChange={setIsChooseDesignOpen}
                      currentModelId={currentModelId}
                      isModelLoading={isModelLoading}
                      productSlug={productSlug}
                    >
                      <Button
                        variant={"link"}
                        className={"text-[8px] xl:text-[10px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light text-[#282828] h-auto! "}
                      >
                        + More
                      </Button>
                    </ProductChooseDesign>
                  </div>
                </div>
              </div>

              <Heading
                as="div"
                size="none"
                className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#808080] mb-2 xl:mb-3 2xl:mb-5"
              >
                {/* todo */}
              </Heading>
              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />
              <Heading
                as="div"
                size="none"
                className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-normal text-[#282828] [&_span]:text-[70%] [&_span]:font-light [&_span]:text-[#bbbcbc] mb-2 xl:mb-3 2xl:mb-5"
              >
                AED {initialData?.price} <span>Inc Tax</span>
              </Heading>
              <div className="w-full flex flex-wrap gap-2.5 mb-3 xl:mb-3 2xl:mb-5">
                <div className="w-[60px] xl:w-[60px] 2xl:w-[80px] h-[35px] lg:h-[40px] 2xl:h-[45px] 3xl:h-[55px] flex items-center rounded-[6px] overflow-hidden bg-white border border-[#dedede]">
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    className="text-[12px] xl:text-[14px] leading-none font-normal text-center text-black w-8/10 overflow-hidden focus:outline-none"
                  />
                  <div className="w-4/10 flex flex-col align-center justify-center">
                    <button
                      onClick={handleDecrement}
                      className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <ChevronUp className="size-3 text-black" />
                    </button>

                    <button onClick={handleIncrement} className="transition-colors" disabled={quantity == initialData?.stock}>
                      <ChevronDown className="size-3 text-black" />
                    </button>
                  </div>
                </div>
                <Button variant={"black"} className="flex-1 max-w-[320px] xl:max-w-[768px]" asChild>
                  <Link href={"/"}>
                    <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" />
                    Add to Cart
                  </Link>
                </Button>
              </div>

              <div className="w-full mb-1 xl:mb-2">
                <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
                  {"Total: $"}
                  <span className="font-medium">{(quantity * initialData?.price).toFixed(2)}</span>
                </Text>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 2xl:gap-6 mb-2 xl:mb-3 2xl:mb-5 max-lg:flex-wrap-reverse">
                <div className="flex lg:flex-1">
                  <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
                    {"Enhance Your Productivity by Upgrading Your Workspace Comfort Today"}
                  </Text>
                </div>
                <Button variant={"link"} className={"font-normal underline h-auto "} asChild>
                  <Link href={"/"}>Buy Now</Link>
                </Button>
                <ProductEnquireModal data={enq} locale={locale}>
                  <Button variant={"link"} className={"font-normal underline h-auto"}>
                    Enquire Now
                  </Button>
                </ProductEnquireModal>
              </div>

              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

              <div className="flex flex-wrap sm:justify-between gap-1 sm:gap-2.5 2xl:gap-5">
                {productData?.selling_points.map((item, index) => (
                  <div key={"features" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-[#282828] flex gap-x-1 2xl:gap-x-2 max-sm:bg-[#f2f2f2] max-sm:border max-sm:border-[#dedede] max-sm:p-1.5 max-sm:rounded-lg"
                    >
                      <Image
                        src={item?.media_path || "/images/placeholder.jpg"}
                        alt={item?.name}
                        width={15}
                        height={15}
                        className="w-4"
                        unoptimized
                      />

                      {parse(item?.name)}
                    </Text>
                  </div>
                ))}
              </div>

              {/* <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" /> */}

              {/* <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-3 2xl:mb-4 mt-2.5 2xl:mt-4">
                Frequently Bought Together
              </Heading>
              <div
                className={cn(
                  locale === "ar"
                    ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0 max-sm:-ml-4"
                    : "max-sm:mask-[linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0 max-sm:-mr-4",
                )}
              >
                <div className="w-full max-w-full mb-3 sm:mb-4 2xl:mb-6">
                  <div className="overflow-hidden" ref={frequentlyEmblaRef}>
                    <div className="flex touch-pan-y touch-pinch-zoom -mx-2 sm:-mx-4 xl:-mx-7 2xl:-mx-8 *:px-2 sm:*:px-4 xl:*:px-7 2xl:*:px-8">
                      {data?.frequentlyBought?.map((item, index) => (
                        <div
                          key={"frequentlyBought" + index}
                          className="flex-[0_0_176px] sm:flex-[0_0_33.333%] lg:flex-[0_0_50%] min-w-0 select-none relative z-0"
                        >
                          <FrequentlyBoughtCard product={item} />
                          {index !== data?.frequentlyBought?.length - 1 && (
                            <Image
                              src={"/images/icon-plus.svg"}
                              alt={"icon-plus"}
                              width={12}
                              height={12}
                              className={cn(
                                "w-[8px] xl:w-[10px] 2xl:w-[12px]",
                                "absolute top-1/2 -translate-y-1/2",
                                locale === "ar" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" /> */}
              <div className="flex justify-between items-center gap-2">
                {/* <div>
                  <Heading
                    as="div"
                    size="none"
                    className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
                  >
                    Total (3 items)
                  </Heading>
                  <Text
                    as="div"
                    size="none"
                    className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-bold truncate text-[#282828]"
                  >
                    AED 667
                  </Text>
                </div> */}
                {/* <div>
                  <Button variant={"black"} className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[160px] mx-auto" asChild>
                    <Link href={"/"}>
                      <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" />
                      Add to Cart
                    </Link>
                  </Button>
                </div> */}
              </div>
              {/* <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" /> */}
            </div>
          </div>
        </div>
        <ProductDetails
          data={productData}
          locale={locale}
          setIndexProject={setIndexProduct}
          setOpenProject={setOpenProduct}
          openProject={openProduct}
          indexProject={indexProduct}
        />
      </div>
    </section>
  );
}
