import ReturnInfo from "@/components/blocks/legal/return-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Return policy",
    description: null,
  },

  returnData: {
    media: {
      type: "image",
      media_path: "/images/return-1.jpg",
      media_alt: "return-1",
    },
    items: [
      {
        id: 1,
        title: null,
        description:
          "<h6>Thank you for your purchase.</h6><p>We hope you are happy with your purchase. <br/>However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund, store credit, or an exchange. Please see below for more information on our return policy.</p>",
      },
      {
        id: 2,
        title: "Returns",
        description:
          "<p>All returns must be postmarked within seven (7) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>",
      },
      {
        id: 3,
        media: null,
        title: "Refunds",
        description:
          "<p>After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least seven to thirty (7 - 30) days from the receipt of your item to process your return or exchange. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.</p>",
      },
      {
        id: 4,
        media: null,
        title: "Return Process",
        description:
          "<p>Please appeal for a return if the below scenarios occur.</p><ul><li>Item not as advertised. Ex: Different color, product, base…etc,The product seal has been tampered with or broken.</li><li>Content damaged via transit.</li><li>Item received without brand packaging.</li></ul><p>If yes, please follow the below steps to get your refund:</p><p>To return an item, please email customer service at support@bosq.ae to obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA number, place the item securely in its original packaging and follow the below to get this actioned as soon as possible.</p><ul><li>Image of the product.</li><li>Email to support@bosq.ae </li><li>Call on +971-059765 8876, then mail your return to the following address.</li></ul><p>You may also use the prepaid shipping label enclosed with your package. Return shipping charges will be paid or reimbursed by us.</p>",
      },
      {
        id: 5,
        media: null,
        title: "Exceptions",
        description:
          "<p>The following items cannot be returned or exchanged:</p><ul><li>Chair Accessories that are damaged while use.</li><li>Damaged via excess pressure or stress or overloading.</li><li>Clear indicators of external damage caused.</li><li>Resold or Gifted Items returned for cash back.</li></ul><p>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.</p><h6>Please Note</h6><ul><li>Sale items are FINAL SALE and cannot be returned.</li><li>Packaging materials needs to be intact.</li><li>There should be no visible damage caused via usage.</li><li>Invoice needs be intact.</li></ul><p>If you have any questions concerning our return policy, please contact us at: <br/>   +971-0597658876    |     support@bosq.ae</p>",
      },
    ],
  },
};

export default async function ReturnPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Return Policy"}
      />
      <ReturnInfo locale={locale} data={local_data?.returnData} />
    </>
  );
}
