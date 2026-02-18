import CartHero from "@/components/blocks/cart/cart-hero";
import ContactInfo from "@/components/blocks/contact/contact-info";
import { getContactData } from "@/lib/api/contact";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";



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
  if (error) {
    NotFound();
  }

  const { heroData, contactData } = data;

  return (
    <>
      <CartHero locale={locale} data={heroData} slug={slug} />
      <ContactInfo locale={locale} data={contactData} />
    </>
  );
}


