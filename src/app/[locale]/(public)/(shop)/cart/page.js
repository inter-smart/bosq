import CartEmpty from "@/components/blocks/cart/cart-empty";
import CartHero from "@/components/blocks/cart/cart-hero";
import CartList from "@/components/blocks/cart/cart-list";
import ProductSimilar from "@/components/blocks/product/product-similar";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("cart", locale, "cart");

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
 * @typedef {import('@/types/shop').CartPageResponse} CartPageResponse
 */

/** @type {CartPageResponse} */
const local_data = {
  heroData: {
    title: "Shopping Cart",
    description: null,
  },
  cartData: {
    id: 1,
    customer_email: "john@example.com",
    customer_first_name: "John",
    customer_last_name: "Doe",
    shipping_method: "flatrate_flatrate",
    coupon_code: "FLAT10%",
    items_count: 3,
    items_qty: 4,
    base_currency_code: "AED",
    channel_currency_code: "AED",
    cart_currency_code: "AED",
    grand_total: 10,
    formatted_grand_total: "$10.00",
    base_grand_total: 10,
    formatted_based_grand_total: "$10.00",
    sub_total: 10,
    formatted_sub_total: "$10.00",
    base_sub_total: 10,
    formatted_based_sub_total: "$10.00",
    tax_total: 10,
    formatted_tax_total: "$10.00",
    base_tax_total: 10,
    formatted_based_tax_total: "$10.00",
    discount: 10,
    formatted_discount: "$10.00",
    base_discount: 10,
    formatted_based_discount: "$10.00",
    is_guest: true,
    is_active: true,
    customer: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "example@example.com",
      gender: "Male",
      date_of_birth: "1991-05-15",
      phone: "1234567890",
      status: "1",
      subscribed_to_news_letter: "1",
      image: "http://localhost/private/storage/customer/image.jpg",
      notes: "string",
      created_at: "2020-01-27 17:50:45",
      updated_at: "2020-01-27 17:50:45",
    },
    items: [
      {
        id: 1,
        quantity: 1,
        slug: "orca-mid-back-ergonomic-office-chair",
        type: "configurable",
        name: "Orca Mid Back Ergonomic Office Chair",
        description: "light grey Frisco fabric with aquaclean 2063",
        designDescription: "<p>Materialmatt ash grey lacquered <br/> Legmatt ash grey structure lacquered <br /> Item no3670FE040008A00</p>",
        weight: 1.5,
        total_weight: 3,
        price: 458,
        formatted_price: "AED 458",
        base_price: 10,
        formatted_based_price: "AED 10.00",
        total: 18.26,
        formatted_total: "AED 18.26",
        base_total: 20,
        formatted_based_total: "AED 20.00",
        tax_percent: 2,
        tax_amount: 0.37,
        formatted_tax_amount: "AED 0.37",
        base_tax_amount: 0.41,
        formatted_based_tax_amount: "AED 0.41",
        attributes: {
          size: {
            option_id: 8,
            option_label: "L",
            attribute_name: "Size",
          },
          color: {
            option_id: 5,
            option_label: "White",
            option_code: "#fff",
            attribute_name: "Color",
          },
        },
        media: {
          type: "image",
          path: "/images/cart-product-1.png",
          alt: "pro-1",
        },
      },
      {
        id: 2,
        quantity: 2,
        slug: "wooden-chair",
        type: "configurable",
        name: "Orca Mid Back Ergonomic Office Chair",
        description: "light grey Frisco fabric with aquaclean 2063",
        designDescription: "<p>Materialmatt ash grey lacquered Legmatt ash grey structure lacquered Item no3670FE040008A00</p>",
        weight: 1.5,
        total_weight: 3,
        price: 458,
        formatted_price: "AED 458",
        base_price: 10,
        formatted_based_price: "AED 10.00",
        total: 18.26,
        formatted_total: "AED 18.26",
        base_total: 20,
        formatted_based_total: "AED 20.00",
        tax_percent: 2,
        tax_amount: 0.37,
        formatted_tax_amount: "AED 0.37",
        base_tax_amount: 0.41,
        formatted_based_tax_amount: "AED 0.41",
        attributes: {
          size: {
            option_id: 8,
            option_label: "L",
            attribute_name: "Size",
          },
          color: {
            option_id: 5,
            option_label: "White",
            option_code: "#fff",
            attribute_name: "Color",
          },
        },
        media: {
          type: "image",
          path: "/images/cart-product-2.png",
          alt: "pro-1",
        },
      },
      {
        id: 3,
        quantity: 2,
        slug: "wooden-chair",
        type: "configurable",
        name: "Orca Mid Back Ergonomic Office Chair",
        description: "light grey Frisco fabric with aquaclean 2063",
        designDescription: "<p>Materialmatt ash grey lacquered Legmatt ash grey structure lacquered Item no3670FE040008A00</p>",
        weight: 1.5,
        total_weight: 3,
        price: 458,
        formatted_price: "AED 458",
        base_price: 10,
        formatted_based_price: "AED 10.00",
        total: 18.26,
        formatted_total: "AED 18.26",
        base_total: 20,
        formatted_based_total: "AED 20.00",
        tax_percent: 2,
        tax_amount: 0.37,
        formatted_tax_amount: "AED 0.37",
        base_tax_amount: 0.41,
        formatted_based_tax_amount: "AED 0.41",
        attributes: {
          size: {
            option_id: 8,
            option_label: "L",
            attribute_name: "Size",
          },
          color: {
            option_id: 5,
            option_label: "White",
            option_code: "#fff",
            attribute_name: "Color",
          },
        },
        media: {
          type: "image",
          path: "/images/cart-product-1.png",
          alt: "pro-1",
        },
      },
    ],
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
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
        name: "Orca Mid Back Ergonomic Office Chair ",
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
      {
        id: 6,
        media: {
          type: "image",
          path: "/images/pro-list-6.jpg",
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
        id: 8,
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
        id: 9,
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
        colorVariant: ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"],
        shortDescription: "<p>Introducing the new OPTRON Hash Frame Ergonomic Mesh Office Chair.</p>",
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

export default async function CartPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <CartHero locale={locale} data={local_data?.heroData} slug={"Shopping cart"} itemsCount={local_data?.cartData?.items_count} />
      <>
        <CartList locale={locale} data={local_data?.cartData} />
        <ProductSimilar locale={locale} data={local_data?.similarData} />
      </>
    </>
  );
}
