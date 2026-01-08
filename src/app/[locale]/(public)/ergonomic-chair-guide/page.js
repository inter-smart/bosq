import ErgonomicChairSection from "@/components/blocks/ergonomic-chair-guide/ErgonomicChairSection";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Ergonomic Chair Guide",
    description: null,
  },
  ergonomic_chair_data: {
    media: {
      type: "image",
      mobilePath: "/images/ergonomic-chair-hero.jpg",
      desktopPath: "/images/ergonomic-chair-hero.jpg",
      media_alt: "ergonomic-chair-hero",
    },
    title:
      "Ergonomic Chairs <br> Essential Features for Healthy <br> and Comfortable Sitting",
    description: null,
    chair_info_list: [
      {
        id: 1,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-1.png",
          alt: "/images/ergonomic-chair-list-1",
        },
        title: "Standard tilt Mechanism",
        description: `<p>Our synchro-tilt mechanism or standard-tilt mechanism is a crucial feature of modern ergonomic office chairs that allows for greater customization and comfort during prolonged periods of sitting. This mechanism is designed to synchronize the movement of the seat and backrest, ensuring that both move in harmony with each other. This helps to maintain a comfortable and ergonomic posture, even when shifting positions throughout the day. Additionally, the synchro-tilt mechanism typically includes a tension adjustment knob that allows the user to adjust the resistance of the backrest when reclining, providing greater control over the chair’s movement. This feature is particularly beneficial for those who spend long hours sitting at their desk, as it can help to reduce strain and discomfort in the back, neck, and shoulders.</p>`,
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-2.png",
          alt: "/images/ergonomic-chair-list-2",
        },
        title: "Multi lock tilt mechanism",
        description: `<p>Our multi-lock office chair mechanism allows you to adjust the chair’s position and lock it in place. This mechanism typically includes a lever or button that can be used to adjust the height of the chair, as well as other settings like tilt and recline. The multi-lock feature allows the user to lock the chair in various positions, providing greater comfort and support throughout the workday. This type of office chair mechanism adds to the ergonomic features of our product line.</p>`,
      },
      {
        id: 3,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-3.png",
          alt: "/images/ergonomic-chair-list-3",
        },
        title: "High Gauge Aluminium Base / High Density Nylon Base",
        description: `<p>Our chair base is an important component of any ergonomic office chair, and the nylon and aluminium base is a popular choice for its durability and strength. The agility of nylon and raw gauge of aluminium makes for a sturdy and long-lasting base option that can support a variety of users. </p><p>Nylon is known for its resistance to wear and tear, making it a great choice for high-traffic areas. Aluminum, on the other hand, is strong and corrosion-resistant, making it ideal for commercial use. Together, these materials make for a chair base that is not only functional but also aesthetically pleasing, adding a modern touch to any workspace.</p>`,
      },
      {
        id: 4,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-4.png",
          alt: "/images/ergonomic-chair-list-4",
        },
        title: "Adjustable LUMBAR support",
        description: `<p>One of the most important factors in choosing an ergonomic chair is adjustable lumbar support. These chairs are extremely helpful for people who spend the majority of their work day at a desk. People who perform most of their tasks on a computer can especially benefit from chairs that provide proper support for their backs.The lumbar support should fit right in the natural curve of your spine, typically at the small of your back directly above your belt line. This adjustment is often built into the chair so you can adjust both the height of the chair back and the lumbar support at the same time. In some chairs, it’s an independent adjustment.</p>`,
      },
      {
        id: 5,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-5.png",
          alt: "/images/ergonomic-chair-list-5",
        },
        title: "Seat Pan Depth Adjustment",
        description: `<p>A seat pan with a sliding mechanism is a beneficial feature. This allows small and tall users to adjust the distance of the seat pan from the backrest. A person of smaller stature who sits on a long seat pan will experience pressure behind the knees, or will not benefit from the chair’s back support if he sits on the edge of the chair. A person of larger stature who sits on a short seat-pan length will have inadequate support of the thighs causing higher contact pressure</p>`,
      },
      {
        id: 6,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-6.png",
          alt: "/images/ergonomic-chair-list-6",
        },
        title: "Class 4 Gas lift",
        description: `<p>Our gas lift mechanism is the essential component of our office chair, allowing users to adjust the height of the chair according to their needs. High-quality gas lift mechanisms are designed with durability and stability in mind, providing a smooth, effortless adjustment process that ensures the user’s comfort and safety. Our mechanisms are made with high-quality materials such as steel or aluminum, ensuring they can withstand the weight of the user and the constant adjustments made to the chair’s height</p>`,
      },
      {
        id: 7,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-7.png",
          alt: "/images/ergonomic-chair-list-7",
        },
        title: "Armrest Adjustment",
        description: `<p>Armrest height is one of the most common ergonomic chair adjustments. The armrest adjustment can help with upper back. This is usually controlled by a push of a button or a simple knob, allowing to tilt the armrests inwards or outwards to varying degrees until it is adjusted to a comfortable position. The chairs’ armrest are adjustable in 1D, 2D, 3D and 4D which allows sitting close and working with arms relaxed.</p>`,
      },
      {
        id: 8,
        media: {
          type: "image",
          path: "/images/ergonomic-chair-list-8.png",
          alt: "/images/ergonomic-chair-list-8",
        },
        title: "Headrest Adjustment",
        description: `<p>Headrest adjustments provide support and comfort to the head and neck while in a reclined position, often keeping the head at a near-constant eye level with your computer monitor. The headrests are usually adjustable in height and angel to help head centered on the neck, not leaning forward.</p>`,
      },
    ],
  },
};

export default async function ErgonomicChairPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Material Guide"}
      />
      <ErgonomicChairSection
        locale={locale}
        data={local_data?.ergonomic_chair_data}
      />
    </>
  );
}
