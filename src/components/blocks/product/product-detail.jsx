"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

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
                className="font-normal text-[#282828] mb-2 2xl:mb-3"
              >
                Choose Your Design
              </Heading>
              {[1, 2, 3].map((index) => (
                <div key={index} className="mb-2">
                  <div className="flex gap-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
