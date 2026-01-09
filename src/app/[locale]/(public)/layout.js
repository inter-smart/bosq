import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const local_data = {
  header_data: {
    id: "uuid PRIMARY KEY",
    name: "Bosq Ergonomics",
    slug: "/",
    logoUrl: "/images/brand-logo-primary.svg",
    logoWhiteUrl: "/images/brand-logo.svg",
    description: "text",
    websiteUrl: "https://bosq.ae/",
    countryOfOrigin: "char(2) (ISO country code)",
    establishedYear: "2025",
    specialties: "text[] (e.g., ['ergonomic chairs', 'office desks'])",
    isFeatured: false,
    sortOrder: 0,
    isActive: true,
    seoTitle: "Bosq Ergonomics",
    seoDescription: "text",
    createdAt: "timestamp",
    updatedAt: "timestamp",
  },
  navigation_data: [
    {
      id: 1,
      hasSubmenu: false,
      name: "Home",
      slug: "/",
    },
    {
      id: 2,
      hasSubmenu: true,
      name: "Products",
      slug: "/products",
      items: [
        {
          id: 1,
          hasSubmenu: true,
          name: ">sub Seating",
          slug: "/products/seating",
          items: [
            {
              id: 1,
              hasSubmenu: false,
              name: ">sub>sub Office Chairs",
              slug: "/products/office-chair-1",
            },
            {
              id: 2,
              hasSubmenu: false,
              name: ">sub>sub Workstations",
              slug: "/products/workstations",
            },
          ],
        },
        {
          id: 2,
          hasSubmenu: false,
          name: "Desks & Workstations",
          slug: "/products/desks-and-Workstations",
        },
        {
          id: 3,
          hasSubmenu: false,
          name: "Storage Solutions ",
          slug: "/products/storage-solutions",
        },
        {
          id: 4,
          hasSubmenu: false,
          name: "Shop All",
          slug: "/products/sofas-and-lounge",
        },
        {
          id: 5,
          hasSubmenu: false,
          name: "Shop All",
          slug: "/products/sofas-and-lounge",
        },
      ],
    },
    {
      id: 3,
      hasSubmenu: true,
      name: "Projects",
      slug: "/products/office-chair-1",
      items: [
        {
          id: 1,
          hasSubmenu: false,
          name: "11 Seating",
          slug: "/products/seating",
        },
        {
          id: 2,
          hasSubmenu: false,
          name: "11 Desks & Workstations",
          slug: "/products/desks-and-Workstations",
        },
        {
          id: 3,
          hasSubmenu: false,
          name: "11 Storage Solutions ",
          slug: "/products/storage-solutions",
        },
        {
          id: 4,
          hasSubmenu: false,
          name: "11 Shop All",
          slug: "/products/sofas-and-lounge",
        },
        {
          id: 5,
          hasSubmenu: false,
          name: "11 Shop All",
          slug: "/products/sofas-and-lounge",
        },
      ],
    },
    {
      id: 4,
      hasSubmenu: false,
      name: "About Us",
      slug: "/about",
    },
    {
      id: 5,
      hasSubmenu: false,
      name: "Contact Us",
      slug: "/contact",
    },
    // {
    //   id: "06",
    //   name: "Contact",
    //   slug: "/contact",
    // },
  ],
  footer_data: {
    id: "uuid PRIMARY KEY",
    name: "Bosq Ergonomics",
    slug: "/",
    logoUrl: "/images/brand-logo-primary.svg",
    logoWhiteUrl: "/images/brand-logo.svg",
    address:
      "<p>AYN MUSK FOR FURNITURE CO.L.L.C<br /> Office No 133, KML Business Tower,Meydan Road,<br /> Al Qouz, Dubai P.O Box: 294568</p>",
    websiteUrl: "https://bosq.ae/",
    shop_navigation: [
      {
        id: "01",
        label: "Office Chairs",
        link: "/products/office-chair-1",
      },
      {
        id: "02",
        label: "Workstations",
        link: "/products",
      },
      {
        id: "03",
        label: "Storage",
        link: "/products",
      },
      {
        id: "04",
        label: "Shop All",
        link: "/products",
      },
    ],
    quick_link_navigation: [
      {
        id: "01",
        label: "Home",
        link: "/",
      },
      {
        id: "02",
        label: "About",
        link: "/about",
      },
      {
        id: "03",
        label: "Contact",
        link: "/contact",
      },
      {
        id: "04",
        label: "Projects",
        link: "/projects",
      },
    ],
    other_link_navigation: [
      {
        id: "01",
        label: "Ergonomic Chair Guide",
        link: "/products/office-chair-1",
      },
      {
        id: "02",
        label: "Delivery",
        link: "/delivery-policy",
      },
      {
        id: "03",
        label: "Material Guide",
        link: "/",
      },
      {
        id: "04",
        label: "Warranty",
        link: "/warranty-policy",
      },
      {
        id: "05",
        label: "F&Q",
        link: "/faqs",
      },
      {
        id: "06",
        label: "Privacy Policy",
        link: "/privacy-policy",
      },
      {
        id: "07",
        label: "Terms & Conditions",
        link: "/terms-and-conditions",
      },
      {
        id: "08",
        label: "Return & Refund Policy",
        link: "/return-policy",
      },
    ],
    sale_enquiry: {
      title: "For Sale Enquiry",
      phone: "+971 56 503 6378",
      email: "sales@bosq.ae",
    },
    support_enquiry: {
      title: "For Support Enquiry",
      phone: "",
      email: "support@bosq.ae",
    },
    copyright: "<p>© 2025 Bosq Ergonomics. All Rights Reserved.</p>",
    subscription_title: "<p>Stay Updated. Subscribe to Our Newsletter</p>",
    card: [
      {
        id: "01",
        name: "card",
        link: "https://www.bosq.ae/",
        media: {
          media_type: "image",
          media_path: "/images/footer-card.png",
          media_alt: "footer-card",
        },
      },
    ],
  },
  social_link_data: [
    {
      id: "01",
      name: "facebook",
      link: "https://www.facebook.com/",
      media: {
        media_type: "image",
        media_path: "/images/social-fb.svg",
        media_alt: "social-fb",
      },
    },
    {
      id: "02",
      name: "instagram",
      link: "https://www.instagram.com/",
      media: {
        media_type: "image",
        media_path: "/images/social-insta.svg",
        media_alt: "social-insta",
      },
    },
    {
      id: "03",
      name: "youtube",
      link: "https://www.youtube.com/",
      media: {
        media_type: "image",
        media_path: "/images/social-youtube.svg",
        media_alt: "social-youtube",
      },
    },
    {
      id: "04",
      name: "linkedin",
      link: "https://www.linkedin.com/",
    media: {
        media_type: "image",
        media_path: "/images/social-linkedin.svg",
        media_alt: "social-linkedin",
      },
    },
  ],
};

export default async function PublicLayout({ children, params }) {

  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <>
      <Header
        headerData={local_data.header_data}
        navigationData={local_data.navigation_data}
        locale={locale}
      />

      <main>{children}</main>

      <Footer
        footerData={local_data.footer_data}
        socialLinkData={local_data.social_link_data}
        locale={locale}
      />
    </>
  );
}
