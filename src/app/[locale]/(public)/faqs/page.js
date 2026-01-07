import FaqInfo from "@/components/blocks/faq/faq-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Frequently Asked Questions",
    description: null,
  },
  faqData: {
    media: {
      type: "image",
      alt: "hero",
      mobilePath: "/images/faq-hero-1.jpg",
      desktopPath: "/images/faq-hero-1.jpg",
    },
    title:
      "Experience Customer <br /> Support Like No Other. <br /> We Are Just An Email Away",
    generalFaq: {
      title: "General Questions",
      items: [
        {
          id: 1,
          question: "How do i place an order",
          answer:
            "<p>Modern office furniture design transforms workspaces, enhances productivity, and improves employee well-being. According to workplace studies, a well-planned office layout can boost efficiency by up to 20% (report by Gensler). Choosing the right furniture design is key to achieving this.</p><p>In today’s fast-changing work environment, office spaces are evolving rapidly. Trends like remote work models, a focus on employee well-being, and technological integration drive this shift, alongside growing demands for ergonomics and sustainability.</p>",
        },
        {
          id: 2,
          question: "Can I modify or cancel my order after placing it?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
        {
          id: 3,
          question: "How long does shipping take?",
          answer: "The chair supports up to 120kg (265 lbs) comfortably.",
        },
        {
          id: 4,
          question: "Do you offer international shipping?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
        {
          id: 5,
          question: " How do I track my order?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
      ],
    },
    paymentFaq: {
      title: "Payments",
      items: [
        {
          id: 1,
          question: "What payment methods do you accept?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
        {
          id: 2,
          question: "Is my payment information secure?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
      ],
    },
    returnFaq: {
      title: "Returns & Refunds",
      items: [
        {
          id: 1,
          question: "What is your return policy?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
        {
          id: 2,
          question: "How do I start a return?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
        {
          id: 3,
          question: "When will I receive my refund?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
      ],
    },
    productFaq: {
      title: "Products & Availability",
      items: [
        {
          id: 1,
          question: "An item I want is out of stock. Will it be restocked?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
        {
          id: 2,
          question: "Are your products authentic?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
      ],
    },
    warrantyFaq: {
      title: "Warranty & Support",
      items: [
        {
          id: 1,
          question: "Do your products come with a warranty?",
          answer:
            "Yes, bulk orders can be customized. Please use the enquiry form for details.",
        },
        {
          id: 2,
          question: "How do I contact customer service?",
          answer:
            "Minimal assembly is required. All tools and instructions are included.",
        },
      ],
    },
    moreFaq: {
      title: "Still have qeustions",
      description:
        "<p>We’re here to help! Contact our friendly customer support team anytime at <a href='mailto:support@yourdomain.com'>[support@yourdomain.com]</a> or call <a href='tel:+1-XXX-XXX-XXXX'>[+1-XXX-XXX-XXXX]</a>.</p>",
    },
  },
};

export default async function FaqsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={"FAQ"} />
      <FaqInfo locale={locale} data={local_data?.faqData} />
    </>
  );
}
