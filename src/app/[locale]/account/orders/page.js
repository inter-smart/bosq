import AccountOrders from "@/components/blocks/account/account-orders";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "My Profile",
    description: null,
  },
  userData: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    status: "1",
    is_guest: true,
    is_active: true,
    email: "john.doe@email.com",
    gender: "Male",
    date_of_birth: "1991-05-15",
    phone: "+971 50 123 4567",
    address:
      "<p>123 Business Tower<br />Downtown, Dubai<br />United Arab Emirates</p>",
    subscribed_to_news_letter: "1",
    image: "/images/user-1.jpg",
    notes: "string",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  items: [
    {
      id: 1,
      quantity: 1,
      orderId: "#BOSQ254656",
      slug: "orca-mid-back-ergonomic-office-chair",
      type: "configurable",
      name: "Orca Mid Back Ergonomic Office Chair",
      description: "light grey Frisco fabric with aquaclean 2063",
      designDescription:
        "<p>Materialmatt ash grey lacquered <br/> Legmatt ash grey structure lacquered <br /> Item no3670FE040008A00</p>",
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
      quantity: 1,
      orderId: "#BOSQ254656",
      slug: "orca-mid-back-ergonomic-office-chair",
      type: "configurable",
      name: "Orca Mid Back Ergonomic Office Chair",
      description: "light grey Frisco fabric with aquaclean 2063",
      designDescription:
        "<p>Materialmatt ash grey lacquered <br/> Legmatt ash grey structure lacquered <br /> Item no3670FE040008A00</p>",
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
  ],
};

export default function OrdersPage() {
  const locale = "en";
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"My Profile"}
      />
      <AccountOrders locale={locale} data={local_data?.userData} />
    </>
  );
}
