import HomeHero from "@/components/blocks/home/home-hero";

const local_data = {
  homeData: [
    {
      id: 1,
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
      title: "Designed for Comfort.<br/> Engineered for Your <br /> Workspace",
      description:
        "<p>Shaping the future of work environments across the world</p>",
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
      title: "22 Designed for Comfort. Engineered for Your Workspace",
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
      title: "33 Designed for Comfort. Engineered for Your Workspace",
      description:
        "<p>Shaping the future of work environments across the world</p>",
      button: {
        type: "link",
        label: "View Product",
        link: "/",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <HomeHero data={local_data.homeData} />
      <div className="h-[1000px]" />
    </>
  );
}
