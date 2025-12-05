import CheckoutHero from "@/components/blocks/checkout/checkout-hero";
import CheckoutList from "@/components/blocks/checkout/checkout-list";

const local_data = {
  heroData: {
    title: "Shopping Cart",
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
        type: "viimagedeo",
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
    name: "Orca Mid Back Ergonomic Office Chair ",
    slug: "continue-table",
    price: 458,
    category: "Office Chair",
    colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
    shortDescription:
      "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
    purchaseTagline:
      "Enhance Your Productivity by Upgrading Your Workspace Comfort Today",
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
    },
    description:
      "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
    productType: ["Office Chairs", "Ergonomic Chairs"],
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
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/pro-list-2.jpg",
          alt: "pro-1",
        },
        name: "Kyro Mid Back Leather Executive Chair",
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
        name: "Demos High Back Ergonomic Office Chair",
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
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
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
        id: 6,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
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
        id: 7,
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
      {
        id: 8,
        media: {
          type: "image",
          path: "/images/pro-list-2.jpg",
          alt: "pro-1",
        },
        name: "Kyro Mid Back Leather Executive Chair",
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
        id: 9,
        media: {
          type: "image",
          path: "/images/pro-list-3.jpg",
          alt: "pro-1",
        },
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/products/360-chair",
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
        id: 10,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
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
    ],
  },
};

export default function CheckoutPage() {
  const locale = "en";
  return (
    <>
      <CheckoutHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Shopping cart"}
      />
      <CheckoutList locale={locale} data={local_data?.productData} />
    </>
  );
}
