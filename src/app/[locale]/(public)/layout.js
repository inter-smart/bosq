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
          name: "Seating",
          slug: null,
          image:
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=450&h=300&fit=crop",
          items: [
            {
              id: 1,
              hasSubmenu: false,
              name: "Office Chairs",
              slug: "/products/office-chair-1",
              image:
                "https://images.unsplash.com/photo-1595428774223-f52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 2,
              hasSubmenu: false,
              name: "Executive Seating",
              slug: "/products/executive-seating",
              image:
                "https://images.unsplash.com/photo-1595428774223-52624120d2?w=450&h=300&fit=crop",
            },
          ],
        },
        {
          id: 2,
          hasSubmenu: true,
          name: "Desks & Workstations",
          slug: "/products/desks-and-workstations",
          image:
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=450&h=300&fit=crop",
          items: [
            {
              id: 1,
              hasSubmenu: false,
              name: "Workstation Clusters 2/4/6/8",
              slug: "/products/workstation-clusters",
              image:
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 2,
              hasSubmenu: false,
              name: "Height Adjustable Desks",
              slug: "/products/height-adjustable",
              image:
                "https://images.unsplash.com/photo-1595428744223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 3,
              hasSubmenu: false,
              name: "Executive Desks",
              slug: "/products/executive-desks",
              image:
                "https://images.unsplash.com/photo-1595428754223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 4,
              hasSubmenu: false,
              name: "L-Shape Workstations",
              slug: "/products/l-shape",
              image:
                "https://images.unsplash.com/photo-1595428764223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 5,
              hasSubmenu: false,
              name: "Benching Systems",
              slug: "/products/benching",
              image:
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 6,
              hasSubmenu: false,
              name: "Manager Cabins",
              slug: "/products/manager-cabins",
              image:
                "https://images.unsplash.com/photo-1595428784223-ef52624120d2?w=450&h=300&fit=crop",
            },
            {
              id: 7,
              hasSubmenu: false,
              name: "Standing Workstations",
              slug: "/products/standing",
              image:
                "https://images.unsplash.com/photo-1595428794223-ef52624120d2?w=450&h=300&fit=crop",
            },
          ],
        },
        {
          id: 3,
          hasSubmenu: false,
          name: "Storage Solutions",
          slug: "/products/storage-solutions",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=450&h=300&fit=crop",
        },
        {
          id: 4,
          hasSubmenu: false,
          name: "Sofas & Lounge",
          slug: "/products/sofas-and-lounge",
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=450&h=300&fit=crop",
        },
        {
          id: 5,
          hasSubmenu: false,
          name: "Partitions & Acoustic",
          slug: "/products/partitions-acoustic",
          image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=450&h=300&fit=crop",
        },
        {
          id: 6,
          hasSubmenu: false,
          name: "Accessories",
          slug: "/products/accessories",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=450&h=300&fit=crop",
        },
      ],
    },
    {
      id: 3,
      hasSubmenu: true,
      name: "Projects",
      slug: "/projects",
      items: [
        {
          id: 1,
          hasSubmenu: false,
          name: "Corporate Offices",
          slug: "/projects/corporate",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=450&h=300&fit=crop",
        },
        {
          id: 2,
          hasSubmenu: false,
          name: "Co-working Spaces",
          slug: "/projects/coworking",
          image:
            "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=450&h=300&fit=crop",
        },
        {
          id: 3,
          hasSubmenu: false,
          name: "Educational Institutions",
          slug: "/projects/education",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?w=450&h=300&fit=crop",
        },
      ],
    },
    {
      id: 4,
      hasSubmenu: true,
      name: "About Us",
      slug: "/about",
      items: [
        {
          id: 1,
          hasSubmenu: false,
          name: "11 About Us",
          slug: "/about",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=450&h=300&fit=crop",
        },
        {
          id: 2,
          hasSubmenu: false,
          name: "22 About Us",
          slug: "/about",
          image:
            "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=450&h=300&fit=crop",
        },
        {
          id: 3,
          hasSubmenu: false,
          name: "33 About Us",
          slug: "/about",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?w=450&h=300&fit=crop",
        },
      ],
    },
    {
      id: 5,
      hasSubmenu: false,
      name: "Contact Us",
      slug: "/contact",
    },
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
        locale={locale}
        headerData={local_data.header_data}
        navigationData={local_data.navigation_data}
      />

      <main>{children}</main>

      <Footer
        locale={locale}
        footerData={local_data.footer_data}
        socialLinkData={local_data.social_link_data}
      />
    </>
  );
}
