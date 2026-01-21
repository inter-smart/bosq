import AccountSettings from "@/components/blocks/account/account-settings";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("settings", locale, "account/settings");

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

  settingsData: {
    customer_id: 1,
    customer_email: "john@example.com",
    total_coupons: 2,
    active_coupons: 1,
    expired_coupons: 1,

    coupons: [
      {
        id: 1,
        code: "OFFICE20",
        title: "20%",
        description:
          "Get 20% discount on all office chairs ( Min. order: AED 500 )",
        discount_type: "percentage", // percentage | fixed
        discount_value: 20,
        min_order_amount: 500,
        formatted_min_order_amount: "AED 500.00",

        max_discount_amount: 300,
        formatted_max_discount_amount: "AED 300.00",

        applicable_on: ["office_chairs"],
        usage_limit: 1,
        used_count: 0,

        status: "active", // active | expired | used
        valid_from: "2025-01-01",
        valid_to: "2025-01-31",
        expiry_text: "Expires on Jan 31, 2025",

        is_copy_enabled: true,
        is_auto_apply: false,

        created_at: "2025-01-01 10:00:00",
        updated_at: "2025-01-10 12:30:00",
      },
      {
        id: 2,
        code: "OFFICE30",
        title: "30%",
        description:
          "Get 20% discount on all office chairs ( Min. order: AED 1000 ) Get 20% discount on all office chairs ( Min. order: AED 1000 )Get 20% discount on all office chairs ( Min. order: AED 1000 )",
        discount_type: "percentage", // percentage | fixed
        discount_value: 20,
        min_order_amount: 1000,
        formatted_min_order_amount: "AED 1,000.00",

        max_discount_amount: null,
        formatted_max_discount_amount: null,

        applicable_on: ["all_products"],
        usage_limit: 1,
        used_count: 1,

        status: "expired", // active | expired | used
        valid_from: "2024-12-01",
        valid_to: "2024-12-31",
        expiry_text: "Expired on Dec 31, 2024",

        is_copy_enabled: false,
        is_auto_apply: false,

        created_at: "2024-12-01 09:00:00",
        updated_at: "2024-12-31 23:59:59",
      },
      {
        id: 3,
        code: "OFFICE40",
        title: "40%",
        description:
          "Get 20% discount on all office chairs ( Min. order: AED 1000 )",
        discount_type: "percentage", // percentage | fixed
        discount_value: 20,
        min_order_amount: 1000,
        formatted_min_order_amount: "AED 1,000.00",

        max_discount_amount: null,
        formatted_max_discount_amount: null,

        applicable_on: ["all_products"],
        usage_limit: 1,
        used_count: 1,

        status: "used", // active | expired | used
        valid_from: "2024-12-01",
        valid_to: "2024-12-31",
        expiry_text: "Expired on Dec 31, 2024",

        is_copy_enabled: false,
        is_auto_apply: false,

        created_at: "2024-12-01 09:00:00",
        updated_at: "2024-12-31 23:59:59",
      },
    ],
  },
};

export default async function SettingsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"My Profile"}
      />
      <AccountSettings locale={locale} data={local_data?.settingsData} />
    </>
  );
}
