import WarrantyInfo from "@/components/blocks/legal/warranty-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Warranty Policy",
    description: null,
  },

  warrantyData: {
    items: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/warranty-1.jpg",
          media_alt: "warranty-1",
        },
        title: null,
        description:
          "<p>At BOSQ, we take pride in providing high-quality & long lasting products that meet our customers needs. As such, we offer a comprehensive warranty policy to ensure that you are completely satisfied with your purchase.</p><p>All of our office furnishing come with a 3-year warranty that covers any defects in two scenarios “product claim” or “common use”. If you experience any problems with your purchase within the first three years of ownership, simply contact our customer service team and we will make it right. What we guarantee you is a hassle free experience to claim warranty(Under the warranty period) with only 3 steps.</p><p>Please note that our warranty policy does not cover normal wear and tear, misuse, or abuse of the product. We recommend following the manufacturer's instructions for use and care to ensure the longevity of your office chair.</p>",
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/warranty-2.jpg",
          media_alt: "warranty-1",
        },
        title: "Warranty Cover",
        description:
          "<p><b>Product Claim:</b> This is a scenario where the product that has been purchased has either been delivered with a defect/deformity or the item in itself is not the one that was original brought. It can even comprise of colour or parts that are of not the same order placed.</p><p><b>Common Use:</b> In this scenario we target customers claiming for warrant after fair use of the item. These claims are post delivery and usage of the items. Normally claimed while the item is still under warrant and in use has show signs on deterioration or defects.</p>",
      },
      {
        id: 3,
        media: {
          type: "image",
          media_path: "/images/warranty-3.jpg",
          media_alt: "warranty-1",
        },
        title: "Warranty Guide",
        description:
          "<p><b> Office Chair:</b> All our chairs are covered for 3 years of manufacturers warranty. This includes all the components. The cast, seat cushion, mesh/fabric/leather used, bolts, hinges & castors.</p><p><b>Workstation:</b> Our office curated workstations are covered for 3 years. Including all the components such as. Metal panels, sandwich glass/bullet pin/scribe whiteboard separators, wooden tops, metal base, metal legs and gas lift mechanism.</p><p><b>Storage & Accessories:</b>  All our storage units and accessories have a coverage of 1 year. This includes all the components listed. Particular boards, hinges, soft close mechanisms, rails/runners, handles and locks.</p>",
      },
      {
        id: 4,
        media: {
          type: "image",
          media_path: "/images/warranty-4.jpg",
          media_alt: "warranty-1",
        },
        title:
          "Warranty that do not apply for deterioration or defects that are occurred by ",
        description:
          "<ul><li>If the purchased item is still under warranty.</li><li>Normal usage and visible wear and tear.</li><li>Damage caused due to collusion or impact with an external object.</li><li>Excessive stress enforced on the item, abuse or critical limiter pushed.</li><li>Failure to adhere to all the instructions and demonstration provided by BOSQ instruction guidelines.</li><li>Any kind of after market upgradation or temperament with the original item.</li><li>Leathers are prone to scars,folds,wrinkles and decolourisation that occur naturally.</li><li>Any and all kinds of change that detones the colours of the fabric due to excessive usage or sillage or stains.</li></ul>",
      },
    ],
  },
};

export default async function WarrantyPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Warranty Policy"}
      />
      <WarrantyInfo locale={locale} data={local_data?.warrantyData} />
    </>
  );
}
