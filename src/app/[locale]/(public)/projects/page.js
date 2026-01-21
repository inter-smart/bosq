import ProductHero from "@/components/blocks/product/product-hero";
import ProjectHero from "@/components/blocks/project/project-hero";
import ProjectList from "@/components/blocks/project/project-list";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("projects", locale, "projects");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

const local_data = {
  heroData: {
    title: "Our Projects",
    description: null,
  },

  projectInfo: {
    media: {
      media_type: "video",
      mobile_path: "/videos/about-hero.mp4",
      desktop_path: "/videos/about-hero.mp4",
      media_alt: "projects-hero-1",
    },
    title: "Our Projects",
    description: "<p>Built in the UAE, Designed for the Future.</p>",
  },

  projectData: {
    categoryType: [
      "All",
      "Hospitality",
      "Workspace",
      "Workspace Healthcare",
      "Education",
    ],
    items: [
      {
        id: 1,
        media: {
          media_type: "image",
          media_path: "/images/project-item-1.jpg",
          media_alt: "project-item-1",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 2,
        media: {
          media_type: "image",
          media_path: "/images/project-item-2.jpg",
          media_alt: "project-item-2",
        },
        title: "Dawn  Ltd - Creative Workspace",
        slug: "/projects/wonderworld-office-space",
        category: "Workspace",
      },
      {
        id: 3,
        media: {
          media_type: "image",
          media_path: "/images/project-item-3.jpg",
          media_alt: "project-item-3",
        },
        title: "JOY  Accounts - Innovative Office Design",
        slug: "/projects/wonderworld-office-space",
        category: "Workspace Healthcare",
      },
      {
        id: 4,
        media: {
          media_type: "image",
          media_path: "/images/project-item-4.jpg",
          media_alt: "project-item-4",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Education",
      },
      {
        id: 5,
        media: {
          media_type: "image",
          media_path: "/images/project-item-5.jpg",
          media_alt: "project-item-5",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 6,
        media: {
          media_type: "image",
          media_path: "/images/project-item-6.jpg",
          media_alt: "project-item-6",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 7,
        media: {
          media_type: "image",
          media_path: "/images/project-item-1.jpg",
          media_alt: "project-item-1",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 8,
        media: {
          media_type: "image",
          media_path: "/images/project-item-2.jpg",
          media_alt: "project-item-2",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/projects/wonderworld-office-space",
        category: "Education",
      },
    ],
  },
};




export default async function ProjectsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"Our Projects"}
      />
      <ProjectHero locale={locale} data={local_data?.projectInfo} />
      <ProjectList locale={locale} data={local_data?.projectData} />
    </>
  );
}
