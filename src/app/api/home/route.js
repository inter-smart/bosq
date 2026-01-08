import { NextResponse } from "next/server";

/**
 * GET /api/home
 */
export async function GET() {
  const homeData = {
    sliders: [
      {
        id: 1,
        title:
          "Designed for Comfort.<br/> Engineered for Your <br /> Workspace",
        title_ar: "wrwr",
        description:
          "<p>Shaping the future of work environments across the world </p>",
        description_ar: "rwwr",
        media_type: "image",
        media_alt: "ewrwer",
        media_alt_ar: "rwrw",
        media: {
          desktop: {
            path: "/images/home-hero-1.jpg",
          },
          mobile: {
            path: "/images/home-hero-1.jpg",
          },
        },
        button: {
          label: "View Product",
          label_ar: "werw",
          link: "/",
        },
      },
      {
        id: 2,
        title:
          "22 Designed for Comfort.<br/> Engineered for Your <br /> Workspace",
        title_ar: "wrwr",
        description:
          "<p>Shaping the future of work environments across the world </p>",
        description_ar: "rwwr",
        media_type: "image",
        media_alt: "ewrwer",
        media_alt_ar: "rwrw",
        media: {
          desktop: {
            path: "/images/home-hero-1.jpg",
          },
          mobile: {
            path: "/images/home-hero-1.jpg",
          },
        },
        button: {
          label: "View Product",
          label_ar: "werw",
          link: "/",
        },
      },
      {
        id: 3,
        title:
          "33 Designed for Comfort.<br/> Engineered for Your <br /> Workspace",
        title_ar: "wrwr",
        description:
          "<p>Shaping the future of work environments across the world </p>",
        description_ar: "rwwr",
        media_type: "image",
        media_alt: "ewrwer",
        media_alt_ar: "rwrw",
        media: {
          desktop: {
            path: "/images/home-hero-1.jpg",
          },
          mobile: {
            path: "/images/home-hero-1.jpg",
          },
        },
        button: {
          label: "View Product",
          label_ar: "werw",
          link: "/",
        },
      },
    ],

    aboutSection: {
      title: "Crafting Innovative Workspace Solutions Since 2012",
      title_ar: "معلومات عنا",
      description:
        "<p>BOSQ started in India in 2012, specializing in ergonomic seating for top corporations. Known for design, innovation, and quality, we’ve earned the trust of clients like BMW, Audi, and Siemens. Now a leading brand in the UAE, we're poised for expansion across the GCC.</p>",
      description_ar: "هذا وصف قسم معلومات عنا",
      media_type: "image",
      media_alt: "About Image",
      media_alt_ar: "صورة عن",
      media: {
        path: "/images/home-about-2.png",
        alt: "Modern office workspace",
        alt_ar: "مساحة عمل حديثة",
      },
    },

    formSection: {
      title: "Let's Get in Touch",
      title_ar: "نموذج الاتصال",
      description:
        "<p>Let's work together to find the most effective solution for your business.</p>",
      description_ar: "املأ النموذج",
      media_type: "image",
      media_alt: "Form alt",
      media_alt_ar: "نص بديل لصورة النموذج",
      media: {
        media_path: "/images/home-enquiry-1.jpg",
        alt: "Business meeting",
        alt_ar: "اجتماع عمل",
      },
    },

    journeySection: {
      title: "The journey: From Concept <br /> to Craft",
      title_ar: "رحلتنا",
      description:
        "<p>At BOSQ, every piece starts with a purpose-driven vision. From initial sketch to final polish, we blend creativity and craftsmanship, obsessing over every detail to ensure our furniture is not just made—but designed.</p>",
      description_ar: "وصف قسم الرحلة",
      media_type: "video",
      media: {
        desktop: {
          path: "/videos/home-journey-bg.mp4",
          alt: "Journey video",
          alt_ar: "فيديو الرحلة",
        },
        mobile: {
          path: "/videos/home-journey-bg.mp4",
          alt: "Journey video",
          alt_ar: "فيديو الرحلة",
        },
      },
    },

    featuredSection: {
      title: "Featured Products",
      title_ar: "المنتجات المميزة",
    },

    projectSection: {
      title: "Projects",
      title_ar: "مشاريعنا",
      list: [
        {
          id: 1,
          title: "Luxury Tower",
          title_ar: "برج سكني فاخر",
          media_alt: "Luxury building",
          media_alt_ar: "مبنى فاخر",
          media: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        },
        {
          id: 2,
          title: "Corporate Office",
          title_ar: "مكتب شركات",
          media_alt: "Corporate office",
          media_alt_ar: "مكتب شركات",
          media: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        },
      ],
    },

    fitsSection: {
      title: "Find Your Fit",
      title_ar: "قسم الملاءمة",
      description:
        "<p>as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem</p>",
      description_ar: "وصف قسم الملاءمة",
      button: {
        label: "View All projects",
        label_ar: "عرض جميع المشاريع",
        link: "/",
      },
      projects: [
        {
          id: 1,
          media: {
            path: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
            alt: "Modern office chair",
            alt_ar: "كرسي مكتب حديث",
          },
          title: "Ergonomic Seating",
          title_ar: "مقاعد مريحة",
          description: "Designed for comfort and productivity.",
          description_ar: "مصمم للراحة والإنتاجية.",
          button: {
            label: "View Details",
            label_ar: "عرض التفاصيل",
            link: "https://example.com",
          },
        },
      ],
    },

    brandsSection: {
      title: "Discover our Brands",
      title_ar: "علاماتنا التجارية",
    },
  };

  return NextResponse.json(
    {
      success: true,
      message: "Home data fetched successfully",
      data: homeData,
    },
    { status: 200 }
  );
}
