import ProductDetail from "@/components/blocks/product/product-detail";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: null,
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
    name: "Orca Mid Back Ergonomic Office Chair ",
    slug: "continue-table",
    price: 458,
    category: "Office Chair",
    colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
    shortDescription:
      "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
    description:
      "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
    productType: ["Office Chairs", "Ergonomic Chairs"],
  },
};

export default async function ProductDetailPage({ params }) {
  const locale = "en";
  const { slug } = await params;
  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />
      <ProductDetail locale={locale}  />
      {/* data={local_data?.productData} */}
    </>
  );
}
