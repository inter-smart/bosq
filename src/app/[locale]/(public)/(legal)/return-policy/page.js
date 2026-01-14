import ReturnInfo from "@/components/blocks/legal/return-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getReturnPolicyCms } from "@/lib/api/returnPolicy";


export default async function ReturnPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const slug = locale === "en"? "Return Policy" : "سياسة الاسترجاع";
  const {data} =  await getReturnPolicyCms.getCmsData();

  const { heroData, returnData } = data;

  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <ReturnInfo locale={locale} data={returnData} />
    </>
  );
}
