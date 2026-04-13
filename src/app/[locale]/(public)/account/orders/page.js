import AccountLayout from "@/components/blocks/account/account-layout";
import AccountOrders from "@/components/blocks/account/account-orders";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("orders", locale, "account/orders");

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

const local_data = {
  heroData: {
    title: "My Profile",
    description: null,
  },

  orders: [
    {
      id: 1,
      order_number: "#BOSQ254656",
      no_of_items: 2,
      order_date: "09.08.2025",
      formatted_order_date: "09 Aug 2025",

      payment_status: "Confirmed", // Confirmed, Pending, Failed, Refunded
      order_status: "Dispatched", // Dispatched, Processing, Delivered, Cancelled, Returned

      estimated_delivery: "10.08.2025",
      formatted_estimated_delivery: "10 Aug 2025",
      actual_delivery: null,
      formatted_actual_delivery: null,

      subtotal: 916,
      formatted_subtotal: "AED 916",
      tax_amount: 45.8,
      formatted_tax_amount: "AED 45.80",
      shipping_amount: 0,
      formatted_shipping_amount: "AED 0",
      discount_amount: 0,
      formatted_discount_amount: "AED 0",
      total: 469.405,
      formatted_total: "AED 469.405",
      currency: "AED",

      items: [
        {
          id: 1,
          quantity: 1,
          product_id: 101,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair Orca Mid Back Ergonomic Office Chair",
          description: "light grey Frisco fabric with aquaclean 2063 light grey Frisco fabric with aquaclean 2063",
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

          actions: {
            can_track: true,
            can_cancel: false,
            can_return: false,
            can_reorder: true,
          },
        },
        {
          id: 2,
          quantity: 2,
          product_id: 102,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair",
          description: "dark blue Frisco fabric with aquaclean 2063",
          designDescription: "<p>Material: matt ash grey lacquered<br/>Leg: matt ash grey structure lacquered<br/>Item no: 3670FE040009B00</p>",

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

          actions: {
            can_track: true,
            can_cancel: true,
            can_return: false,
            can_reorder: true,
          },
        },
        {
          id: 3,
          quantity: 1,
          product_id: 102,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair",
          description: "dark blue Frisco fabric with aquaclean 2063",
          designDescription: "<p>Material: matt ash grey lacquered<br/>Leg: matt ash grey structure lacquered<br/>Item no: 3670FE040009B00</p>",

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

          actions: {
            can_track: true,
            can_cancel: true,
            can_return: false,
            can_reorder: true,
          },
        },
        {
          id: 4,
          quantity: 4,
          product_id: 102,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair",
          description: "dark blue Frisco fabric with aquaclean 2063",
          designDescription: "<p>Material: matt ash grey lacquered<br/>Leg: matt ash grey structure lacquered<br/>Item no: 3670FE040009B00</p>",

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

          actions: {
            can_track: true,
            can_cancel: true,
            can_return: true,
            can_reorder: true,
          },
        },
      ],

      // Shipping information
      shipping_address: {
        full_name: "John Doe",
        company: "ACME Corporation",
        address_line_1: "123 Business Tower, Downtown, Dubai",
        address_line_2: "United Arab Emirates",
        city: "Dubai",
        state: "Dubai",
        country: "United Arab Emirates",
        country_code: "AE",
        postcode: "00000",
        phone: "+971 50 123 4567",
      },

      // Billing information
      billing_address: {
        full_name: "John Doe",
        company: "ACME Corporation",
        address_line_1: "123 Business Tower, Downtown, Dubai",
        address_line_2: "United Arab Emirates",
        city: "Dubai",
        state: "Dubai",
        country: "United Arab Emirates",
        country_code: "AE",
        postcode: "00000",
        phone: "+971 50 123 4567",
      },

      // Payment information
      payment_method: {
        method: "credit_card",
        label: "Credit Card",
        last_four: "4242",
        brand: "Visa",
      },

      // Tracking information
      tracking: {
        carrier: "Aramex",
        tracking_number: "ARX123456789",
        tracking_url: "https://www.aramex.com/track/ARX123456789",
      },

      // Order actions available to user
      actions: {
        can_view_details: true,
        can_track_order: true,
        can_cancel_order: false,
        can_download_invoice: true,
        can_reorder: true,
      },

      // Timestamps
      created_at: "2025-08-09 10:30:00",
      updated_at: "2025-08-09 14:20:00",
    },
    {
      id: 2,
      order_number: "#BOSQ254657",
      no_of_items: 2,
      order_date: "09.08.2025",
      formatted_order_date: "09 Aug 2025",

      payment_status: "Confirmed", // Confirmed, Pending, Failed, Refunded
      order_status: "Dispatched", // Dispatched, Processing, Delivered, Cancelled, Returned

      estimated_delivery: "10.08.2025",
      formatted_estimated_delivery: "10 Aug 2025",
      actual_delivery: null,
      formatted_actual_delivery: null,

      subtotal: 916,
      formatted_subtotal: "AED 916",
      tax_amount: 45.8,
      formatted_tax_amount: "AED 45.80",
      shipping_amount: 0,
      formatted_shipping_amount: "AED 0",
      discount_amount: 0,
      formatted_discount_amount: "AED 0",
      total: 469.405,
      formatted_total: "AED 469.405",
      currency: "AED",

      items: [
        {
          id: 1,
          quantity: 1,
          product_id: 101,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair Orca Mid Back Ergonomic Office Chair",
          description: "light grey Frisco fabric with aquaclean 2063 light grey Frisco fabric with aquaclean 2063",
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

          actions: {
            can_track: true,
            can_cancel: false,
            can_return: false,
            can_reorder: true,
          },
        },
        {
          id: 2,
          quantity: 2,
          product_id: 102,
          slug: "orca-mid-back-ergonomic-office-chair",
          type: "configurable",
          name: "Orca Mid Back Ergonomic Office Chair",
          description: "dark blue Frisco fabric with aquaclean 2063",
          designDescription: "<p>Material: matt ash grey lacquered<br/>Leg: matt ash grey structure lacquered<br/>Item no: 3670FE040009B00</p>",

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

          actions: {
            can_track: true,
            can_cancel: true,
            can_return: false,
            can_reorder: true,
          },
        },
      ],

      // Shipping information
      shipping_address: {
        full_name: "John Doe",
        company: "ACME Corporation",
        address_line_1: "123 Business Tower",
        address_line_2: "Downtown",
        city: "Dubai",
        state: "Dubai",
        country: "United Arab Emirates",
        country_code: "AE",
        postcode: "00000",
        phone: "+971 50 123 4567",
      },

      // Billing information
      billing_address: {
        full_name: "John Doe",
        company: "ACME Corporation",
        address_line_1: "123 Business Tower",
        address_line_2: "Downtown",
        city: "Dubai",
        state: "Dubai",
        country: "United Arab Emirates",
        country_code: "AE",
        postcode: "00000",
        phone: "+971 50 123 4567",
      },

      // Payment information
      payment_method: {
        method: "credit_card",
        label: "Credit Card",
        last_four: "4242",
        brand: "Visa",
      },

      // Tracking information
      tracking: {
        carrier: "Aramex",
        tracking_number: "ARX123456789",
        tracking_url: "https://www.aramex.com/track/ARX123456789",
      },

      // Order actions available to user
      actions: {
        can_view_details: true,
        can_track_order: true,
        can_cancel_order: false,
        can_download_invoice: true,
        can_reorder: true,
      },

      // Timestamps
      created_at: "2025-08-09 10:30:00",
      updated_at: "2025-08-09 14:20:00",
    },
  ],
};

export default async function OrdersPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const { locale } = resolvedParams;
  const page = parseInt(resolvedSearch?.page) || 1;

  const { data, error } = await ProfileData.getOrders(page, 12);

  const slug = locale === "en" ? "My Orders" : "طلباتي";
  const orders = data?.orders;
  const pagination = data?.pagination;

  if (!data || error) {
    return <NotFound />
  }
  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />
      <AccountLayout locale={locale}>
        <AccountOrders locale={locale} orders={orders} pagination={pagination} />
      </AccountLayout>
    </>
  );
}
