import AccountLayout from "@/components/blocks/account/account-layout";
import AccountProfile from "@/components/blocks/account/account-profile";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("profile", locale, "account/profile");

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
    title_ar: "ملفي الشخصي",
    description: null,
  },
  userData: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    status: "1",
    email: "john.doe@email.com",
    date_of_birth: "1991-05-15",
    phone: "+971 50 123 4567",
    address: "<p>123 Business Tower<br />Downtown, Dubai<br />United Arab Emirates</p>",
    subscribed_to_news_letter: "1",
    image: "/images/user-1.jpg",
    notes: "string",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
};

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await ProfileData.getMyProfile();

  if (!data || error) {
    return notFound();
  }

  console.log("PROFILE DATA", data);

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={locale === "en" ? "My Profile" : "ملفي الشخصي"} />
      <AccountLayout locale={locale}>
        <AccountProfile locale={locale} data={data ? data : local_data?.userData} />
      </AccountLayout>
    </>
  );
}
