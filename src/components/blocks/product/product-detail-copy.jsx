"use client";
import React, { useState, useEffect, useCallback } from "react";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
import Image from "@/components/utils/custom-image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductEnquiryForm from "@/components/form/product-enquiry-form";
import ProductCard from "./product-card";
import FrequentlyBoughtCard from "./frequently-bought-card";

const local_data = {
  id: 1,
  variants: [
    {
      variantId: "VAR-GRN-L",
      color: "Forest Green",
      size: "L",
      stock: 15,
      images: [
        {
          url: "https://example.com/images/tshirt-green-front-lg.jpg",
          alt: "Forest Green T-Shirt, front view",
          isPrimary: true,
        },
        {
          url: "https://example.com/images/tshirt-green-back-lg.jpg",
          alt: "Forest Green T-Shirt, back view",
        },
      ],
    },
  ],
  media: [
    {
      type: "image",
      path: "/images/pro-detail-thumb-1.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-1.jpg",
    },
    {
      type: "video",
      // path: "/videos/pro-detail-1.mp4",
      path: "/images/pro-detail-thumb-2.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-2.jpg",
    },
    {
      type: "image",
      path: "/images/pro-detail-thumb-3.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-3.jpg",
    },
    {
      type: "image",
      path: "/images/pro-detail-thumb-4.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-4.jpg",
    },
    {
      type: "image",
      path: "/images/pro-detail-thumb-1.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-1.jpg",
    },
    {
      type: "video",
      // path: "/videos/pro-detail-1.mp4",
      path: "/images/pro-detail-thumb-2.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-2.jpg",
    },
    {
      type: "image",
      path: "/images/pro-detail-thumb-3.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-3.jpg",
    },
    {
      type: "image",
      path: "/images/pro-detail-thumb-4.jpg",
      alt: "pro-1",
      thumbnail: "/images/pro-detail-thumb-4.jpg",
    },
  ],
  hoverMedia: {
    type: "image",
    path: "/images/pro-detail1-1.jpg",
    alt: "pro-1",
  },
  name: "Orca Mid Back Ergonomic Office Chair ",
  slug: "continue-table",
  price: 458,
  category: "Office Chair",
  colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
  shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
  description:
    "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
  productType: ["Office Chairs", "Ergonomic Chairs"],
};

const accordionTriggerStyle = cn(
  "text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] py-4 sm:py-4 xl:py-5 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
);

