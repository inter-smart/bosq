import DeliveryInfo from "@/components/blocks/legal/delivery-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getDeliveryPolicyCms } from "@/lib/api/warrantyPolicy";

const local_data = {
  heroData: {
    title: "Delivery Policy",
    description: null,
  },

  deliveryData: {
    media: {
      type: "image",
      mobilePath: "/images/delivery-hero-1.jpg",
      desktopPath: "/images/delivery-hero-1.jpg",
      media_alt: "delivery-hero-1",
    },
    // title: "Fulfilment, Delivery & <br /> Installation",
    // description: "<p>Production & Delivery Times</p>",
    items: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/delivery-1.jpg",
          media_alt: "delivery-1",
        },
        title: "Fulfilment by BOSQ",
        description:
          "<p>Our fulfilment centre located in Sharjah, spanning over an area of 10,000 sq ft, is equipped to build the world’s best ergonomic office chairs and office furniture. The centre’s commitment to creating top-quality office furniture is evident in its state-of-the-art technology and skilled workforce. The manufacturing process adheres to strict quality control measures to ensure that every product is built to perfection.</p><p>The centre’s focus on ergonomic design ensures that the office chairs and furniture are aesthetically pleasing but also functional and comfortable. This design philosophy promotes healthy posture, reduces discomfort and fatigue, and improves productivity.</p><p>The fulfilment centre’s dedication to excellence has resulted in a growing customer base who trust its products. By combining cutting-edge technology with skilled craftsmanship, the centre continues to produce high-quality office furniture that exceeds customer expectations. For businesses in need of top-quality office furniture, the fulfilment centre in Sharjah is a perfect choice to reach everyone on time.</p>",
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/delivery-2.jpg",
          media_alt: "delivery-2",
        },
        title: "Delivery by BOSQ",
        description:
          "<p>Express delivery to the following provinces</p><ul><li>Sharjah (free delivery)</li><li>Dubai (free delivery)</li><li>Ajman (free delivery)</li><li>Abu Dhabi (40 AED delivery charge)</li><li>Ras Al Khaimah (40 AED delivery charge)</li><li>Fujairah (40 AED delivery charge)</li><li>Umm Al Quwain (40 AED delivery charge)</li><li>Al Ain (40 AED delivery charge)</li><li>Khor Fakkan (40 AED delivery charge)</li></ul><p>We strive to provide our customers with the best possible service, which includes delivering our top-quality office chairs within 2 to 3 days for standard orders and 3 to 4 working days for customised orders, ensuring that you can enjoy your new chairs as soon as possible. For corporate orders, we understand that order sizes may vary, and as such, we will procure the order according to its quantity, ensuring that all chairs are delivered on time and in excellent condition.</p>",
      },
      {
        id: 3,
        media: {
          type: "image",
          media_path: "/images/delivery-3.jpg",
          media_alt: "delivery-3",
        },
        title: "Installation by BOSQ",
        description:
          "<p>We offer two convenient installation methods to ensure a hassle-free experience for our customers.</p><ul><li>Our field agent installation involves our experienced team coming to your location and installing your new office chair quickly and efficiently.</li><li>For customers who require a simple and quick installation process, we offer a pre-fixed office chair that is carefully packaged and delivered to your location, ready for assembly.</li></ul><p>We take pride in our commitment to providing exceptional service, and our installation methods are just one of the many ways in which we make the furniture-buying process as easy and convenient as possible. Whether you choose our field agent or pre-fixing installation method, you can rest assured that your new office furniture will be installed with precision and care, ensuring that you can enjoy your new workspace to the fullest.</p>",
      },
    ],
  },

  deliveryInfo: {
    media: {
      type: "image",
      media_path: "/images/delivery-info-1.png",
      media_alt: "delivery-info-1",
    },
    title: "Now Delivering in and around UAE",
    description: "<h6>Production & Delivery Times</h6>",
    items: [
      {
        id: 1,
        media_path: "/images/return-spec-1.svg",
        title: "2-3 Days",
        description: "<p>All orders without Customization</p>",
      },
      {
        id: 2,
        media_path: "/images/return-spec-1.svg",
        title: "3-5 Days",
        description: "<p>Orders with customizations</p>",
      },
      {
        id: 3,
        media_path: "/images/return-spec-1.svg",
        title: "5-8 Days",
        description: "<p>Orders that are customized completely</p>",
      },
      {
        id: 4,
        media_path: "/images/return-spec-1.svg",
        title: "15-30 Days",
        description: "<p>Items that are procured perorder (bulk orders)</p>",
      },
      {
        id: 5,
        media_path: "/images/return-spec-1.svg",
        title: "30-45 Days",
        description:
          "<p>Fully customized items that are procured per order (bulk orders)</p>",
      },
    ],
  },
};

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
