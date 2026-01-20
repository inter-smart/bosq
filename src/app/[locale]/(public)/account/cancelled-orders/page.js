import AccountCancelled from "@/components/blocks/account/account-cancelled";
import AccountLayout from "@/components/blocks/account/account-layout";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "My Profile",
    description: null,
  },

  cancelledOrders: [
    {
      id: 1,
      quantity: 1,
      product_id: 101,
      order_number: "#BOSQ254656",
      slug: "orca-mid-back-ergonomic-office-chair",
      type: "configurable",
      name: "Orca Mid Back Ergonomic Office Chair Orca Mid Back Ergonomic Office Chair",
      description: null,
      cancelledReason:
        "<p>Changed mind about color</p>",

      cancelled_date: "10.08.2025",
      formatted_cancelled_date: "10 Aug 2025",

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
        can_track: false,
        can_cancel: false,
        can_return: false,
        can_reorder: true,
      },
    },
  ],
};

export default function CancelledOrdersPage() {
  const locale = "en";
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"My Profile"}
      />

      <AccountLayout locale={locale}>
        <AccountCancelled locale={locale} data={local_data?.cancelledOrders} />
      </AccountLayout>
    </>
  );
}
