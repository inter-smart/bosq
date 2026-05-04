"use client";
import React, { useState, useEffect, useCallback } from "react";
import Fade from "embla-carousel-fade";
import { cn, getLocalizedContent } from "@/lib/utils";
import Image from "@/components/utils/custom-image";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { buyNow } from "@/store/slices/cartSlice";
import { toast } from "sonner";
import { useToggleWishlistMutation } from "@/store/services/wishListApi";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import ProductEnquireModal from "./ProductEnquireModal";
import ProductShareModal from "./ProductShareModal";
import ProductDetails from "./ProductDetails";
import ProductChooseDesign from "./ProductChooseDesign";
import PriceAndCart from "./PriceAndCart";
import { useTranslations } from "next-intl";
import { setIsCheckoutAllowed } from "@/store/slices/checkoutSlice";
import FrequentBroughtTogether from "./FrequentBroughtTogether";
import NoProductFound from "./ProductNotFound";
import { useAppSelector } from "@/store/hooks";

export default function ProductDetailCopy({ locale, initialData, productData, boughtTogetherItems, productSlug }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations();
  const tToast = useTranslations("toast");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const isEn = locale === "en";

  const title = getLocalizedContent(isEn, initialData?.title, initialData?.title_ar);
  const enhanced = getLocalizedContent(isEn, initialData?.enhance, initialData?.enhance_ar);
  const description = getLocalizedContent(isEn, initialData?.description, initialData?.description_ar);
  const design_title = getLocalizedContent(isEn, initialData?.design_title, initialData?.design_title_ar);

  const enq = {
    title: t("product.enquire_now"),
    subtitle: t("product.enquire_subtitle"),
    description: t("product.enquire_description"),
  };

  const productImages =
    initialData?.images?.length > 0
      ? initialData.images
      : Array(5).fill({ media_type: "image", media_path: "/images/placeholder.png", alt: "placeholder" });
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

  const [openProduct, setOpenProduct] = useState(false);

  const [indexProduct, setIndexProduct] = useState(0);

  const [isChooseDesignOpen, setIsChooseDesignOpen] = useState(false);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [wishlist, setWishlist] = useState(initialData?.isWishlisted ?? false);
  const [toggleWishlist, { isLoading: isWishlistLoading }] = useToggleWishlistMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Sync wishlist state when variant changes (filter/design selection)
  useEffect(() => {
    setWishlist(initialData?.isWishlisted ?? false);
  }, [initialData?.id, initialData?.isWishlisted]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login?activity=wishlist`);
      return;
    }
    setWishlist((prev) => !prev);
    try {
      await toggleWishlist(initialData?.id).unwrap();
      toast.success(wishlist ? `${tToast("wishlist_removed")}` : `${tToast("wishlist_success")}`);
    } catch {
      setWishlist((prev) => !prev);
      toast.error(`${tToast("wishlist_remove_failed")}`);
    }
  };

  const handleBuyNow = async () => {
    // Note: Since quantity is managed inside PriceAndCart,
    // and this button is outside, we default to 1 or we'd need to lift state.
    // For now, implementing with quantity 1 as requested.
    const { product_id, id: variant_id } = initialData;

    try {
      await dispatch(
        buyNow({
          product_id,
          variant_id,
          quantity,
          isAuthenticated,
        }),
      ).unwrap();
      dispatch(setIsCheckoutAllowed(true));

      const encoded = btoa("allowed");

      router.push(`/${locale}/checkout?flow=${encoded}&type=buynow`);
    } catch (error) {
      toast.error(isEn ? error?.en : error?.ar || "Failed to buy item");
    }
  };

  return (
    <section className="w-full block py-[10px_30px] xl:py-[0_60px] 2xl:py-[5px_100px]">
      <div className="container">
        {!initialData ? (
          <NoProductFound params={{ locale }} />
        ) : (
          <>
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
                              <Image
                                src={item?.media_type === "image" ? item?.media_path : item?.thumbnail_path || "/images/placeholder.png"}
                                alt={item?.alt || "thumb"}
                                width={512}
                                height={512}
                                className="w-full h-full object-cover"
                                quality={90}
                              />
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
                    <>
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
                              <div
                                className={cn(
                                  "w-full h-full rounded-[4px] overflow-hidden border transition duration-300 bg-white select-none relative",
                                )}
                              >
                                {initialData?.stock == 0 && (
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
                                {item?.media_type === "video" ? (
                                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                    <source src={item?.media_path} type="video/mp4" />
                                  </video>
                                ) : (
                                  <Image
                                    src={item?.media_path}
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
                            slides={productImages?.map((item) =>
                              item.media_type === "video"
                                ? {
                                    type: "video",
                                    width: 1280,
                                    height: 720,
                                    poster: item.media_path,
                                    autoPlay: true,
                                    sources: [
                                      {
                                        src: item.media_path,
                                        type: "video/mp4",
                                      },
                                    ],
                                  }
                                : {
                                    src: item.media_path,
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
                      <ProductShareModal open={isShareOpen} onClose={() => setIsShareOpen(false)} locale={locale} />

                      <div
                        className={cn(
                          "flex gap-3 2xl:gap-4 absolute z-2 top-2 xl:top-4",
                          locale === "ar" ? "left-2 xl:left-4 2xl:left-5" : "right-2 xl:right-4 2xl:right-5",
                        )}
                      >
                        <button
                          onClick={handleWishlistToggle}
                          disabled={isWishlistLoading}
                          className="w-3 2xl:w-4.5 hover:cursor-pointer transition hover:scale-105 disabled:opacity-60 disabled:scale-100"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full block"
                          >
                            <path
                              d="M7.39062 2.03027C8.85818 0.419111 10.5094 0.0894194 11.749 0.544922C12.9908 1.00129 13.9263 2.28275 13.8955 4.12402C13.8676 5.78912 12.7686 7.51198 11.3096 9.04004C9.9379 10.4766 8.3011 11.6826 7.12598 12.4326C5.95106 11.6827 4.3155 10.4769 2.94434 9.04102C1.48523 7.51297 0.385558 5.78917 0.357422 4.12402C0.326449 2.28301 1.26218 1.00146 2.50391 0.544922C3.74349 0.0891915 5.39453 0.418918 6.8623 2.03027L7.12695 2.32031L7.39062 2.03027Z"
                              fill={wishlist ? "black" : "none"}
                              stroke="#282828"
                              strokeWidth="1"
                            />
                          </svg>
                        </button>
                        <button onClick={() => setIsShareOpen(true)} className="w-2.5 2xl:w-3.5 hover:cursor-pointer transition hover:scale-105">
                          <Image src="/images/icon-share.svg" alt="icon-share" width={12} height={12} className="w-full h-full block" quality={90} />
                        </button>
                      </div>
                    </>

                    {}
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
                    {initialData?.categories?.map((cat) => (isEn ? cat.name : cat.name_ar)).join(", ")}
                  </Heading>
                  {title && (
                    <Heading as="div" size="heading2" className="font-normal text-[#282828] mb-1 2xl:mb-2 max-sm:font-bold">
                      {title}
                    </Heading>
                  )}

                  {description && (
                    <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
                      {parse(description)}
                    </Text>
                  )}

                  <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

                  <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4">
                    {t("product.choose_your_design")}
                  </Heading>

                  <div className="mb-2">
                    <div className="w-full max-w-[468px] bg-[#f2f2f2] border border-[#dedede] flex items-center p-1 rounded-[4px]">
                      <div className="w-[40px] xl:w-[45px] 2xl:w-[55px] aspect-square rounded-[4px] overflow-hidden bg-white">
                        <Image
                          src={initialData?.model_media || "/images/placeholder.png"}
                          alt={initialData?.alt || "design"}
                          width={1080}
                          height={1080}
                          className="w-full h-full object-contain"
                          quality={90}
                        />
                      </div>
                      <div className="flex-1 flex justify-between gap-2 p-2 xl:p-2.5 2xl:p-[15px] ">
                        <div className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#282828]">
                          {isEn ? initialData?.model_title : initialData?.model_title_ar}
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
                            {t("product.more_colors")}
                          </Button>
                        </ProductChooseDesign>
                      </div>
                    </div>
                  </div>

                  {design_title && (
                    <Heading
                      as="div"
                      size="none"
                      className="text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#808080] mb-2 xl:mb-3 2xl:mb-5"
                    >
                      {design_title}
                    </Heading>
                  )}

                  <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />
                  <Heading
                    as="div"
                    size="none"
                    className="text-[12px] xl:text-[14px] 2xl:text-[18px] 3xl:text-[22px] leading-tight font-normal text-[#282828] [&_span]:text-[70%] [&_span]:font-light [&_span]:text-[#bbbcbc] mb-2 xl:mb-3 2xl:mb-5"
                  >
                    {t("common.aed")} {initialData?.price} <span>{t("common.inc_tax")}</span>
                  </Heading>
                  {initialData?.stock > 0 && (
                    <PriceAndCart
                      stock={initialData?.stock}
                      price={initialData?.price}
                      item={initialData}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      locale={locale}
                    />
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 2xl:gap-6 mb-2 xl:mb-3 2xl:mb-5 max-lg:flex-wrap-reverse">
                    {enhanced && (
                      <div className="flex lg:flex-1">
                        <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
                          {enhanced}
                        </Text>
                      </div>
                    )}
                    <Button variant={"link"} className={"font-normal underline h-auto "} disabled={initialData?.stock == 0} onClick={handleBuyNow}>
                      {t("product.buy_now")}
                    </Button>
                    <ProductEnquireModal data={enq} productId={initialData?.id} locale={locale}>
                      <Button variant={"link"} className={"font-normal underline h-auto"}>
                        {t("product.enquire_now")}
                      </Button>
                    </ProductEnquireModal>
                  </div>

                  <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

                  <div className="flex flex-wrap gap-1 sm:gap-2.5 2xl:gap-5">
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

                          {item?.name && parse(isEn ? item?.name : item?.name_ar)}
                        </Text>
                      </div>
                    ))}
                  </div>

                  {boughtTogetherItems && (
                    <>
                      <hr className="my-3 sm:my-3 2xl:my-5 mx-[-5px]" />

                      <Heading as="div" size="heading5" className="font-normal text-[#282828] mb-3 2xl:mb-4 mt-2.5 2xl:mt-4">
                        Frequently Bought Together
                      </Heading>
                      <FrequentBroughtTogether data={boughtTogetherItems} frequentlyEmblaRef={frequentlyEmblaRef} locale={locale} />

                      <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <ProductDetails
              data={initialData}
              isEn={isEn}
              setIndexProject={setIndexProduct}
              setOpenProject={setOpenProduct}
              openProject={openProduct}
              indexProject={indexProduct}
            />
          </>
        )}
      </div>
    </section>
  );
}
