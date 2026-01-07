import ProductHero from "@/components/blocks/product/product-hero";
import AboutBannerSection from "@/components/blocks/about/AboutBannerSection";
import JourneySection from "@/components/blocks/about/JourneySection";
import WhyBosqSection from "@/components/blocks/about/WhyBosqSection";

const local_data = {
  heroData: {
    title: "About Us",
    description: null,
  },
  about_banner_data: {
    media: {
      type: "video",
      path: "/videos/about-hero.mp4",
    },
    title: "Welcome to BOSQ",
    description: "Built in the UAE, Designed for the Future",
    button: {
      link: "/",
      label: "Explore Our Collections ",
    },
  },
  journey_data: {
    title: "The BOSQ  Journey",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry's standard dummy text ever since the lorem ",
    journey_list: [
      {
        id: 1,
        title: "Founded in India",
      },
      {
        id: 2,
        title: "Entered UAE Market",
      },
      {
        id: 3,
        title: "In-house manufacturing begins",
      },
      {
        id: 4,
        title: "BOSQ brand launch",
      },
      {
        id: 5,
        title: "Expansion to GCC-wide supply",
      },
      {
        id: 6,
        title: "In-house manufacturing begins",
      },
      {
        id: 7,
        title: "Entered UAE Market",
      },
    ],
    imageGrid_list: [
      {
        id: 1,
        media: {
          type: "image",
          path: "/images/journey-grid-1.jpg",
          alt: "journey-grid-1",
        },
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/journey-grid-2.jpg",
          alt: "journey-grid-2",
        },
      },
      {
        id: 3,
        media: {
          type: "image",
          path: "/images/journey-grid-3.jpg",
          alt: "journey-grid-3",
        },
      },
      {
        id: 4,
        media: {
          type: "image",
          path: "/images/journey-grid-3.jpg",
          alt: "journey-grid-3",
        },
      },
    ],
  },
  why_bosq_data: {
    title: "Why BOSQ",
    description:
      "Choose BOSQ for dependable partnerships and seamless execution on projects of any scale.",
    bosq_list: [
      {
        id: 1,
        title: "Reliable Partnership",
        caption: "Building trust through consistent delivery",
        description: `<p>We understand that successful projects depend on partners who deliver on their promises. BOSQ builds lasting relationships through transparent communication, unwavering commitment to deadlines, and full accountability throughout every project phase.</p>
        <ul>
        <li>Keeping deadlines and fulfilling promises</li>
        <li>Transparent communication & accountability</li>
        <li>Trusted by industry leaders</li>
        </ul>
        `,
        media: {
          type: "image",
          path: "/images/why-bosq-1.jpg",
          alt: "why-bosq-1",
        },
        icon: {
          type: "image",
          path: "/images/why-bosq-icon-1.svg",
          alt: "why-bosq-icon-1",
        },
      },
      {
        id: 2,
        title: "Project Scalability",
        caption: "Flexible solutions for any project size",
        description: `<p>From small startups to multinational corporations, BOSQ adapts to your unique requirements. Our scalable approach ensures seamless execution whether you're furnishing a single office or coordinating across multiple locations and time zones.</p>
        <ul>
        <li>Handles custom projects of any size</li>
        <li>Adapts to tight timelines and varied needs</li>
        <li>Seamless coordination across locations</li>
        </ul>
        `,
        media: {
          type: "image",
          path: "/images/why-bosq-2.jpg",
          alt: "why-bosq-2",
        },
        icon: {
          type: "image",
          path: "/images/why-bosq-icon-2.svg",
          alt: "why-bosq-icon-2",
        },
      },
      {
        id: 3,
        title: "Client-Focused Design",
        caption: "Ergonomic solutions tailored to your needs",
        description: `<p>Every workspace is unique, and so are its ergonomic requirements. BOSQ's design philosophy centers on understanding your specific needs, work patterns, and employee wellbeing goals to create furniture solutions that enhance productivity and comfort.</p>
        <ul>
        <li>Tailored solutions for unique client needs</li>
        <li>Ergonomic, user-first furniture design</li>
        <li>Support from planning to post-delivery</li>
        </ul>
        `,
        media: {
          type: "image",
          path: "/images/why-bosq-3.jpg",
          alt: "why-bosq-3",
        },
        icon: {
          type: "image",
          path: "/images/why-bosq-icon-3.svg",
          alt: "why-bosq-icon-3",
        },
      },
      {
        id: 4,
        title: "Professional Execution",
        caption: "Excellence in every detail from concept to completion",
        description: `<p>Our commitment to excellence extends beyond product quality to encompass every aspect of project execution. From initial consultation through final installation, BOSQ maintains the highest standards of professionalism and attention to detail.</p>
        <ul>
        <li>Dedicated team for planning and tracking</li>
        <li>End-to-end quality assurance</li>
        <li>On-site supervision and timeline control</li>
        </ul>
        `,
        media: {
          type: "image",
          path: "/images/why-bosq-4.jpg",
          alt: "why-bosq-4",
        },
        icon: {
          type: "image",
          path: "/images/why-bosq-icon-4.svg",
          alt: "why-bosq-icon-4",
        },
      },
    ],
  },
};

export default function AboutPage() {
  const locale = "en";

  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"About Us"}
      />
      <AboutBannerSection
        locale={locale}
        data={local_data?.about_banner_data}
      />
      <JourneySection locale={locale} data={local_data?.journey_data} />
      <WhyBosqSection locale={locale} data={local_data?.why_bosq_data} />
    </>
  );
}
