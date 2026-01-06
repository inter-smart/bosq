import ProductHero from "@/components/blocks/product/product-hero";
import AboutBannerSection from "@/components/blocks/about/AboutBannerSection";

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
    }
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
    </>
  );
}
