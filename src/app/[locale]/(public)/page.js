import dynamic from "next/dynamic";
import HomeHero from "@/components/blocks/home/home-hero"; // keep SSR for SEO

import { getHomeData } from "@/lib/api/home";
import { notFound } from "next/navigation";
import { GET as getHome } from "../../api/home/route";

const HomeAbout = dynamic(() => import("@/components/blocks/home/home-about"));
const HomeFeatured = dynamic(() =>
  import("@/components/blocks/home/home-featured")
);
const HomeJourney = dynamic(() =>
  import("@/components/blocks/home/home-journey")
);
const HomeProject = dynamic(() =>
  import("@/components/blocks/home/home-project")
);
const HomeCalculator = dynamic(() =>
  import("@/components/blocks/home/home-calculator")
);
const HomeFind = dynamic(() => import("@/components/blocks/home/home-find"));
const HomeBrand = dynamic(() => import("@/components/blocks/home/home-brand"));
const HomeEnquiry = dynamic(() =>
  import("@/components/blocks/home/home-enquiry")
);

const local_data = {
  homeData: [
    {
      id: 1,
      isActive: true,
      media: {
        type: "image",
        mobile: {
          path: "/images/home-hero-1.jpg",
          media_alt: "hero",
        },
        desktop: {
          path: "/images/home-hero-1.jpg",
          media_alt: "hero",
        },
      },
      title: "Designed for Comfort.<br/> Engineered for Your <br /> Workspace",
      description:
        "<p>Shaping the future of work environments across the world </p>",
      ctaText: "View Product",
      button: {
        type: "link",
        label: "View Product",
        link: "/",
      },
    },
    {
      id: 2,
      isActive: true,
      media: {
        type: "image",
        mobile: {
          path: "/images/home-hero-1.jpg",
          alt: "hero",
        },
        desktop: {
          path: "/images/home-hero-1.jpg",
          alt: "hero",
        },
      },
      title: "22 Designed for Comfort.<br/> Engineered for Your<br/> Workspace",
      description:
        "<p>Shaping the future of work environments across the world</p>",
      button: {
        type: "link",
        label: "View Product",
        link: "/",
      },
    },
    {
      id: 3,
      isActive: true,
      media: {
        type: "image",
        mobile: {
          path: "/images/home-hero-1.jpg",
          alt: "hero",
        },
        desktop: {
          path: "/images/home-hero-1.jpg",
          alt: "hero",
        },
      },
      title: "33 Designed for Comfort.<br/> Engineered for Your<br/> Workspace",
      description:
        "<p>Shaping the future of work environments across the world</p>",
      button: {
        type: "link",
        label: "View Product",
        link: "/",
      },
    },
  ],
  aboutData: {
    media: {
      type: "image",
      path: "/images/home-about-2.png",
      alt: "home-about-1",
    },
    title: "Crafting Innovative Workspace Solutions Since 2012",
    description:
      "<p>BOSQ started in India in 2012, specializing in ergonomic seating for top corporations. Known for design, innovation, and quality, we’ve earned the trust of clients like BMW, Audi, and Siemens. Now a leading brand in the UAE, we're poised for expansion across the GCC.</p>",
    button: {
      type: "link",
      label: "Read More ",
      link: "/",
    },
  },
  featuredData: {
    title: "Featured Products",
    description: null,
    button: null,
    product: [
      {
        id: 1,
        media: {
          type: "image",
          path: "/images/pro-1.jpg",
          alt: "pro-1",
        },
        name: "Continue Table",
        slug: "continue-table",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/pro-2.jpg",
          alt: "pro-1",
        },
        name: "Okidoki Too Stool",
        slug: "okidoki-too-stool",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 3,
        media: {
          type: "image",
          path: "/images/pro-3.jpg",
          alt: "pro-1",
        },
        name: "360 Chair",
        slug: "360-chair",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 4,
        media: {
          type: "image",
          path: "/images/pro-4.jpg",
          alt: "pro-1",
        },
        name: "ergonomic chair",
        slug: "ergonomic-chair",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 5,
        media: {
          type: "image",
          path: "/images/pro-4.jpg",
          alt: "pro-1",
        },
        name: "ergonomic chair",
        slug: "ergonomic-chair",
      },
      {
        id: 6,
        media: {
          type: "image",
          path: "/images/pro-4.jpg",
          alt: "pro-1",
        },
        name: "ergonomic chair",
        slug: "ergonomic-chair",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
    ],
  },
  journeyData: {
    media: {
      type: "video",
      mobile: {
        path: "/videos/home-journey-bg.mp4",
        alt: "journey",
      },
      desktop: {
        path: "/videos/home-journey-bg.mp4",
        alt: "journey",
      },
    },
    title: "The journey: From Concept <br /> to Craft",
    description:
      "<p>At BOSQ, every piece starts with a purpose-driven vision. From initial sketch to final polish, we blend creativity and craftsmanship, obsessing over every detail to ensure our furniture is not just made—but designed.</p>",
    button: {
      type: "link",
      label: "View Details",
      link: "/",
    },
  },
  projectData: {
    title: "Projects",
    description: null,
    button: null,
    project: [
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/home-project-1.jpg",
          alt: "home-project-1",
        },
        title: "Office space",
        description: null,
        slug: "office-space",
        button: {
          type: "link",
          label: "View Product",
          link: "/",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/home-project-2.jpg",
          alt: "home-project-2",
        },
        title: "Office space",
        description: null,
        slug: "office-space",
        button: {
          type: "link",
          label: "View Product",
          link: "/",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/home-project-3.jpg",
          alt: "home-project-2",
        },
        title: "Office space",
        description: null,
        slug: "office-space",
        button: {
          type: "link",
          label: "View Product",
          link: "/",
        },
      },
      {
        id: "04",
        media: {
          type: "image",
          path: "/images/home-project-1.jpg",
          alt: "home-project-2",
        },
        title: "Office space",
        description: null,
        slug: "office-space",
        button: {
          type: "link",
          label: "View Product",
          link: "/",
        },
      },
      {
        id: "05",
        media: {
          type: "image",
          path: "/images/home-project-2.jpg",
          alt: "home-project-5",
        },
        title: "Office space",
        description: null,
        slug: "office-space",
        button: {
          type: "link",
          label: "View Product",
          link: "/",
        },
      },
    ],
  },
  calculatorData: {
    media: {
      media_type: "image",
      media_path: "/images/home-calculator-1.png",
      media_alt: "home-calculator-1",
    },
    title: "Smart Space Calculator",
    description:
      "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations. Fueled by a deep understanding of design trends and a spirit of innovation, we’ve established ourselves as a provider of top-quality office furniture and workspace solutions.</p>",
    button: {
      type: "link",
      label: "Calculate Now",
      link: "/",
    },
  },
  customizeData: {
    media: {
      media_type: "image",
      media_path: "/images/home-calculator-2.png",
      media_alt: "home-calculator-1",
    },
    title: "Customize Your space",
    description:
      "<p>At BOSQ, customization isn’t limited by quantity. Whether it’s one piece or an entire collection, every product is crafted to reflect your unique style.</p>",
    button: {
      type: "link",
      label: "Customize",
      link: "/",
    },
  },
  findData: {
    title: "Find Your Fit",
    description:
      "<p>as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem</p>",
    button: {
      type: "link",
      label: "View all projects",
      link: "/",
    },
    project: [
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/home-find-1.jpg",
          alt: "home-find-1",
        },
        title: "Meeting Room",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/home-find-2.jpg",
          alt: "home-find-2",
        },
        title: "Office Space",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/home-find-3.jpg",
          alt: "home-find-1",
        },
        title: "Work from Home",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/home-find-1.jpg",
          alt: "home-find-1",
        },
        title: "Meeting Room",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/home-find-2.jpg",
          alt: "home-find-2",
        },
        title: "Office Space",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/home-find-3.jpg",
          alt: "home-find-1",
        },
        title: "Work from Home",
        description:
          "<p>The BOSQ UAE you see today has deep roots in India, where we began our journey in 2012 crafting ergonomic seating solutions for leading corporations</p>",
        slug: "meeting-room",
        button: {
          type: "link",
          label: "View Details",
          link: "/",
        },
      },
    ],
  },
  brandData: {
    title: "Discover our Brands",
    description: null,
    button: null,
    brand: [
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/brand-1.png",
          alt: "brand-1",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/brand-2.png",
          alt: "brand-2",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/brand-3.png",
          alt: "brand-3",
        },
      },
      {
        id: "04",
        media: {
          type: "image",
          path: "/images/brand-4.png",
          alt: "brand-4",
        },
      },
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/brand-1.png",
          alt: "brand-1",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/brand-2.png",
          alt: "brand-2",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/brand-3.png",
          alt: "brand-3",
        },
      },
      {
        id: "04",
        media: {
          type: "image",
          path: "/images/brand-4.png",
          alt: "brand-4",
        },
      },
      {
        id: "01",
        media: {
          type: "image",
          path: "/images/brand-1.png",
          alt: "brand-1",
        },
      },
      {
        id: "02",
        media: {
          type: "image",
          path: "/images/brand-2.png",
          alt: "brand-2",
        },
      },
      {
        id: "03",
        media: {
          type: "image",
          path: "/images/brand-3.png",
          alt: "brand-3",
        },
      },
      {
        id: "04",
        media: {
          type: "image",
          path: "/images/brand-4.png",
          alt: "brand-4",
        },
      },
    ],
  },
  enquiryData: {
    media: {
      media_type: "image",
      media_path: "/images/home-enquiry-1.jpg",
      media_alt: "home-enquiry-1",
    },
    title: "Let's Get in Touch",
    description:
      "<p>Let's work together to find the most effective solution for your business.</p>",
    button: null,
  },
};

export default async function HomePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // const { data, error } = await getHomeData.getCmsData();/
  // const result = await getHome()

  // if (error) {
  //   notFound();
  // }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/home`, {
    cache: "no-store", // or "force-cache" if static
  });

  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();

  console.log(data);

  const {
    sliders,
    aboutSection,
    formSection,
    journeySection,
    featuredSection,
    projectSection,
    fitsSection,
    brandsSection,
  } = data;

  return (
    <>
      <HomeHero locale={locale} data={sliders} />
      <HomeAbout locale={locale} data={aboutSection} />
      <HomeFeatured
        locale={locale}
        products={local_data?.featuredData?.product}
        data={featuredSection}
      />
      <HomeJourney locale={locale} data={journeySection} />
      <HomeProject locale={locale} data={local_data?.projectData} />
      <HomeCalculator
        locale={locale}
        calculatorData={local_data?.calculatorData}
        customizeData={local_data?.customizeData}
      />
      <HomeFind locale={locale} data={local_data?.findData} />
      <HomeBrand locale={locale} data={local_data?.brandData} />
      <HomeEnquiry locale={locale} data={local_data?.enquiryData} />
    </>
  );
}
