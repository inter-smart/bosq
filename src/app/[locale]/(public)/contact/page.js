import ContactInfo from "@/components/blocks/contact/contact-info";
import { getContactData } from "@/lib/api/contact";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../../not-found";
import ProductHero from "@/components/blocks/product/product-hero";



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("contact", locale);

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



export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getContactData.getCmsData();

  const slug = locale === "en" ? "Contact" : "اتصل بنا";
  if (error || !data) {
     return <NotFound />;
   }

  const { heroData, contactData } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slug} />
      <ContactInfo locale={locale} data={contactData} />
    </>
  );
}


