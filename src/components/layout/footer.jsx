"use client";

import Image from "@/components/utils/custom-image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading } from "../utils/heading";
import { Button } from "../ui/button";
import { Text } from "../utils/text";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { API_URL } from "@/lib/api/client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function Footer({
  footerData,
  socialLinkData,
  locale,
  data,
  paymentCards,
  landingPage,
}) {
  const isEn = locale === "en";

  const placeholders = [
    "Enter Your Email",
    "Enter Your Email Address",
    "Subscribe to our newsletter",
  ];

  const placeholders_ar = [
    "أدخل بريدك الإلكتروني",
    "أدخل عنوان بريدك الإلكتروني",
    "اشترك في نشرتنا الإخبارية",
  ];

  const t = useTranslations("footer");

  return (
    <footer className="w-full py-[20px_10px] xl:py-[40px_10px] 2xl:py-[60px_15px] bg-[#282828] overflow-hidden relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:p-[10px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[30px]">
          <div className="w-full lg:w-[28%]">
            <Link
              href={`/${locale}`}
              className="w-[90px] xl:w-[100px] 2xl:w-[140px] block mb-3 xl:mb-4 2xl:mb-6"
            >
              <Image
                src={data?.media?.path}
                alt={isEn ? data?.media?.alt : data?.media?.alt_ar}
                width={114}
                height={37}
                unoptimized
                className="w-full h-full block"
              />
            </Link>

            <Text
              as="div"
              size="text3"
              className="text-white mb-4 xl:mb-5 2xl:mb-7"
            >
              {parse(
                isEn
                  ? data?.address_block?.address
                  : data?.address_block?.address_ar,
              )}
            </Text>

            <div className="flex flex-wrap items-center gap-x-[15px] xl:gap-x-[20px]">
              {socialLinkData?.map((item, index) => (
                <div key={"social_link" + index}>
                  <Button variant="link" size="none" asChild>
                    <a href={item?.link || "#"} target="_blank">
                      <Image
                        src={item?.media?.path}
                        alt={isEn ? item?.media?.alt : item?.media?.alt_ar}
                        width={10}
                        height={10}
                        unoptimized
                        className="w-[15px] lg:w-[13px] xl:w-[15px] 2xl:w-[17px] aspect-square block hover:scale-110 transition"
                      />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "w-full",
              landingPage?.length > 0 ? "lg:w-[18%]" : "lg:w-[24%]",
            )}
          >
            <MediaQuery minWidth={1024}>
              <div>
                <Heading
                  as="h6"
                  size="none"
                  className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
                >
                  {t("shop")}
                </Heading>
                {footerData?.shop_navigation?.map((item, index) => (
                  <div key={"shop_navigation" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-white transition [&>a]:hover:text-[#f17423] mb-1 xl:mb-3"
                    >
                      <Link href={`/${locale}${item?.link}`}>
                        {isEn ? item?.label : item?.label_ar}
                      </Link>
                    </Text>
                  </div>
                ))}
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
              <AccordionItem title={t("shop")} section="shop">
                {footerData?.shop_navigation?.map((item, index) => (
                  <div key={"shop_navigation" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-white transition [&>a]:hover:text-[#f17423] mb-2"
                    >
                      <Link href={`/${locale}${item?.link}`}>
                        {isEn ? item?.label : item?.label_ar}
                      </Link>
                    </Text>
                  </div>
                ))}
              </AccordionItem>
            </MediaQuery>
          </div>

          <div
            className={cn(
              "w-full",
              landingPage?.length > 0 ? "lg:w-[18%]" : "lg:w-[24%]",
            )}
          >
            <MediaQuery minWidth={1024}>
              <div>
                <Heading
                  as="h6"
                  size="none"
                  className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
                >
                  {t("quickLinks")}
                </Heading>
                {footerData?.quick_link_navigation?.map((item, index) => (
                  <div key={"quick_link_navigation" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-white transition [&>a]:hover:text-[#f17423] mb-1 xl:mb-3"
                    >
                      <Link href={`/${locale}${item?.link}`}>
                        {isEn ? item?.label : item?.label_ar}
                      </Link>
                    </Text>
                  </div>
                ))}
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
              <AccordionItem title={t("quickLinks")} section="quick">
                {footerData?.quick_link_navigation?.map((item, index) => (
                  <div key={"quick_link_navigation" + index}>
                    <Text
                      as="div"
                      size="text3"
                      className="text-white transition [&>a]:hover:text-[#f17423] mb-2"
                    >
                      <Link href={`/${locale}${item?.link}`}>
                        {isEn ? item?.label : item?.label_ar}
                      </Link>
                    </Text>
                  </div>
                ))}
              </AccordionItem>
            </MediaQuery>
          </div>

          <div
            className={cn(
              "w-full",
              landingPage?.length > 0 ? "lg:w-[18%]" : "lg:w-[24%]",
            )}
          >
            <MediaQuery minWidth={1024}>
              <div>
                <Heading
                  as="h6"
                  size="none"
                  className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
                >
                  {t("other_links")}
                </Heading>
                <div className="flex flex-wrap">
                  {footerData?.other_link_navigation?.map((item, index) => (
                    <div
                      key={"other_link_navigation" + index}
                      className="w-full"
                    >
                      <Text
                        as="div"
                        size="text3"
                        className="text-white transition [&>a]:hover:text-[#f17423] mb-1 xl:mb-3"
                      >
                        <Link href={`/${locale}${item?.link}`}>
                          {isEn ? item?.label : item?.label_ar}
                        </Link>
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
              <AccordionItem title={t("other_links")} section="other">
                <div className="flex flex-wrap">
                  {footerData?.other_link_navigation?.map((item, index) => (
                    <div
                      key={"other_link_navigation" + index}
                      className="w-full"
                    >
                      <Text
                        as="div"
                        size="text3"
                        className="text-white transition [&>a]:hover:text-[#f17423] mb-2"
                      >
                        <Link href={`/${locale}${item?.link}`}>
                          {isEn ? item?.label : item?.label_ar}
                        </Link>
                      </Text>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </MediaQuery>
          </div>

          {landingPage?.length > 0 && (
            <div className="w-full lg:w-[18%]">
              <MediaQuery minWidth={1024}>
                <div>
                  <Heading
                    as="h6"
                    size="none"
                    className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
                  >
                    {t("LandingPages")}
                  </Heading>
                  <div className="flex flex-wrap">
                    {landingPage?.map((item, index) => (
                      <div key={"landing" + index} className="w-full">
                        <Text
                          as="div"
                          size="text3"
                          className="text-white transition [&>a]:hover:text-[#f17423] mb-1 xl:mb-3"
                        >
                          <Link href={`/${locale}/office-chairs/${item?.slug}`}>
                            {isEn ? item?.title : item?.title_ar}
                          </Link>
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={1023}>
                <AccordionItem title={t("LandingPages")} section="landing">
                  <div className="flex flex-wrap">
                    {landingPage?.map((item, index) => (
                      <div key={"landing" + index} className="w-full">
                        <Text
                          as="div"
                          size="text3"
                          className="text-white transition [&>a]:hover:text-[#f17423] mb-2"
                        >
                          <Link href={`/${locale}/office-chairs/${item?.slug}`}>
                            {isEn ? item?.title : item?.title_ar}
                          </Link>
                        </Text>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              </MediaQuery>
            </div>
          )}
        </div>

        <hr className="border-[#333] my-1 xl:my-2 2xl:my-4" />

        <div className="flex flex-wrap items-center -mx-[10px] [&>*]:p-[10px] ">
          <div className="w-full lg:w-[36%]">
            {data?.sale_enquiry && (
              <Text
                as="div"
                size="text3"
                className="text-white [&_span]:text-normal mb-1 [&_a]:hover:text-[#f47123]"
              >
                <span>
                  {isEn
                    ? data?.sale_enquiry.title
                    : data?.sale_enquiry.title_ar}{" "}
                  :
                </span>
                &nbsp;
                {data?.sale_enquiry.phone && (
                  <>
                    {t("ph")}:{" "}
                    <a
                      href={`tel:${data?.sale_enquiry.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.sale_enquiry.phone}
                    </a>
                    &nbsp;
                  </>
                )}
                {data?.sale_enquiry.email && (
                  <>
                    {t("email")}:{" "}
                    <a
                      href={`mailto:${data?.sale_enquiry.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.sale_enquiry.email}
                    </a>
                  </>
                )}
              </Text>
            )}

            {data?.support_enquiry && (
              <Text
                as="div"
                size="text3"
                className="text-white [&_span]:text-normal [&_a]:hover:text-[#f47123]"
              >
                <span>
                  {isEn
                    ? data?.support_enquiry.title
                    : data?.support_enquiry.title_ar}{" "}
                  :
                </span>
                &nbsp;
                {/* {data?.support_enquiry.phone && (
                  <>
                    Ph:{" "}
                    <a
                      href={`tel:${data?.support_enquiry.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.support_enquiry.phone}
                    </a>
                    &nbsp;
                  </>
                )} */}
                {data?.support_enquiry.email && (
                  <>
                    {t("email")}:{" "}
                    <a
                      href={`mailto:${data?.support_enquiry.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.support_enquiry.email}
                    </a>
                  </>
                )}
              </Text>
            )}
          </div>

          <div className="w-full lg:w-[44%]">
            <div className="flex flex-wrap">
              <Text
                as="div"
                size="text3"
                className="text-white w-full sm:w-[40%] pr-[15px] xl:pr-[30px] max-sm:mb-4"
              >
                {parse(
                  isEn ? data?.newsletter?.title : data?.newsletter?.title_ar,
                )}
              </Text>
              <div className="w-full sm:w-[60%]">
                <NewsletterForm
                  placeholders={placeholders}
                  placeholders_ar={placeholders_ar}
                  locale={locale}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[20%]">
            <div className="flex flex-wrap justify-end gap-0.5 xl:gap-1">
              {paymentCards?.map((item, index) => (
                <div
                  key={"card" + index}
                  className="bg-red-500"
                  // className={cn(locale === "ar" ? "mr-auto" : "ml-auto")}
                >
                  <Image
                    src={item?.media?.path}
                    alt={isEn ? item?.media?.alt : item?.media?.alt_ar}
                    width={120}
                    height={16}
                    className="w-[160px] lg:w-[100px] xl:w-[120px] 2xl:w-[150px] block"
                    quality={90}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-[#333] my-1 xl:my-2 2xl:my-4" />

        <div className="flex flex-wrap justify-center sm:justify-between -mx-[5px] lg:-mx-[10px] [&>*]:p-[5px] lg:[&>*]:p-[10px]">
          <Text as="div" size="text3" className="text-white">
            {t("copyright")}
          </Text>
          <Text
            as="div"
            size="text3"
            className="whitespace-nowrap text-end text-white flex"
          >
            {t("designedBy")}{" "}
            <a href="https://www.intersmartsolution.com/" target="_blank">
              <Image
                src="/images/icon-intersmart.svg"
                alt="Intersmart"
                width={100}
                height={15}
                unoptimized
                className="w-[50px] xl:w-[70px] 3xl:w-[90px] inline ml-1"
              />
            </a>
          </Text>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm({ placeholders, placeholders_ar, locale }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEn = locale === "en";
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    const emailInput = e.target.querySelector('input[type="text"]');
    const email = emailInput?.value?.trim();

    if (!email) {
      toast.error(
        isEn
          ? "Please enter your email address"
          : "الرجاء إدخال بريدك الإلكتروني",
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(
        isEn
          ? "Please enter a valid email address"
          : "الرجاء إدخال بريد إلكتروني صالح",
      );
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha("newsletter_subscription");

      const res = await fetch(`${API_URL}/api/frontend/enquiries/news-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptcha_token: recaptchaToken }),
      });
      const data = await res.json();
      if (!data?.success) {
        toast.error(isEn ? data?.message?.en : data?.message?.ar);
        return;
      }
      toast.success(isEn ? data?.message?.en : data?.message?.ar);
    } catch (err) {
      console.error(err);
      toast.error(
        isEn
          ? "Something went wrong. Please try again."
          : "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      placeholders_ar={placeholders_ar}
      locale={locale}
      onSubmit={handleSubmit}
    />
  );
}

// Accordion Item Component
function AccordionItem({ title, children, section }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const isOpen = openAccordion === section;

  return (
    <div className="border-t border-[#333]">
      <button
        onClick={() => toggleAccordion(section)}
        className="w-full flex items-center justify-between pt-4 text-start"
      >
        <Heading
          as="h6"
          size="none"
          className="text-[14px] leading-none font-normal text-white"
        >
          {title}
        </Heading>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] mt-5" : "max-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
