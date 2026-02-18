import DeliveryInfo from "@/components/blocks/legal/delivery-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getDeliveryPolicyCms } from "@/lib/api/deliveryPolicy";
import { getMetaData } from "@/lib/api/metaApi";



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("delivery-policy", locale);


  const slug = locale === "en"? "Delivery Policy" : "سياسة التوصيل";

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



export default async function DeliveryPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const {data} = await getDeliveryPolicyCms.getCmsData();
  const { heroData, deliveryData, deliveryInfo } = data;
   return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <DeliveryInfo
        locale={locale}
        deliveryInfo={deliveryInfo}
        data={deliveryData}
      />
    </>
  );
}
