import LandingHero from "@/components/blocks/office-chair-landing/LandingHero";
// import ChairsListing from "@/components/blocks/office-chair-landing/ChairsListing";

const local_data = {
  heroData: {
    title: "Office Chairs",
    title_ar: "كراسي المكتب",
    heroTitle: "Comfort-first office chairs",
    heroTitle_ar: "كراسي مكتب تركّز على الراحة",
    heroDescription:
      "Explore our comprehensive collection of office chairs designed for every workspace need. From ergonomic task chairs to luxurious leather executive seating, find the perfect chair that combines comfort, style, and functionality.",
    heroDescription_ar:
      "اكتشف الكراسي المريحة والمكتبية والرئاسية المصممة لراحة الفرق طوال اليوم.",
    media: {
      type: "image",
      desktop: {
        path: "/images/officerchair-hero.jpg",
        alt: "Comfort-first office chairs",
      },
      mobile: {
        path: "/images/ergonomic-chair-hero.jpg",
        alt: "Comfort-first office chairs",
      },
    },
    media_ar: {
      type: "image",
      desktop: {
        path: "/images/officerchair-hero.jpg",
        alt_ar: "مجموعة من كراسي المكتب المريحة",
      },
      mobile: {
        path: "/images/ergonomic-chair-hero.jpg",
        alt_ar: "مجموعة من كراسي المكتب المريحة",
      },
    },
  },

  listingData: {
    

    coupons: [
      
    ],
  },
};

export default function OfficeChairsPage({ params }) {

  const locale = params?.locale || "en";

  return (
    <>
      <LandingHero data={local_data?.heroData} locale={locale} />
      {/* <ChairsListing data={local_data?.listingData} locale={locale} /> */}
    </>
  );
}
