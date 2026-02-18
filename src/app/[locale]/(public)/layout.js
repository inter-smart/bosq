import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getSiteData } from "@/lib/api/CMS/basicGet";
import { Toaster } from "sonner";

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
        id: "08",
        label: "Return & Refund Policy",
        label_ar: "سياسة الإرجاع والاسترداد",
        link: "/return-policy",
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
      // products
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
        label: "F&Q",
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

export default async function PublicLayout({ children, params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data } = await getSiteData();

  const { headerData, footerData, socialMedia, cards, navigationData } = data;

  return (
    <>
      <Header
        locale={locale}
        navigationData={navigationData}
        data={headerData}
      />

      <main>{children}</main>
      <Toaster position="top-right" richColors closeButton />
      <Footer
        locale={locale}
        footerData={local_data.footer_data}
        socialLinkData={socialMedia}
        data={footerData}
        paymentCards={cards}
      />
    </>
  );
}
