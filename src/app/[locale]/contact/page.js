import CartHero from "@/components/blocks/cart/cart-hero";
import ContactInfo from "@/components/blocks/contact/contact-info";

const local_data = {
  heroData: {
    title: "Get in Touch",
    description: null,
  },
  contactData: {
    media: {
      type: "image",
      path: "/images/contact-1.jpg",
      alt: "contact-1",
    },
    title:
      "Bosq is your partner in innovative, high-quality commercial furniture design and fitout solutions.",
    description:
      "<p>If you're ready to create something extraordinary together, simply fill in the form below and our team will be in touch.</p> ",
    formData: {
      title: "Start your Solution with BOSQ",
      description:
        "<p>Experience Customer Support Like No Other. We Are Just An Email Away.</p>",
    },
    contactMethods: [
      {
        id: 1,
        type: "email",
        label: "email",
        value: ["info@bosq.ae", "support@bosq.ae"],
      },
      {
        id: 2,
        type: "phone",
        label: "call center",
        value: ["+971 56 503 6378", "+971 56 503 6379"],
      },
      {
        id: 3,
        type: "address",
        label: "our location",
        value: [
          "<p>57F5+3R - Al Meydan Rd - Al Quoz - Al Quoz 1 - Dubai - United Arab Emirates</p>",
        ],
      },
    ],
    map: {
      latitude: 40.7128,
      longitude: -74.006,
      embedUrl: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE",
    },
    socialMedia: [
      {
        id: 1,
        label: "facebook",
        url: "https://facebook.com/company",
        icon: "/images/social-1.svg",
      },
      {
        id: 2,
        label: "twitter",
        url: "https://twitter.com/company",
        icon: "/images/social-2.svg",
      },
      {
        id: 3,
        label: "linkedin",
        url: "https://linkedin.com/company/company",
        icon: "/images/social-3.svg",
      },
      {
        id: 4,
        label: "instagram",
        url: "https://instagram.com/company",
        icon: "/images/social-4.svg",
      },
    ],

    //   sections: [
    //     {
    //       id: "contact-form",
    //       type: "form",
    //       data: {
    //         heading: "Send Us a Message",
    //         formFields: [
    //           {
    //             id: "field-1",
    //             name: "name",
    //             label: "Full Name",
    //             type: "text",
    //             required: true,
    //           },
    //           {
    //             id: "field-2",
    //             name: "email",
    //             label: "Email",
    //             type: "email",
    //             required: true,
    //           },
    //           {
    //             id: "field-3",
    //             name: "subject",
    //             label: "Subject",
    //             type: "text",
    //             required: true,
    //           },
    //           {
    //             id: "field-4",
    //             name: "message",
    //             label: "Message",
    //             type: "textarea",
    //             required: true,
    //           },
    //         ],
    //         submitEndpoint: "/api/forms/contact",
    //       },
    //     },
    //   ],
  },
};

export default async function ContactPage({params}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <CartHero locale={locale} data={local_data?.heroData} slug={"contact"} />
      <ContactInfo locale={locale} data={local_data?.contactData} />
    </>
  );
}
