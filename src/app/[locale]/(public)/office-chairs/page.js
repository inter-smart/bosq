import ChairsListing from "@/components/blocks/office-chair-landing/ChairsListing";
import LandingHero from "@/components/blocks/office-chair-landing/LandingHero";

const local_data = {
  heroData: {
    title: "Office Chairs",
    title_ar: "كراسي المكتب",
    heroTitle: "Comfort-first office chairs",
    heroTitle_ar: "كراسي مكتب تركّز على الراحة",
    heroDescription:
      "Explore our comprehensive collection of office chairs designed for every workspace need. From ergonomic task chairs to luxurious leather executive seating, find the perfect chair that combines comfort, style, and functionality.",
    heroDescription_ar:
      "اكتشف الكراسي المريحة والمكتبية والرئاسية المصممة لراحة الفرق طوال اليوم",
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
  },

  listingData: {
    heroImage: "/images/chair-01.jpg",
    heroTitle: "Task Chairs",
    heroTitle_ar: "ÙƒØ±Ø§Ø³ÙŠ Ø§Ù„Ù…Ù‡Ø§Ù…",
    description:
      "Designed for everyday productivity, our task chairs provide exceptional comfort and support for professionals who spend long hours at their desk. Perfect for home offices, corporate workstations, and collaborative spaces.",
    description_ar:
      "Ù…ØµÙ…Ù…Ø© Ù„Ù„Ø¥Ù†ØªØ§Ø¬ÙŠØ© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©ØŒ ØªÙ‚Ø¯Ù‘Ù… ÙƒØ±Ø§Ø³ÙŠ Ø§Ù„Ù…Ù‡Ø§Ù… Ø±Ø§Ø­Ø© ÙˆØ¯Ø¹Ù…Ø§Ù‹Ø§ Ù…ØªÙ…ÙŠØ²ÙŠÙ† Ù„Ù„Ù…Ø­ØªØ±ÙÙŠÙ† Ø§Ù„Ø°ÙŠÙ† ÙŠÙ‚Ø¶ÙˆÙ† Ø³Ø§Ø¹Ø§Øª Ø·ÙˆÙŠÙ„Ø© Ø£Ù…Ø§Ù… Ø§Ù„Ù…ÙƒØªØ¨. Ù…Ø«Ø§Ù„ÙŠØ© Ù„Ù…ÙƒØ§ØªØ¨ Ø§Ù„Ù…Ù†Ø²Ù„ØŒ ÙˆØ¬Ø¯Ø§ÙˆÙ„ Ø§Ù„Ø´Ø±ÙƒØ§ØªØŒ ÙˆØ§Ù„ÙØ±Ø§ØºØ§Øª Ø§Ù„ØªØ¹Ø§ÙˆÙ†ÙŠØ©.",
    features: [
      "Adjustable seat height and tilt mechanism",
      "Breathable mesh or padded upholstery",
      "360° swivel with smooth-rolling casters",
      "Compact design for space efficiency",
    ],
    features_ar: [
      "Ø§Ø±ØªÙØ§Ø¹ Ù…Ù‚Ø¹Ø¯ ÙˆÙ…ÙŠÙƒØ§Ù†ÙŠÙƒÙŠØ© Ø¥Ù…Ø§Ù„Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØ¹Ø¯ÙŠÙ„",
      "Ù‚Ø¨Ø§Ø¶Ø© Ù…Ù† Ø§Ù„Ø´Ø¨ÙƒØ© Ø§Ù„Ù…Ù‡ÙˆØ§Ø© Ø£Ùˆ ØªØ¬Ù„ÙŠØ¯ Ù…Ø¨Ø·Ù†",
      "Ø¯ÙˆØ±Ø§Ù† 360 Ø¯Ø±Ø¬Ø© Ù…Ø¹ Ø¹Ø¬Ù„ Ø³Ù„Ø³",
      "ØªØµÙ…ÙŠÙ… Ù…ÙƒØªÙ…Ù„ Ù„Ù„ÙƒÙØ§Ø¡Ø© Ø§Ù„Ù…Ø³Ø§Ø­ÙŠØ©",
    ],
    cta: {
      label: "View All Task Chairs",
      label_ar: "Ø¹Ø±Ø¶ ÙƒÙ„ ÙƒØ±Ø§Ø³ÙŠ Ø§Ù„Ù…Ù‡Ø§Ù…",
      href: "/office-chairs",
    },
    coupons: [
      {
        id: 1,
        title: "Ultra Mesh Task Chair",
        title_ar: "ÙƒØ±Ø³ÙŠ Ù…Ù‡Ø§Ù… Ø¨Ø´Ø¨ÙƒØ©",
        chairImage: "/images/chair-01.jpg",
        price: "AED 635",
        href: "/products/ultra-mesh-task-chair",
      },
      {
        id: 2,
        title: "Ergo Mid Back Task Chair",
        title_ar: "ÙƒØ±Ø³ÙŠ Ù…Ù‡Ø§Ù… Ù…Ù†Ø®ÙØ¶ Ø§Ù„Ø¸Ù‡Ø±",
        chairImage: "/images/chair-02.jpg",
        price: "AED 535",
        href: "/products/ergo-mid-back-task-chair",
      },
      {
        id: 3,
        title: "Executive Task Chair",
        title_ar: "ÙƒØ±Ø³ÙŠ Ù…Ù‡Ø§Ù… ØªÙ†ÙÙŠØ°ÙŠ",
        chairImage: "/images/chair-03.jpg",
        price: "AED 685",
        href: "/products/executive-task-chair",
      },
      {
        id: 4,
        title: "Headrest Task Chair",
        title_ar: "ÙƒØ±Ø³ÙŠ Ù…Ù‡Ø§Ù… Ø¨Ø¯Ø¹Ø§Ù…Ø© Ø±Ø£Ø³",
        chairImage: "/images/chair-04.jpg",
        price: "AED 495",
        href: "/products/headrest-task-chair",
      },
    ],
  },
};

export default function OfficeChairsPage({ params }) {
  const locale = params?.locale || "en";

  return (
    <>
      <LandingHero data={local_data?.heroData} locale={locale} />
      <ChairsListing data={local_data?.listingData} locale={locale} />
    </>
  );
}
