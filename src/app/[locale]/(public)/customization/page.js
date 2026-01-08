import CustomizationInfo from "@/components/blocks/customization/customization-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Customize Your Chair",
    description: null,
  },

  customizationData: {
    media: {
      type: "image",
      mobilePath: "/images/customization-hero-1.jpg",
      desktopPath: "/images/customization-hero-1.jpg",
      media_alt: "customization-hero-1",
    },
    title: "Custom Ergonomic Solutions",
    description:
      "<p>Every workspace is unique. At BOSQ, we create bespoke ergonomic furniture solutions tailored to your specific requirements, body measurements, and aesthetic preferences.</p>",
  },

  customizationFeatures: [
    {
      id: 1,
      media: {
        type: "image",
        media_path: "/images/customization-item-1.svg",
        media_alt: "customization-item-1",
      },
      title: "Personal Consultation",
      description: "<p>Expert guidance to understand your unique needs.</p>",
    },
    {
      id: 2,
      media: {
        type: "image",
        media_path: "/images/customization-item-2.svg",
        media_alt: "customization-item-1",
      },
      title: "Custom Design",
      description: "<p>Tailored solutions crafted to your specifications.</p>",
    },
    {
      id: 3,
      media: {
        type: "image",
        media_path: "/images/customization-item-3.svg",
        media_alt: "customization-item-1",
      },
      title: "Premium Quality",
      description: "<p>Exceptional materials and craftsmanship.</p>",
    },
    {
      id: 4,
      media: {
        type: "image",
        media_path: "/images/customization-item-4.svg",
        media_alt: "customization-item-1",
      },
      title: "After-Sales Support",
      description:
        "<p>Reliable service and assistance whenever you need it.</p>",
    },
  ],

  customizationProcess: {
    media: {
      type: "image",
      media_path: "/images/customizationProcess-1.jpg",
      media_alt: "customizationProcess-1",
    },
    title: "Our Customization Process",
    description:
      "<p>From initial consultation to final delivery, our comprehensive process ensures your custom furniture exceeds expectations.</p>",
    items: [
      {
        id: 1,
        title: "Consultation",
        description:
          "<p>We discuss your requirements, workspace needs, and design<br/> preferences in detail.</p>",
      },
      {
        id: 2,
        title: "Design & Quote",
        description:
          "<p>Our experts create detailed specifications and provide transparent<br/> pricing.</p>",
      },
      {
        id: 3,
        title: "Manufacturing",
        description:
          "<p>Skilled craftsmen bring your custom design to life using premium <br/>materials.</p>",
      },
      {
        id: 4,
        title: "Delivery",
        description:
          "<p>Professional installation and setup at your location with full support.</p>",
      },
    ],
  },

  customizationOptions: {
    media: {
      type: "image",
      media_path: "/images/customizationOptions-1.jpg",
      media_alt: "customizationOptions-1",
    },
    title: "Customization Options",
    description:
      "<p>Explore the extensive range of customization possibilities available for your BOSQ ergonomic furniture.</p>",
    items: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-1.jpg",
          media_alt: "customizationOptions-1",
        },
        title: "Materials & Finishes",
        description:
          "<p>Premium materials tailored to your environment.</p><ul><li>Genuine leather options</li><li>High-grade mesh fabrics</li><li>Sustainable materials</li><li>Custom color matching</li><li>Antimicrobial treatments</li></ul>",
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-2.jpg",
          media_alt: "customizationOptions-2",
        },
        title: "Ergonomic Features",
        description:
          "<p>Advanced support systems for optimal comfort.</p><ul><li>Multi-zone lumbar support</li><li>4D adjustable armrests</li><li>Synchronized tilt mechanisms</li><li>Height-adjustable headrests</li><li>Seat depth adjustment</li></ul>",
      },
      {
        id: 3,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-3.jpg",
          media_alt: "customizationOptions-3",
        },
        title: "Design & Aesthetics",
        description:
          "<p>Visual elements that match your brand identity.</p><ul><li>Logo embossing options</li><li>Custom stitching patterns</li><li>Executive styling details</li><li>Color coordination</li><li>Matching accessories</li></ul>",
      },
    ],
  },
  requestCustomQuote: {
    media: {
      type: "image",
      media_path: "/images/customizationOptions-1.jpg",
      media_alt: "customizationOptions-1",
    },
    title: "Request Custom Quote",
    description:
      "<p>Tell us about your requirements and our experts will create a personalized solution for you.</p>",
    items: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-1.jpg",
          media_alt: "customizationOptions-1",
        },
        title: "Materials & Finishes",
        description:
          "<p>Premium materials tailored to your environment.</p><ul><li>Genuine leather options</li><li>High-grade mesh fabrics</li><li>Sustainable materials</li><li>Custom color matching</li><li>Antimicrobial treatments</li></ul>",
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-2.jpg",
          media_alt: "customizationOptions-2",
        },
        title: "Ergonomic Features",
        description:
          "<p>Advanced support systems for optimal comfort.</p><ul><li>Multi-zone lumbar support</li><li>4D adjustable armrests</li><li>Synchronized tilt mechanisms</li><li>Height-adjustable headrests</li><li>Seat depth adjustment</li></ul>",
      },
      {
        id: 3,
        media: {
          type: "image",
          media_path: "/images/customizationOptions-3.jpg",
          media_alt: "customizationOptions-3",
        },
        title: "Design & Aesthetics",
        description:
          "<p>Visual elements that match your brand identity.</p><ul><li>Logo embossing options</li><li>Custom stitching patterns</li><li>Executive styling details</li><li>Color coordination</li><li>Matching accessories</li></ul>",
      },
    ],
  },
};

export default async function CustomizationPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Customize Your Chair"}
      />
      <CustomizationInfo
        locale={locale}
        data={local_data?.customizationData}
        customizationFeatures={local_data?.customizationFeatures}
        customizationProcess={local_data?.customizationProcess}
        customizationOptions={local_data?.customizationOptions}
      />
    </>
  );
}