export default function ProductDetailCopy({ locale, data = local_data }) {
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
  const [openProject, setOpenProject] = useState(false);

  const [indexProduct, setIndexProduct] = useState(0);
  const [indexProject, setIndexProject] = useState(0);

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
                    {data?.productMedia?.map((item, index) => (
                      <div key={index} className="flex-[0_0_25%] min-h-0 py-1 xl:py-2">
                        <button
                          onClick={() => onThumbClick(index)}
                          type="button"
                          className={cn(
                            "w-full h-full bg-black rounded-[4px] overflow-hidden border transition select-none",
                            index === selectedIndex ? " border-[#282828]" : "border-[#e9e9e9]",
                          )}
                        >
                          <Image src={item?.thumbnail} alt={item?.alt || "thumb"} width={512} height={512} className="w-full h-full object-cover" quality={90} />
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
                    {data?.productMedia?.map((item, index) => (
                      <div
                        key={index}
                        className="flex-[0_0_100%] min-w-0"
                        onClick={() => {
                          setIndexProduct(index);
                          setOpenProduct(true);
                        }}
                      >
                        <div className={cn("w-full h-full rounded-[4px] overflow-hidden border transition duration-300 bg-white select-none relative")}>
                          {data?.stock == 0 && (
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
                          {item?.type === "video" ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={item?.path} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={item?.path || "/images/placeholder.jpg"}
                              alt={item?.alt || "main"}
                              width={1080}
                              height={1080}
                              className="w-full h-full object-cover"
                              quality={90}
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    <Lightbox
                      open={openProduct}
                      close={() => setOpenProduct(false)}
                      index={indexProduct}
                      slides={data?.productMedia?.map((item) =>
                        item.type === "video"
                          ? {
                            type: "video",
                            width: 1280,
                            height: 720,
                            poster: item.thumbnail,
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
                    <Image src="/images/icon-share.svg" alt="icon-share" width={12} height={12} className="w-full h-full block" quality={90} />
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
                {data?.category}
              </Heading>
              <Heading as="div" size="heading2" className="font-normal text-[#282828] mb-1 2xl:mb-2 max-sm:font-bold">
                {data?.name}
              </Heading>
              <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
                {parse(data?.shortDescription)}
              </Text>

              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

              <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4">
                Choose Your Design
              </Heading>
              {[1].map((index) => (
                <div key={index} className="mb-2">
                  <div className="w-full max-w-[468px] bg-[#f2f2f2] border border-[#dedede] flex items-center p-1 rounded-[4px]">
                    <div className="w-[40px] xl:w-[45px] 2xl:w-[55px] aspect-square rounded-[4px] overflow-hidden bg-white">
                      <Image
                        src={data?.chooseDesign?.selectedDesign?.image}
                        alt={data?.chooseDesign?.selectedDesign?.title}
                        width={1080}
                        height={1080}
                        className="w-full h-full object-contain"
                        quality={90}
                      />
                    </div>
                    <div className="flex-1 flex justify-between gap-2 p-2 xl:p-2.5 2xl:p-[15px] ">
                      <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#282828]">
                        {data?.chooseDesign?.selectedDesign?.title}
                      </div>
                      <ChooseDesign data={data?.chooseDesign} locale={locale} onOpenChange={setIsChooseDesignOpen}>
                        <Button
                          variant={"link"}
                          className={"text-[8px] xl:text-[10px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light text-[#282828] h-auto! "}
                        >
                          + More
                        </Button>
                      </ChooseDesign>
                    </div>
                  </div>
                </div>
              ))}
              <Heading
                as="div"
                size="none"
                className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#808080] mb-2 xl:mb-3 2xl:mb-5"
              >
                {parse(data?.chooseDesign?.selectedDesign?.subtitle)}
              </Heading>
              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />
              <Heading
                as="div"
                size="none"
                className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-normal text-[#282828] [&_span]:text-[70%] [&_span]:font-light [&_span]:text-[#bbbcbc] mb-2 xl:mb-3 2xl:mb-5"
              >
                {data?.formattedPrice} <span>Inc Tax</span>
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

                    <button onClick={handleIncrement} className="transition-colors">
                      <ChevronDown className="size-3 text-black" />
                    </button>
                  </div>
                </div>
                <Button variant={"black"} className="flex-1 max-w-[320px] xl:max-w-[768px]" disabled={data?.stock == 0} asChild>
                  {data?.stock == 0 ? (
                    <span>Out of Stock</span>
                  ) : (
                    <Link href={"/"}>
                      <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" quality={90} />
                      Add to Cart
                    </Link>
                  )}
                </Button>
              </div>

              {quantity * data?.price > data?.price && (
                <div className="w-full mb-1 xl:mb-2">
                  <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
                    {"Total: $"}
                    <span className="font-medium">{(quantity * data?.price).toFixed(2)}</span>
                  </Text>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 2xl:gap-6 mb-2 xl:mb-3 2xl:mb-5 max-lg:flex-wrap-reverse">
                <div className="flex lg:flex-1">
                  <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
                    {parse(data?.purchaseTagline)}
                  </Text>
                </div>
                <Button variant={"link"} className={"font-normal underline h-auto "} asChild>
                  <Link href={"/"}>Buy Now</Link>
                </Button>
                <EnquireModal data={data?.enquiry} locale={locale}>
                  <Button variant={"link"} className={"font-normal underline h-auto"}>
                    Enquire Now
                  </Button>
                </EnquireModal>
              </div>

              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

              <div className="flex flex-wrap sm:justify-between gap-1 sm:gap-2.5 2xl:gap-5">
                {data?.specification.map((item, index) => (
                  <div key={"features" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-[#282828] flex gap-x-1 2xl:gap-x-2 max-sm:bg-[#f2f2f2] max-sm:border max-sm:border-[#dedede] max-sm:p-1.5 max-sm:rounded-lg"
                    >
                      <Image src={item?.iconPath || "/images/placeholder.jpg"} alt={item?.title} width={15} height={15} className="w-4" unoptimized />

                      {parse(item?.title)}
                    </Text>
                  </div>
                ))}
              </div>

              <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

              <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-3 2xl:mb-4 mt-2.5 2xl:mt-4">
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
                              quality={90}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" />
              <div className="flex justify-between items-center gap-2">
                <div>
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
                </div>
                <div>
                  <Button variant={"black"} className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[160px] mx-auto" disabled={data?.stock == 0} asChild>
                    {data?.stock == 0 ? (
                      <span>Out of Stock</span>
                    ) : (
                      <Link href={"/"}>
                        <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" quality={90} />
                        Add to Cart
                      </Link>
                    )}
                  </Button>
                </div>
              </div>
              <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" />
            </div>
          </div>
        </div>
        <div className="w-full mt-10 xl:mt-20">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <hr />
            <AccordionItem value="item-1">
              <AccordionTrigger className={accordionTriggerStyle}>Product Details</AccordionTrigger>
              <AccordionContent className="sm:px-2">
                <div dir={locale === "ar" ? "rtl" : "ltr"} className="typography flex flex-wrap justify-between">
                  <div className="xl:max-w-[540px] 2xl:max-w-[650px] 3xl:max-w-[820px]">
                    <h6>Optron hash High-Back Task Chair | Latice Series| Product Details</h6>
                    <p>
                      Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort
                      and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with
                      cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a
                      customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts
                      perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation,
                      keeping you cool and focused throughout the day.
                    </p>
                  </div>
                  <div className="xl:max-w-[468px] 2xl:max-w-[576px] 3xl:max-w-[700px] border border-[#e9e9e9] rounded-lg px-2.5 xl:px-5 2xl:px-7.5 py-1 xl:py-2.5 2xl:py-4">
                    <ul>
                      <li>
                        <b>Adjustable Backrest:</b> Independent height adjustment for tailored support.
                      </li>
                      <li>
                        <b>Seat Customization:</b> Sliding seat with depth adjustment for personalized comfort.
                      </li>
                      <li>
                        <b>Lumbar Support:</b> Dynamic variable lumbar support adapts to your spine’s natural curve.
                      </li>
                      <li>
                        <b>Breathable Mesh Backrest:</b> Enhances air circulation to keep you cool during long work hours.
                      </li>
                      <li>
                        <b>Modern Aesthetic:</b> Sleek, futuristic design perfect for contemporary office setups.
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <hr />
            <AccordionItem value="item-2">
              <AccordionTrigger className={accordionTriggerStyle}>Projects</AccordionTrigger>
              <AccordionContent className="sm:p-2">
                <div className="flex flex-wrap -mx-0.5 *:p-0.5 mt-4 mb-4 xl:mb-6 2xl:mb-10">
                  {data?.projectGallery.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setIndexProject(index);
                        setOpenProject(true);
                      }}
                      className="h-[100px] xs:h-[120px] sm:h-[200px] xl:h-[240px] 2xl:h-[300px] 3xl:h-[376px] nth-[1]:w-35/100 nth-[2]:w-25/100 nth-[3]:w-40/100 nth-[4]:w-20/100 nth-[5]:w-20/100 nth-[6]:w-40/100 nth-[7]:w-20/100"
                    >
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={item?.path || "/images/placeholder.jpg"}
                          alt={item?.alt}
                          width={576}
                          height={376}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          quality={90}
                        />
                      </div>
                    </div>
                  ))}

                  <Lightbox
                    open={openProject}
                    close={() => setOpenProject(false)}
                    index={indexProject}
                    slides={data?.projectGallery.map((src) => ({
                      src: src.path,
                    }))}
                    animation={{ fade: 0 }}
                    controller={{
                      closeOnPullDown: true,
                      closeOnBackdropClick: true,
                    }}
                    plugins={[Thumbnails]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <hr />
            <AccordionItem value="item-3">
              <AccordionTrigger className={accordionTriggerStyle}>Additional Information</AccordionTrigger>
              <AccordionContent className="sm:p-2">
                <div dir={locale === "ar" ? "rtl" : "ltr"} className="typography">
                  <h6>Optron hash High-Back Task Chair | Latice Series| Product Details</h6>

                  <p>
                    Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort
                    and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge
                    ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit
                    for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the
                    natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool
                    and focused throughout the day.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <hr />
            <AccordionItem value="item-4">
              <AccordionTrigger className={accordionTriggerStyle}>FAQ</AccordionTrigger>
              <AccordionContent className="sm:p-2">
                {[1, 2, 3, 4].map((index) => (
                  <div key={"faq" + index} className="typography mb-4">
                    <h6>Q{index}: Lorem ipsum dolor sit amet consectetur adipisicing?</h6>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, ratione!</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <hr />
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function ChooseDesign({ children, data, locale, onOpenChange }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [modelSelected, setModelSelected] = useState(1);

  const sheetAccordionTriggerStyle = cn(
    "text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
  );

  const CHOOSE_DESIGN_OPTIONS = {
    colors: ["Black", "White", "Gray", "Brown"],
    material: ["Solid", "Mesh", "Leather"],
    fabricName: ["Arezzo", "Bosq", "Cleo", "Dante", "Evo"],
  };

  return (
    <Sheet
      dir={locale === "ar" ? "rtl" : "ltr"}
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        onOpenChange?.(open); // notify parent
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        showCloseButton={false}
        className={"max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px] gap-0"}
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>{data?.title}</SheetTitle>
          <SheetDescription className="sr-only">Select your preferences</SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100dvh-(var(--header-y)+77px))] overflow-y-scroll px-2 sm:px-5">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {/* Model */}
            <AccordionItem value="item-1" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Model</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-wrap">
                  {data?.model.map((item, index) => (
                    <div key={"chooseDesign" + index} className="w-1/2">
                      <div
                        className={cn("w-full h-full border rounded-[6px] p-1 2xl:p-2", modelSelected === index ? "border-[#28828]" : "border-white")}
                        onClick={() => setModelSelected(index)}
                      >
                        <Image
                          src={item?.iconPath || "/images/placeholder.jpg"}
                          alt={item?.title}
                          width={75}
                          height={85}
                          className="w-[40px] xl:w-[45px] 2xl:w-[70px] aspect-[75/85] mx-auto mb-1 2xl:mb-1.5 block"
                          quality={90}
                        />
                        <div className="text-[8px] 2xl:text-[12px] leading-normal font-normal text-center text-[#282828] ">{item?.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Attributes check (Fallback for static version) */}
            {CHOOSE_DESIGN_OPTIONS && Object.keys(CHOOSE_DESIGN_OPTIONS).length === 0 && (
              <div className="text-[12px] xl:text-[14px] leading-normal font-light text-[#808080] py-6 px-4 text-center">
                No attributes found in choose your design section
              </div>
            )}
            {/* Color Option */}
            <AccordionItem value="item-2" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Color</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-2 sm:gap-4">
                  {CHOOSE_DESIGN_OPTIONS.colors.map((color) => (
                    <div key={color} className="flex items-center gap-2">
                      <Checkbox id={`color-${color}`} onCheckedChange={null} className="rounded-none" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* material */}
            <AccordionItem value="item-3" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Material</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-2 sm:gap-4">
                  {CHOOSE_DESIGN_OPTIONS.material.map((material) => (
                    <div key={material} className="flex items-center gap-2">
                      <Checkbox id={`material-${material}`} onCheckedChange={null} className="rounded-none" />
                      <Label
                        htmlFor={`material-${material}`}
                        className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                      >
                        {material}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* fabric */}
            <AccordionItem value="item-4" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Fabric name</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-2 sm:gap-4">
                  {CHOOSE_DESIGN_OPTIONS.fabricName.map((fabricName) => (
                    <div key={fabricName} className="flex items-center gap-2">
                      <Checkbox id={`fabricName-${fabricName}`} onCheckedChange={null} className="rounded-none" />
                      <Label
                        htmlFor={`fabricName-${fabricName}`}
                        className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                      >
                        {fabricName}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter className="flex flex-row justify-between">
          <Button onClick={null} variant="black" className="min-w-full">
            Apply Filters
          </Button>
        </SheetFooter>
        <SheetClose
          className={cn(
            "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute z-1 top-0 rounded-none! flex items-center justify-center",
            locale === "ar" ? "left-0" : "right-0",
          )}
          asChild
        >
          <Button variant="none" size="none">
            <X className="size-5 text-black" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

function EnquireModal({ children, data, locale }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet dir={locale === "ar" ? "rtl" : "ltr"} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        showCloseButton={false}
        className={"max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px] gap-0"}
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>{data?.title}</SheetTitle>
          <SheetDescription className="sr-only">{data?.subtitle}</SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100vh-(var(--header-y)+77px))] overflow-y-scroll px-4 sm:px-7">
          <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4">
            {data?.subtitle}
          </Heading>
          <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
            {parse(data?.description)}
          </Text>
          <ProductEnquiryForm />
        </div>

        {/* <SheetFooter className="flex flex-row justify-between">
          <Button onClick={null} variant="black" className="min-w-full">
            Submit Now
          </Button>
        </SheetFooter> */}

        <SheetClose
          className={cn(
            "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute z-1 top-0 rounded-none! flex items-center justify-center",
            locale === "ar" ? "left-0" : "right-0",
          )}
          asChild
        >
          <Button variant="none" size="none">
            <X className="size-5 text-black" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
