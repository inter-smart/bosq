import ProductHero from "@/components/blocks/product/product-hero";
import NotFound from "../not-found/page";
import MaterialInfoSection from "@/components/blocks/material-guide/Material-info-section";
import { getMaterialData } from "@/lib/api/CMS/basicGet";

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
              "<p>Aniline leather is one of the most luxurious and sought-after types of leather in the world. It is treated with a transparent aniline dye, which results in a soft and supple finish that retains the natural texture and beauty of the leather. Aniline leather is known for its softness, natural look, breathability, aging, and durability. It is also breathable and ages beautifully, developing a unique patina over time. With proper care, aniline leather is long-lasting and can be enjoyed for many years. Due to its comfort and high-quality finish, aniline leather is often used in high-end furniture and fashion industries.</p> <ul><li><span>Softness:</span>Aniline leather is known for its softness and luxurious feel. It is often used in high-end furniture and fashion because of its comfort.</li><li><span>Natural look:</span>Aniline leather retains the natural look and texture of the animal hide, making each piece unique.</li><li><span>Breathability:</span>Aniline leather is breathable, which means it won’t trap heat or moisture. This makes it comfortable to sit on for long periods of time.</li><li><span>Aging:</span>Aniline leather ages beautifully, developing a unique patina over time. This adds character and charm to the leather.</li><li><span>Durability:</span>Despite its softness, aniline leather is durable and long-lasting. With proper care, it can last for many years.</li></ul>",
            media: {
              type: "image",
              path: "/images/material-guide-list-1.jpg",
              alt: "/images/material-guide-list-1.jpg",
            },
            icon: {
              type: "image",
              path: "/images/material-guide-icon-1.png",
              alt: "/images/material-guide-icon-1.png",
            },
          },
          {
            title: "PU Leather",
            description:
              "<p>PU leather, or polyurethane leather, is a synthetic alternative to genuine leather. It is made by coating a base material, such as polyester or cotton, with a layer of polyurethane. This results in a material that is durable, water-resistant, and easy to customize. PU leather is a popular choice for furniture upholstery, clothing, and accessories because it is less expensive than genuine leather and comes in a wide range of colors and textures. Additionally, it is resistant to scratches and stains, and retains its shape and color over time, making it a practical and stylish choice for many applications.</p><ul><li><span>Durability :</span>PU leather is highly durable and resistant to wear and tear, making it a good choice for items that are frequently used.</li><li><span>Water resistance : </span>PU leather is water-resistant, making it easy to clean and maintain. It is also less likely to develop water stains or damage.</li><li><span>Wide range of colors and finishes : </span>PU leather is available in a wide range of colors and finishes, making it easy to customize and match to specific needs.</li><li><span>Aging:</span>Aniline leather ages beautifully, developing a unique patina over time. This adds character and charm to the leather.</li><li><span>Scratch and stain resistance :</span>PU leather is resistant to scratches and stains, making it ideal for use in high-traffic areas or for items that are frequently handled.</li></ul>",
            media: {
              type: "image",
              path: "/images/material-guide-list-2.jpg",
              alt: "/images/material-guide-list-2.jpg",
            },
            icon: {
              type: "image",
              path: "/images/material-guide-icon-2.png",
              alt: "/images/material-guide-icon-2.png",
            },
          },
        ],
      },
      {
        id: 2,
        title: "Fabric & MESH used",
        info_list: [
          {
            title: "Imported Fabric",
            description:
              "<p>The upholstery of an office chair is an important consideration for both comfort and aesthetics. Most office chairs feature either fabric or leather upholstery, each with its own benefits. Our fabric upholstery tends to be more breathable and comfortable in warm weather, and it comes in a wide range of colors and patterns to match any office decor. We make sure it is durable and easy to clean, as office chairs are subject to frequent use and spills.</p>",
            media: {
              type: "image",
              path: "/images/material-guide-list-3.jpg",
              alt: "/images/material-guide-list-3.jpg",
            },
            icon: {
              type: "image",
              path: "/images/material-guide-icon-3.png",
              alt: "/images/material-guide-icon-3.png",
            },
          },
          {
            title: "Mesh Used",
            description:
              "<p>Our mesh material used in the office chairs are designed with a breathable, high tensile poly plastic which is extremely durable and viscose in nature thus allowing a net-like material that is stretched over the frame of the chair. This type of material is especially suited for warmer environments or for individuals who tend to sweat when seated for prolonged periods. The mesh material allows air to circulate freely, keeping the user’s back and seat cool and dry. Mesh office chairs also provide good ergonomic support, as the material contours to the user’s body, reducing pressure points and promoting better posture. Additionally, mesh chairs are lightweight and easy to move, making them an ideal choice for home offices or multi-purpose workspaces.</p>",
            media: {
              type: "image",
              path: "/images/material-guide-list-4.jpg",
              alt: "/images/material-guide-list-4.jpg",
            },
            icon: {
              type: "image",
              path: "/images/material-guide-icon-4.png",
              alt: "/images/material-guide-icon-4.png",
            },
          },
        ],
      },
      {
        id: 3,
        title: null,
        info_list: [
          {
            title: "Moulded Foam",
            description:
              "<p>The innovative 35-density, high-dense semi-combined memory foam seats are designed specifically for ergonomic office chairs. This cutting-edge material combines optimal density with superior comfort, offering exceptional support and pressure relief. Its semi-combined structure promotes airflow, keeping you cool and comfortable during long work hours. With its remarkable ability to contour to your body, this memory foam ensures proper alignment and reduces the risk of discomfort or fatigue, allowing for maximum productivity and well-being.</p>",
            media: {
              type: "image",
              path: "/images/material-guide-list-5.jpg",
              alt: "/images/material-guide-list-5.jpg",
            },
            icon: {
              type: "image",
              path: "/images/material-guide-icon-5.png",
              alt: "/images/material-guide-icon-5.png",
            },
          },
          {
            title: "Gas Lift",
            description:
              "<p>Our gas lift mechanism is the essential component of our office chair, allowing users to adjust the height of the chair according to their needs. High quality gas lift mechanisms are designed with durability and stability in mind, providing a smooth, effortless adjustment process that ensures the user’s comfort and safety. Our mechanisms are made with high-quality materials such as steel or aluminium, ensuring they can withstand the weight of the user and the constant adjustments made to the chair’s height.</p>",
            media: {
              type: "image",
              path: "/images/material-guide-list-6.jpg",
              alt: "/images/material-guide-list-6.jpg",
            },
            icon: null,
          },
        ],
      },
    ],
  },
};

export default async function MaterialGuidePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const {data} = await getMaterialData();
  const { heroData, materialsInfo, extraMaterialsInfo } = data;

  const slug = locale === "en"? "Material Guide" : "سياسة الخصوصية";

  if(!data){
    <NotFound />
  }


  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <MaterialInfoSection
        locale={locale}
        data={materialsInfo}
        extraMaterialsInfo={extraMaterialsInfo}
      />
    </>
  );
}