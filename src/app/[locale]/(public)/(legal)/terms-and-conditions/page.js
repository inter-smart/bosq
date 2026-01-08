import TermsFaqInfo from "@/components/blocks/legal/terms-faq-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Terms & Conditions",
    description:
      "<ul><li>United Arab of Emirates is our country of domicile” and stipulate that the governing law is the local law.</li><li>Visa and Master Card in AED will be accepted for payment</li><li>We will not trade with or provide any services to OFAC and sanctioned countries.</li><li>Customer using the website who are Minor /under the age of 18 shall not register as a User of the website and shall <br />not transact  on or use the website.</li><li>Cardholder must retain a copy of transaction records and Merchant policies and rules.</li><li>User is responsible for maintaining the confidentiality of his account.</li></ul>",
  },

  termsFaqData: {
    title: "FAQ",
    items: [
      {
        id: 1,
        question: "How do we receive a conformation post purcase?",
        answer:
          "<p>Modern office furniture design transforms workspaces, enhances productivity, and improves employee well-being. According to workplace studies, a well-planned office layout can boost efficiency by up to 20% (report by Gensler). Choosing the right furniture design is key to achieving this.</p><p>In today’s fast-changing work environment, office spaces are evolving rapidly. Trends like remote work models, a focus on employee well-being, and technological integration drive this shift, alongside growing demands for ergonomics and sustainability.</p>",
      },
      {
        id: 2,
        question:
          "What if I do not receive an order confirmation post pirchase?",
        answer:
          "Minimal assembly is required. All tools and instructions are included.",
      },
      {
        id: 3,
        question: "How long does it take for me to receive my order?",
        answer: "The chair supports up to 120kg (265 lbs) comfortably.",
      },
      {
        id: 4,
        question: "What is your return and exchange policy?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 5,
        question: "How do I change my shipping address?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 6,
        question: "How do I change my shipping address?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 7,
        question: "How do I track the status of my order?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 8,
        question: "How do I receive customer support?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 9,
        question: "What do I do if I entered an incorrect shipping address?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 10,
        question: "Do you ship to my country?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
      {
        id: 11,
        question: "Will my items come in one package?",
        answer:
          "Yes, bulk orders can be customized. Please use the enquiry form for details.",
      },
    ],
  },
};

export default async function TermsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Terms & Conditions"}
      />
      <TermsFaqInfo locale={locale} data={local_data?.termsFaqData} />
    </>
  );
}
