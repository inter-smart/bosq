import ProductHero from "@/components/blocks/product/product-hero";
import ProjectHero from "@/components/blocks/project/project-hero";
import ProjectList from "@/components/blocks/project/project-list";
import { getProjectData, getProjectListBySlug } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found/page";

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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
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
        slug: "/en/projects/wonderworld-office-space",
        category: "Education",
      },
    ],
  },
};




export default async function ProjectsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { locale } = resolvedParams;
  const slug = resolvedSearchParams.slug ?? "all";

  const {data, error} = await getProjectData();

  if(error){
    <NotFound />
  }
  
  return (
    <>
      <ProductHero
        locale={locale}
        data={data?.heroData}
        slug={"Our Projects"}
      />
      <ProjectHero locale={locale} data={data?.projectInfo} />
      <ProjectList locale={locale} data={data?.projectCategories}  slug={slug}/>
    </>
  );
}
