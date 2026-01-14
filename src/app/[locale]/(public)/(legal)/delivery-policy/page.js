import DeliveryInfo from "@/components/blocks/legal/delivery-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getDeliveryPolicyCms } from "@/lib/api/deliveryPolicy";



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
        slug={"Delivery Policy"}
      />
      <DeliveryInfo
        locale={locale}
        deliveryInfo={deliveryInfo}
        data={deliveryData}
      />
    </>
  );
}
