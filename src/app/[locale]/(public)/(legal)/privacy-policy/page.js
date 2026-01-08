import PrivacyInfo from "@/components/blocks/legal/privacy-info";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Privacy Policy",
    description:
      "<p>Your Data, Your Comfort: Ensuring Privacy with Bosq Ergonomic Living.</p>",
  },
  privacyPolicyData: {
    categories: [
      {
        id: 1,
        title: "Information Gathered by Bosq.ae",
        title_ar: "المعلومات التي يجمعها Bosq.ae",
        description: `
      <h6>Anonymous Data Collection</h6>
      <p>Bosq.ae collects certain anonymous data related to your interaction with the website. This data, which does not identify users personally, either independently or when combined with other information, is gathered to improve website performance and enhance the user experience.</p>
      <p>Anonymous data may include:</p>
      <ul>
        <li>Browser type and version</li>
        <li>Duration of your visit to the website</li>
      </ul>

      <h6>Personal Information Collection</h6>
      <p>You may be asked to provide personally identifiable information when you interact with Bosq.ae, such as:</p>
      <ul>
        <li>Name</li>
        <li>Address</li>
        <li>Phone number</li>
        <li>Email address</li>
      </ul>
      <p>This information may be collected when you send feedback, register for services, or make purchases through the website. Providing such information is entirely optional.</p>

      <p>Actions on certain forms used in your browser, cookies, and other website functionality may also require personal information.</p>

      <p>Personally identifiable information collected by Bosq.ae is used exclusively for the purpose for which it was collected. Any aggregated data, not personally identifiable, may be used to improve website performance and analyze user trends.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 2,
        title: "Cookies",
        title_ar: "ملفات تعريف الارتباط",
        description: `
      <p>Our website uses cookies for personalization and feedback. We may publish user sessions or other identifying information with user permission.</p>
      <p>Cookies may collect information:</p>
      <ul>
        <li>To maintain user sessions</li>
        <li>To enhance website functionality</li>
      </ul>
      <p>In certain cases, we may disclose personal identifiable information in response to legal requests such as subpoenas or court orders, or to protect the security and integrity of our services.</p>
      <p>You can disable cookies through your browser settings; however, some website features may not function properly.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 3,
        title: "Third-Party Websites",
        title_ar: "مواقع الطرف الثالث",
        description: `
      <p>Bosq.ae is not responsible for the privacy policies or content of third-party websites linked from our site. These websites operate independently.</p>
      <p>We strongly recommend reviewing the privacy policies of any third-party websites before providing personal information.</p>
      <p>Bosq.ae has no control over or responsibility for information collected by third parties.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 4,
        title: "Use and Disclosure of Information",
        title_ar: "استخدام والإفصاح عن المعلومات",
        description: `
      <p>The information we collect is used to:</p>
      <ul>
        <li>Process orders</li>
        <li>Notify you about products, services, or special offers</li>
        <li>Provide customer support</li>
        <li>Improve the quality of our services</li>
      </ul>

      <p>We may share information:</p>
      <ul>
        <li>With delivery companies</li>
        <li>With payment processing partners</li>
        <li>With service providers assisting our operations</li>
      </ul>

      <p>All shared data is limited and strictly used for service fulfillment.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 5,
        title: "Corrections & Updates",
        title_ar: "التصحيحات والتحديثات",
        description: `
      <p>If you wish to modify or update the personal information Bosq.ae has received, please contact us at info@bosq.ae.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 6,
        title: "Security",
        title_ar: "الأمان",
        description: `
      <p>Bosq.ae implements reasonable security measures to protect personal information, including technical and organizational safeguards.</p>
      <p>However, no method of transmission over the internet or electronic storage is completely secure, and absolute security cannot be guaranteed.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },

      {
        id: 7,
        title: "Modifications to the Privacy Policy",
        title_ar: "تعديلات سياسة الخصوصية",
        description: `
      <p>Bosq.ae reserves the right to modify this Privacy Policy at any time to reflect changes in regulations or standards.</p>
      <p>Any updates will be posted on this page, and continued use of the website constitutes acceptance of the revised policy.</p>
    `,
        description_ar: "<h6>سيتم توفير الترجمة العربية لاحقاً</h6>",
      },
    ],
  },
};

export default async function PrivacyPolicyPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Privacy Policy"}
      />
      <PrivacyInfo locale={locale} data={local_data?.privacyPolicyData} />
    </>
  );
}
