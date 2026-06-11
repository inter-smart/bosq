import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations, getLocale } from "next-intl/server";
import Footer from "@/components/layout/footer";
import { getSiteData } from "@/lib/api/CMS/basicGet";
import HeaderClient from "@/components/clients/HeaderClient";

const local_data = {
  footer_data: {
    shop_navigation: [
      {
        id: "06",
        label: "Privacy Policy",
        label_ar: "سياسة الخصوصية",
        link: "/privacy-policy",
      },
      {
        id: "08",
        label: "Return & Refund Policy",
        label_ar: "سياسة الإرجاع والاسترداد",
        link: "/return-policy",
      },
      {
        id: "04",
        label: "Warranty",
        label_ar: "الضمان",
        link: "/warranty-policy",
      },
      {
        id: "07",
        label: "Terms & Conditions",
        label_ar: "الشروط والأحكام",
        link: "/terms-and-conditions",
      },
      {
        id: "02",
        label: "Delivery",
        label_ar: "التوصيل",
        link: "/delivery-policy",
      },
    ],
    quick_link_navigation: [
      {
        id: "01",
        label: "Home",
        label_ar: "الرئيسية",
        link: "/",
      },
      {
        id: "02",
        label: "About",
        label_ar: "من نحن",
        link: "/about",
      },
      {
        id: "03",
        label: "Contact",
        label_ar: "اتصل بنا",
        link: "/contact",
      },
      {
        id: "04",
        label: "Projects",
        label_ar: "المشاريع",
        link: "/projects",
      },
      {
        id: "05",
        label: "News",
        label_ar: "الأخبار",
        link: "/news",
      },
      {
        id: "06",
        label: "Blog",
        label_ar: "المدونة",
        link: "/blogs",
      },
      {
        id: "07",
        label: "Products",
        label_ar: "المنتجات",
        link: "/products",
      },
    ],
    other_link_navigation: [
      {
        id: "01",
        label: "Ergonomic Chair Guide",
        label_ar: "دليل الكراسي المريحة",
        link: "/ergonomic-chair-guide",
      },
      {
        id: "03",
        label: "Material Guide",
        label_ar: "دليل المواد",
        link: "/material-guide",
      },
      {
        id: "05",
        label: "FAQs",
        label_ar: "الأسئلة الشائعة",
        link: "/faqs",
      },
      {
        id: "09",
        label: "Customization",
        label_ar: "التخصيص",
        link: "/customization",
      },
      {
        id: "10",
        label: "Sustainability",
        label_ar: "الاستدامة",
        link: "/sustainability",
      },
    ],
  },
};

export default async function NotFound({ params }) {
  const t = await getTranslations("page_not_found");

  const resolvedParams = await params;
  const locale = resolvedParams?.locale || (await getLocale()) || "en";

  const { data } = await getSiteData();
  const { headerData, footerData, socialMedia, cards, navigationData, landingPage } = data || {};

  return (
    <>
      <HeaderClient locale={locale} navigationData={navigationData} data={headerData} />
      <main className="w-full py-12 sm:py-20 xl:py-40 2xl:py-60 min-h-[60vh] flex items-center justify-center">
        <div className="container">
          <div className="w-full max-w-[320px] sm:max-w-[368px] xl:max-w-[400px] 2xl:max-w-[600px] mx-auto flex flex-col">
            <Heading
              as="h2"
              size="heading1"
              className="text-center text-black mb-2 xl:mb-3"
            >
              {t("title")}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
            <Text
              as="div"
              size="text1"
              className="text-center text-[#282828] mb-4 xl:mb-6"
            >
              {t("description")}
            </Text>
            <Button
              variant={"black"}
              disabled={false}
              className="min-w-[168px] xl:min-w-[190px] 2xl:min-w-[220px] mx-auto"
              asChild
            >
              <Link href={`/${locale}`}>{t("ctaText")}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer
        locale={locale}
        footerData={local_data.footer_data}
        socialLinkData={socialMedia}
        data={footerData}
        paymentCards={cards}
        landingPage={landingPage}
      />
    </>
  );
}
