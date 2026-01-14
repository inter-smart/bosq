import CartHero from "@/components/blocks/cart/cart-hero";
import ContactInfo from "@/components/blocks/contact/contact-info";
import { getContactData } from "@/lib/api/contact";
import { notFound } from "next/navigation";



export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getContactData.getCmsData();

  if (error) {
    notFound();
  }

  const { heroData, contactData } = data;

  // const locale = "en";
  return (
    <>
      <CartHero locale={locale} data={heroData} slug={"contact"} />
      <ContactInfo locale={locale} data={contactData} />
    </>
  );
}


