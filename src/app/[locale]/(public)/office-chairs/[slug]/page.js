import ChairsListing from "@/components/blocks/office-chair-landing/ChairsListing";
import LandingHero from "@/components/blocks/office-chair-landing/LandingHero";
import { getOfficeChairsData } from "@/lib/api/CMS/basicGet";
import NotFound from "../not-found";


const local_data = {
  heroData: {
    title: "Office Chairs",
    title_ar: "كراسي المكتب",
    heroTitle: "Office Chairs",
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
        path: "/images/officerchair-hero.jpg",
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
      "<ul><li>Adjustable seat height and tilt mechanism</li><li>Breathable mesh or padded upholstery</li><li>360° swivel with smooth-rolling casters</li><li>Compact design for space efficiency</li></ul>",
    ],
    features_ar: [
      "Ø§Ø±ØªÙØ§Ø¹ Ù…Ù‚Ø¹Ø¯ ÙˆÙ…ÙŠÙƒØ§Ù†ÙŠÙƒÙŠØ© Ø¥Ù…Ø§Ù„Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØ¹Ø¯ÙŠÙ„",
      "Ù‚Ø¨Ø§Ø¶Ø© Ù…Ù† Ø§Ù„Ø´Ø¨ÙƒØ© Ø§Ù„Ù…Ù‡ÙˆØ§Ø© Ø£Ùˆ ØªØ¬Ù„ÙŠØ¯ Ù…Ø¨Ø·Ù†",
      "Ø¯ÙˆØ±Ø§Ù† 360 Ø¯Ø±Ø¬Ø© Ù…Ø¹ Ø¹Ø¬Ù„ Ø³Ù„Ø³",
      "ØªØµÙ…ÙŠÙ… Ù…ÙƒØªÙ…Ù„ Ù„Ù„ÙƒÙØ§Ø¡Ø© Ø§Ù„Ù…Ø³Ø§Ø­ÙŠØ©",
    ],
    cta: {
      label: "View All Task Chairs",
      label_ar: "...",
      href: "/office-chairs",
    },
    product: [

      {
        id: 1,
        media: {
          type: "image",
          path: "/images/officer-01.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Orca Mid Back Ergonomic Office Chair",
        slug: "/products/okidoki-too-stool",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/officer-02.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Orca Mid Back Ergonomic Office Chair",
        slug: "/products/okidoki-too-stool",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 3,
        media: {
          type: "image",
          path: "/images/pro-list-3.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Orca Mid Back Ergonomic Office Chair",
        slug: "/products/360-chair",
        price: 458,
        category: "Office Chair",
        colorVariant: null,
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 4,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/products/ergonomic-chair",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 5,
        media: {
          type: "image",
          path: "/images/pro-list-1.jpg",
          alt: "pro-1",
        },
        hoverMedia: {
          type: "image",
          path: "/images/pro-list1-1.jpg",
          alt: "pro-1",
        },
        isStock: false,
        name: "Orca Mid Back Ergonomic Office Chair ",
        slug: "/products/continue-table",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },

    ],
  },
};



export default async function OfficeChairsPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  console.log("slug", slug)
  const response = await getOfficeChairsData(slug);
  const {data} = response?.data;
  console.log("data", data)

  if (!data) return <NotFound params={{ locale }} />;

  return (
    <>
      <LandingHero data={data?.heroData} locale={locale} />
      {data?.listingData?.map((listing, index) => (
        <ChairsListing key={index} data={listing} locale={locale} />
      ))}
    </>
  );
}
