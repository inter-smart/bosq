import ProductDetail from "@/components/blocks/product/product-detail";
import ProductDetailCopy from "@/components/blocks/product/product-detail copy";
import ProductHero from "@/components/blocks/product/product-hero";
import ProductSimilar from "@/components/blocks/product/product-similar";
import { getMetaData } from "@/lib/api/metaApi";
import { ProductData } from "@/lib/api/products/ResourcesApi";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData(`product-${slug}`, locale, `products/${slug}`);

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

/**
 * @typedef {import('@/types/shop').ProductDetailResponse} ProductDetailResponse
 */

/** @type {ProductDetailResponse} */
const local_data = {
  heroData: {
    title: null,
    title_ar: null,
    description: null,
  },
  productData: {
    id: 1,
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
    productMedia: [
      {
        type: "video",
        path: "/videos/pro-detail-2.mp4",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-1.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-2.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-2.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-3.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-3.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-4.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-4.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-1.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-1.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-2.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-2.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-3.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-3.jpg",
      },
      {
        type: "image",
        path: "/images/pro-detail-thumb-4.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-4.jpg",
      },
      {
        type: "image",
        path: "/images/temp-large-pro.jpg",
        alt: "pro-1",
        thumbnail: "/images/pro-detail-thumb-4.jpg",
      },
    ],
    name: "Orca Mid Back Ergonomic Office Chair",
    slug: "continue-table",
    price: 458,
    formattedPrice: "AED 458",
    currency: "AED",
    category: "OFFICE CHAIR",
    colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
    shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
    purchaseTagline: "Enhance Your Productivity by Upgrading Your Workspace Comfort Today",
    specification: [
      {
        id: 1,
        title: "Easy Customization",
        iconPath: "/images/specification-1.svg",
      },
      {
        id: 2,
        title: "Premium Quality",
        iconPath: "/images/specification-2.svg",
      },
      {
        id: 3,
        title: "Free Delivery",
        iconPath: "/images/specification-3.svg",
      },
    ],
    projectGallery: [
      {
        type: "image",
        path: "/images/product-detail-1.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-2.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-3.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-4.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-5.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-6.jpg",
        alt: "project",
      },
      {
        type: "image",
        path: "/images/product-detail-7.jpg",
        alt: "project",
      },
    ],
    chooseDesign: {
      title: "Choose Your Design",
      selectedDesign: {
        image: "/images/pro-detail-thumb-2.jpg",
        title: "light grey Frisco fabric with aquaclean 2063",
        subtitle: "<b>Bosq</b> : light grey Frisco fabric with aquaclean 2063",
      },
      model: [
        {
          id: 1,
          title: "Classic Saddle Seat",
          iconPath: "/images/chooseDesign-model-1.png",
        },
        {
          id: 2,
          title: "Classic saddle seat & headrest",
          iconPath: "/images/chooseDesign-model-2.png",
        },
        {
          id: 3,
          title: "Classic Saddle Seat",
          iconPath: "/images/chooseDesign-model-3.png",
        },
        {
          id: 4,
          title: "Rounded Seat",
          iconPath: "/images/chooseDesign-model-4.jpg",
        },
      ],
      filters: {
        colors: ["Black", "White", "Gray", "Brown"],
        material: ["Solid", "Mesh", "Leather"],
        fabricName: ["Arezzo", "Bosq", "Cleo", "Dante", "Evo"],
      },
    },
    description:
      "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
    productDetails: {
      title: "Product Details",
      content: {
        main: "<h6>Optron hash High-Back Task Chair | Latice Series| Product Details</h6><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        features: [
          {
            title: "Adjustable Backrest:",
            description: "Independent height adjustment for tailored support.",
          },
          {
            title: "Seat Customization:",
            description: "Sliding seat with depth adjustment for personalized comfort.",
          },
          {
            title: "Lumbar Support:",
            description: "Dynamic variable lumbar support adapts to your spine's natural curve.",
          },
          {
            title: "Breathable Mesh Backrest:",
            description: "Enhances air circulation to keep you cool during long work hours.",
          },
          {
            title: "Modern Aesthetic:",
            description: "Sleek, futuristic design perfect for contemporary office setups.",
          },
        ],
      },
    },
    additionalInfo: {
      title: "Additional Information",
      content:
        "<h6>Optron hash High-Back Task Chair | Latice Series| Product Details</h6><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          id: 1,
          question: "What is the warranty period for this chair?",
          answer: "This chair comes with a 5-year warranty covering manufacturing defects.",
        },
        {
          id: 2,
          question: "Is assembly required?",
          answer: "Minimal assembly is required. All tools and instructions are included.",
        },
        {
          id: 3,
          question: "What is the weight capacity?",
          answer: "The chair supports up to 120kg (265 lbs) comfortably.",
        },
        {
          id: 4,
          question: "Can I customize the color?",
          answer: "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
      ],
    },
    enquiry: {
      title: "Enquire Now",
      subtitle: "Bulk Orders & Customisation Available!",
      description: "<p>Need 10 or 100 chairs? Want them in your brand colours or a unique design? No problem. Just tell us what you need below!</p>",
    },
    relatedLinks: {
      matchingProducts: {
        text: "Matching Products - You may also like",
        url: "/",
      },
    },
    productType: ["Office Chairs", "Ergonomic Chairs"],
    frequentlyBought: [
      {
        id: 1,
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
        isStock: true,
        name: "Orca Mid Back Ergonomic Office Chair ",
        slug: "/en/products/continue-table",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/pro-list-2.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Kyro Mid Back Leather Executive Chair",
        slug: "/en/products/okidoki-too-stool",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
    ],
  },
  similarData: {
    title: "Similar products",
    product: [
      {
        id: 1,
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
        name: "Orca Mid Back Ergonomic Office Chair",
        slug: "/products/continue-table",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/pro-list-2.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Kyro Mid Back Leather Executive Chair",
        slug: "/products/okidoki-too-stool",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
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
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/products/360-chair",
        price: 458,
        category: "Office Chair",
        colorVariant: null,
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
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
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 5,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/products/ergonomic-chair",
        price: 458,
        category: "Office Chair",
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
    ],
  },
};

export default async function ProductDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale, slug } = resolvedParams;

  const variantSku = resolvedSearchParams?.sku || null;
  const model = resolvedSearchParams?.model || null;

  // Extract all attr_* params from the URL (e.g., attr_pattern=striped, attr_color=blue)
  const attributeFilters = {};
  Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
    if (key.startsWith("attr_") && value) {
      const attrSlug = key.replace("attr_", "");
      attributeFilters[attrSlug] = value;
    }
  });

  const { data, error } = await ProductData.getProductDetailsBySlug(slug, variantSku, model, attributeFilters);

  if (!data?.initialVariant) {
    notFound();
  }

  return (
    <>
      <ProductHero locale={locale} data={data?.heroData} slug={slug} type="product" />
      <ProductDetailCopy locale={locale} initialData={data?.initialVariant} productData={data?.product} models={data?.models} productSlug={slug} />
      {data?.similarVariants?.length > 0 && <ProductSimilar locale={locale} data={data?.similarVariants} />}
    </>
  );
}
