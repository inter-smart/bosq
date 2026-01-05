import MaterialInfoSection from "@/components/blocks/material-guide/Material-info-section";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "Material Guide",
    description: null,
  },
  material_info_data: {
    media: {
      type: "image",
      mobilePath: "/images/material-guide-hero.jpg",
      desktopPath: "/images/material-guide-hero.jpg",
      media_alt: "material-guide-hero",
    },
    title:
      "Know Everything About the <br> Materials that are Used to <br> Build the Perfect Ergonomic <br> Chair ",
    description: null,
    items: [
      {
        id: 1,
        title: "Leather used",
        info_list: [
          {
            title: "Aniline Leather",
            description:
              "<p>Aniline leather is one of the most luxurious and sought-after types of leather in the world. It is treated with a transparent aniline dye, which results in a soft and supple finish that retains the natural texture and beauty of the leather. Aniline leather is known for its softness, natural look, breathability, aging, and durability. It is also breathable and ages beautifully, developing a unique patina over time. With proper care, aniline leather is long-lasting and can be enjoyed for many years. Due to its comfort and high-quality finish, aniline leather is often used in high-end furniture and fashion industries.</p> <ul><li><span>Softness:</span>Aniline leather is known for its softness and luxurious feel. It is often used in high-end furniture and fashion because of its comfort.</li><li><span>Natural look:</span>Aniline leather retains the natural look and texture of the animal hide, making each piece unique.</li><li><span>Breathability:</span>Aniline leather is breathable, which means it won’t trap heat or moisture. This makes it comfortable to sit on for long periods of time.</li><li><span>Aging:</span>Aniline leather ages beautifully, developing a unique patina over time. This adds character and charm to the leather. </li><li><span>Durability:</span>Despite its softness, aniline leather is durable and long-lasting. With proper care, it can last for many years.</li></ul>",
            media: {
              type: "image",
              path: "/images/material-guide-list-1.jpg",
              alt: "/images/material-guide-list-1.jpg",
            },
          },
          {
            title: "PU Leather",
            description:
              "<p>Aniline leather is one of the most luxurious and sought-after types of leather in the world. It is treated with a transparent aniline dye, which results in a soft and supple finish that retains the natural texture and beauty of the leather. Aniline leather is known for its softness, natural look, breathability, aging, and durability. It is also breathable and ages beautifully, developing a unique patina over time. With proper care, aniline leather is long-lasting and can be enjoyed for many years. Due to its comfort and high-quality finish, aniline leather is often used in high-end furniture and fashion industries.</p> <ul><li><span>Softness:</span>Aniline leather is known for its softness and luxurious feel. It is often used in high-end furniture and fashion because of its comfort.</li><li><span>Natural look:</span>Aniline leather retains the natural look and texture of the animal hide, making each piece unique.</li><li><span>Breathability:</span>Aniline leather is breathable, which means it won’t trap heat or moisture. This makes it comfortable to sit on for long periods of time.</li><li><span>Aging:</span>Aniline leather ages beautifully, developing a unique patina over time. This adds character and charm to the leather. </li><li><span>Durability:</span>Despite its softness, aniline leather is durable and long-lasting. With proper care, it can last for many years.</li></ul>",
            media: {
              type: "image",
              path: "/images/material-guide-list-2.jpg",
              alt: "/images/material-guide-list-2.jpg",
            },
          },
        ],
      },
    ],
  },
};

export default function page() {
  const locale = "en";
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Material Guide"}
      />
      <MaterialInfoSection
        locale={locale}
        data={local_data?.material_info_data}
      />
    </>
  );
}
