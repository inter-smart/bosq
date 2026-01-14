import ProductHero from "@/components/blocks/product/product-hero";
import SustainabilityInfo from "@/components/blocks/sustainability/sustainability-info";
import { getSustainabilityData, sustainabilityData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";

const local_data = {
  heroData: {
    title: "Sustainability",
    description: null,
    media: {
      type: "image",
      mobilePath: "/images/sustainability-hero-1.jpg",
      desktopPath: "/images/sustainability-hero-1.jpg",
      media_alt: "sustainability-hero-1",
    },
  },

  sustainabilityList: [
    {
      id: 1,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-1.jpg",
        media_alt: "sustainability-item-1",
      },
      title: "Sustainability at BOSQ",
      description:
        "<p>At BOSQ, sustainability is not just a buzzword—it's an integral part of our mission to create ergonomic, health-focused workspaces that are environmentally responsible and socially conscious.</p>",
    },
    {
      id: 2,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-2.png",
        media_alt: "sustainability-item-1",
      },
      title: "Our Commitment to Sustainable Design",
      description:
        "<p>We believe that well-designed workspaces can transform businesses and positively impact individuals, fostering a harmonious balance between comfort and performance. Our approach includes:</p><ul><li><b>Eco-Friendly Materials:</b> Utilizing sustainable and recyclable materials in our furniture production.</li><li><b>Durable Products:</b> Designing furniture that lasts, reducing the need for frequent replacements.</li><li><b>Efficient Manufacturing:</b> Implementing processes that minimize waste and energy consumption.</li></ul>",
    },
    {
      id: 3,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-3.png",
        media_alt: "sustainability-item-1",
      },
      title: "#WeBackYou Initiative",
      description:
        "<p>Our #WeBackYou campaign is dedicated to enhancing workplace wellness by promoting ergonomic solutions that boost productivity, well-being, and sustainability in modern work environments. Key aspects include:</p><ul><li><b>Workplace Wellness Programs:</b> Collaborating with businesses to create healthier work environments.</li><li><b>Sustainable Furniture Support:</b> Offering furniture solutions that are both ergonomic and eco-friendly.</li><li><b>Employee Engagement:</b> Encouraging practices that support mental and physical well-being.</li></ul>",
    },
    {
      id: 4,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-4.png",
        media_alt: "sustainability-item-1",
      },
      title: "Community and Environmental Engagement",
      description:
        "<p>BOSQ is committed to making a positive impact beyond our products:</p><ul><li><b>Local Sourcing:</b> Supporting local suppliers to reduce transportation emissions.</li><li><b>Community Programs:</b> Participating in initiatives that promote environmental awareness and education.</li><li><b>Continuous Improvement:</b> Regularly assessing and enhancing our sustainability practices.</li></ul>",
    },
    {
      id: 5,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-5.png",
        media_alt: "sustainability-item-5",
      },
      title: "Our Sustainability Goals",
      description:
        "<p>Looking forward, BOSQ aims to:</p><ul><li><b>Achieve Carbon Neutrality:</b> Offsetting our carbon footprint through various initiatives.</li><li><b>Expand Sustainable Product Lines:</b> Introducing more eco-friendly furniture options.</li><li><b>Enhance Transparency:</b> Providing detailed reports on our sustainability efforts and progress.</li></ul>",
    },
    {
      id: 6,
      media: {
        type: "image",
        media_path: "/images/sustainability-item-6.png",
        media_alt: "sustainability-item-6",
      },
      title: "Join Us in Building a Sustainable Future",
      description:
        "<p>We invite our clients, partners, and community to collaborate with us in creating workspaces that are not only ergonomic and productive but also environmentally responsible.</p><p><b>Contact Us</b> to learn more about our sustainability initiatives and how we can work together for a greener future.</p>",
    },
  ],
};

export default async function SustainabilityPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getSustainabilityData();

  if (error) {
    notFound();
  }

  const { heroData, sustainabilityData } = data;
  const bannerData = sustainabilityData?.media;
  const sectionData = {
    title: sustainabilityData?.title,
    title_ar: sustainabilityData?.title_ar,
    description: sustainabilityData?.description,
    description_ar: sustainabilityData?.description_ar,
    media: sustainabilityData?.section_media,
  };

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={"Sustainability"} />
      <SustainabilityInfo locale={locale} bannerData={bannerData} sectionData={sectionData} sustainabilityList={sustainabilityData?.sections} />
    </>
  );
}
