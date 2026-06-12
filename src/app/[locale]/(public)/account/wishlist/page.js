import ProductHero from "@/components/blocks/product/product-hero";
import AccountWishlist from "@/components/blocks/account/account-wishlist";
import AccountLayout from "@/components/blocks/account/account-layout";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("wishlist", locale, "account/wishlist");

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
    title: "Wishlist",
    title_ar: "قائمتي",
    description: null,
  },

};

export default async function Wishlist({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await ProfileData.getWishList();
  const wishlistData = data;


  const slug = locale === "en" ? "Wishlist" : "قائمتي";

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />

      <AccountLayout locale={locale}>
        <AccountWishlist locale={locale} data={wishlistData?.wishlistData} />
      </AccountLayout>
    </>
  );
}
