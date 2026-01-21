import AccountAddress from "@/components/blocks/account/account-address";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("manageAddress", locale, "account/manage-address");

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

  address: {
    title: "Manage Address",
    description:
      "<p>The following addresses will be used on the checkout page by default.</p>",

    // Shipping information
    shippingAddress: [
      {
        is_default: true,
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
      {
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
      {
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
    ],
  },
};

export default async function ManageAddressPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"My Profile"}
      />
      <AccountAddress locale={locale} data={local_data?.address} />
    </>
  );
}
