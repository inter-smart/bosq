import AccountLayout from "@/components/blocks/account/account-layout";
import AccountSettings from "@/components/blocks/account/account-settings";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import NotFound from "../../not-found";
import AccountGuard from "@/components/blocks/account/account-guard";

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
};

export default async function SettingsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await ProfileData.fetchProfileById();

  if (error) {
    return <NotFound />;
  }

  console.log(error);

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={"My Profile"} />

      <AccountLayout locale={locale}>
        <AccountSettings locale={locale} data={data} />
      </AccountLayout>
    </>
  );
}
