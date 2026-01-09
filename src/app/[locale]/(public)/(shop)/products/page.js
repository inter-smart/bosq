import ProductHero from "@/components/blocks/product/product-hero";
import ProductList from "@/components/blocks/product/product-list";

const local_data = {
  heroData: {
    title: "Office Chairs",
    title_ar: "مقاعد المكتب",
    description: null,
  },
  productData: {
    title: "Featured Products",
    description: null,
    button: null,
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
        name: "Orca Mid Back Ergonomic Office Chair ",
        slug: "/en/products/continue-table",
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
        isStock: true,
        name: "Kyro Mid Back Leather Executive Chair",
        slug: "/en/products/okidoki-too-stool",
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
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/360-chair",
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
        slug: "/en/products/ergonomic-chair",
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
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        isStock: true,
        name: "Orca Mid Back Ergonomic Office Chair ",
        slug: "/en/products/continue-table",
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
        isStock: true,
        name: "Kyro Mid Back Leather Executive Chair",
        slug: "/en/products/okidoki-too-stool",
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
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/360-chair",
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
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 11,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 12,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 13,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 14,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 15,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 16,
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
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 17,
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
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 18,
        media: {
          type: "image",
          path: "/images/pro-list-3.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/360-chair",
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
        id: 19,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 20,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 21,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 22,
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
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 23,
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
        shortDescription:
          "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
        description:
          "<p>Optron hash High-Back Task Chair | Latice Series| Product Details</p><p>Upgrade your workspace with the innovative OPTRON Hash Frame Ergonomic Mesh Office Chair, designed to deliver unmatched comfort and support for professionals in Dubai, UAE. Featuring a sleek and futuristic design, this chair combines style with cutting-edge ergonomic functionality.The independent height-adjustable backrest and sliding seat with depth adjustment ensure a customized fit for your body, providing superior comfort during long working hours. The dynamic variable lumbar support adapts perfectly to the natural curve of your back, promoting a healthy posture. Its breathable mesh backrest enhances air circulation, keeping you cool and focused throughout the day.</p>",
        productType: ["Office Chairs", "Ergonomic Chairs"],
      },
      {
        id: 24,
        media: {
          type: "image",
          path: "/images/pro-list-3.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/360-chair",
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
        id: 25,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 26,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 27,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 28,
        media: {
          type: "image",
          path: "/images/pro-list-4.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 29,
        media: {
          type: "image",
          path: "/images/pro-list-5.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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
        id: 30,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
          alt: "pro-1",
        },
        isStock: true,
        name: "Demos High Back Ergonomic Office Chair",
        slug: "/en/products/ergonomic-chair",
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

export default async function ProductsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Products"}
      />
      <ProductList locale={locale} data={local_data?.productData} />
    </>
  );
}
