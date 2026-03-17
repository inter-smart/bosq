import WarrantyInfo from "@/components/blocks/legal/warranty-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getWarrantyPolicyCms } from "@/lib/api/warrantyPolicy";


export default async function WarrantyPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const slug = locale === "en"? "Warranty Policy" : "سياسة الضمان";

  const {data} = await getWarrantyPolicyCms.getCmsData();
  const { heroData, warrantyData } = data;
  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <WarrantyInfo locale={locale} data={warrantyData} />
    </>
  );
}
