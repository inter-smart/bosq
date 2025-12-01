"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
  shortDescription:
    "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
  description:
    "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
  productType: ["Office Chairs", "Ergonomic Chairs"],
};

export default function ProductDetail({ locale, data = local_data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      dragFree: false,
    },
    [Fade()]
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
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

  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px]">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-4 2xl:-mx-5 [&>*]:p-2.5 xl:[&>*]:p-4 2xl:[&>*]:p-5">
          <div className="w-full sm:w-[calc(100%-220px)] xl:w-[calc(100%-480px)] 2xl:w-[calc(100%-576px)] 3xl:w-[calc(100%-720px)]">
            <div className="max-w-full flex gap-x-4">
              <div className="w-[100px]">
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                  <div className="flex flex-col h-[500px] touch-pan-x touch-pinch-zoom">
                    {data?.media?.map((item, index) => (
                      <div
                        key={index}
                        className="flex-[0_0_25%] min-h-0 py-1 xl:py-2"
                      >
                        <button
                          onClick={() => onThumbClick(index)}
                          type="button"
                          className={cn(
                            "w-full h-full bg-black rounded-lg overflow-hidden border transition ",
                            index === selectedIndex
                              ? " border-[#282828]"
                              : "border-[#e9e9e9]"
                          )}
                        >
                          <Image
                            src={item?.thumbnail}
                            alt={item?.alt || "thumb"}
                            width={512}
                            height={512}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden" ref={emblaMainRef}>
                  <div className="flex h-[500px] touch-pan-y touch-pinch-zoom">
                    {data?.media?.map((item, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <div
                          className={cn(
                            "w-full h-full rounded-lg overflow-hidden border transition-all duration-300 bg-white"
                          )}
                        >
                          <Image
                            src={item?.path || "/images/placeholder.jpg"}
                            alt={item?.alt || "main"}
                            width={1080}
                            height={1080}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[220px] xl:w-[480px] 2xl:w-[576px] 3xl:w-[720px] max-sm:mb-2">
            <div>
              <Heading
                as="div"
                size="none"
                className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-1"
              >
                OFFICE CHAIR
              </Heading>
              <Heading
                as="div"
                size="heading2"
                className="font-normal text-[#282828] mb-2 2xl:mb-3"
              >
                Orca Mid Back Ergonomic Office Chair
              </Heading>
              <Text
                as="div"
                size="text3"
                className="text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
              >
                {parse(
                  "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>"
                )}
              </Text>
              <hr />
              <Heading
                as="div"
                size="heading4"
                className="font-normal text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4"
              >
                Choose Your Design
              </Heading>
              {[1, 2, 3].map((index) => (
                <div key={index} className="mb-2">
                  <div className="w-full bg-[#f2f2f2] border border-[#dedede] flex items-center p-1 rounded-lg">
                    <div className="w-[40px] xl:w-[45px] 2xl:w-[55px] aspect-square rounded-lg overflow-hidden bg-white">
                      <Image
                        src={"/images/placeholder.jpg"}
                        alt={"main"}
                        width={1080}
                        height={1080}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex justify-between xl:p-[10px] 2xl:p-[15px] ">
                      <Heading
                        as="div"
                        size="heading4"
                        className="font-normal text-[#282828]"
                      >
                        light grey Frisco fabric with aquaclean 2063
                      </Heading>
                      <div>more</div>
                    </div>
                  </div>
                </div>
              ))}
              <Heading
                as="div"
                size="heading4"
                className="font-normal text-[#282828]"
              >
                Bosq : light grey Frisco fabric with aquaclean 2063
              </Heading>
              <hr />
              <Heading
                as="div"
                size="none"
                className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-normal text-[#282828] [&_span]:text-[80%] [&_span]:leading-tight [&_span]:text-[#bbbcbc]"
              >
                AED 458 <span>Inc Tax</span>
              </Heading>
              <div className="w-full flex flex-wrap gap-[10px]">
                <div className="w-[80px] h-[35px] lg:h-[40px] 2xl:h-[45px] 3xl:h-[55px] flex items-center rounded-lg overflow-hidden bg-white border border-[#dedede]">
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    className="text-[12px] xl:text-[14px] leading-none font-normal text-center text-black overflow-hidden w-[calc(100%-25px)] focus:outline-none"
                  />
                  <div className="w-[25px] flex flex-col align-center">
                    <button
                      onClick={handleDecrement}
                      className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <ChevronUp className="size-4 text-black" />
                    </button>

                    <button
                      onClick={handleIncrement}
                      className="transition-colors"
                    >
                      <ChevronDown className="size-4 text-black" />
                    </button>
                  </div>
                </div>
                <Button
                  variant={"black"}
                  className="flex-1 min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40"
                  asChild
                >
                  <Link href={"/"}>
                    <Image
                      src={"/images/icon-cart.svg"}
                      alt={"icon-cart"}
                      width={15}
                      height={15}
                      className="w-[15px]"
                    />
                    Add to Cart
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-between gap-[15px]">
                <div className="flex-1">
                  <Text
                    as="div"
                    size="text3"
                    className="text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
                  >
                    {parse(
                      "<p>Enhance Your Productivity by Upgrading Your Workspace Comfort Today.</p>"
                    )}
                  </Text>
                </div>
                <Button variant={"link"} asChild>
                  <Link href={"/"}>Buy Now</Link>
                </Button>
                <Button variant={"link"} asChild>
                  <Link href={"/"}>Enquire Now</Link>
                </Button>
              </div>

              <hr />
              <div className="flex flex-wrap justify-between -mx-2.5 2xl:-mx-5 [&>*]:p-2.5 2xl:[&>*]:p-5">
                {[1, 2, 3].map((index) => (
                  <div key={"features" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-[#282828] flex gap-x-2"
                    >
                      <Image
                        src={"/images/features-1.svg"}
                        alt={"features-1"}
                        width={15}
                        height={15}
                        className="w-[15px]"
                      />

                      {parse("<p>Easy Customization</p>")}
                    </Text>
                  </div>
                ))}
              </div>

              <hr />

              <Button
                variant={"link"}
                className={
                  "text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] font-normal flex justify-between gap-1 not-disabled:hover:scale-100"
                }
                asChild
              >
                <Link href={"/"}>
                  Matching Products - You may also like
                  <Image
                    src={"/images/icon-right-arrow.svg"}
                    alt={"icon-right-arrow"}
                    width={15}
                    height={15}
                    className="w-[15px]"
                  />
                </Link>
              </Button>

              <hr />

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {quantity * 299.99 > 299.99 && (
                    <span className="font-medium text-gray-700">
                      Total: ${(quantity * 299.99).toFixed(2)}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1" className="py-2 sm:py-3">
                <AccordionTrigger className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 ">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="typography">
                    <h6>
                      Optron hash High-Back Task Chair | Latice Series| Product
                      Details
                    </h6>

                    <p>
                      Upgrade your workspace with the innovative OPTRON Hash
                      Frame Ergonomic Mesh Office Chair, designed to deliver
                      unmatched comfort and support for professionals in Dubai,
                      UAE. Featuring a sleek and futuristic design, this chair
                      combines style with cutting-edge ergonomic
                      functionality.The independent height-adjustable
                      backrest and sliding seat with depth adjustment ensure a
                      customized fit for your body, providing superior comfort
                      during long working hours. The dynamic variable lumbar
                      support adapts perfectly to the natural curve of your
                      back, promoting a healthy posture. Its breathable mesh
                      backrest enhances air circulation, keeping you cool and
                      focused throughout the day.
                    </p>
                    <ul>
                      <li>
                        <b>Adjustable Backrest:</b> Independent height
                        adjustment for tailored support.
                      </li>
                      <li>
                        <b>Seat Customization:</b> Sliding seat with depth
                        adjustment for personalized comfort.
                      </li>
                      <li>
                        <b>Lumbar Support:</b> Dynamic variable lumbar support
                        adapts to your spine’s natural curve.
                      </li>
                      <li>
                        <b>Breathable Mesh Backrest:</b> Enhances air
                        circulation to keep you cool during long work hours.
                      </li>
                      <li>
                        <b>Modern Aesthetic:</b> Sleek, futuristic design
                        perfect for contemporary office setups.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <hr />
              <AccordionItem value="item-1" className="py-2 sm:py-3">
                <AccordionTrigger className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 ">
                  Projects
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    gutterBreakpoints={{
                      350: "12px",
                      750: "16px",
                      900: "24px",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <Image
                        key="index"
                        src={`/images/product-detail-${index + 1}.jpg`}
                        alt={"product-detail"}
                        width={576}
                        height={376}
                      />
                    ))}
                    <Masonry></Masonry>
                  </ResponsiveMasonry>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
