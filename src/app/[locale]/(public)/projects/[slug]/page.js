import HomeEnquiry from "@/components/blocks/home/home-enquiry";
import ProductHero from "@/components/blocks/product/product-hero";
import ProjectDetail from "@/components/blocks/project/project-detail";
import ProjectSolution from "@/components/blocks/project/project-solution";
import ProjectSpecialized from "@/components/blocks/project/project-specialized";
import { getProjectDetails } from "@/lib/api/CMS/basicGet";

import { getTranslations } from "next-intl/server";
import { DefaultOgImage } from "@/lib/api/constants";
import { parseOtherMeta } from "@/lib/helper";
import { notFound } from "next/navigation";



export async function generateMetadata({ params }) {
  const { slug, locale } = await params;




  try {
    const response = await fetch(
      `${process.env.API_URL}/api/frontend/projects/project-details?slug=${slug}`,
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const { data } = await response.json();





    const isEN = locale === "en";
    const metadata = data?.metaData;
    console.log("meta data:", data)

    const t = await getTranslations("common");

    if (!metadata) {
      return {
        title: t("not_found_title"),
        description: t("not_found_description"),
      };
    }

    const {
      meta_title,
      meta_description,
      meta_keywords,
      other_meta,
      meta_title_ar,
      meta_description_ar,
      meta_keywords_ar,
      other_meta_ar,
    } = metadata;

    // Select language-specific metadata
    const title = isEN ? meta_title : meta_title_ar;
    const description = isEN ? meta_description : meta_description_ar;
    const keywords = isEN ? meta_keywords : meta_keywords_ar;

    // Use project's own image or fallback
    const ogImage = DefaultOgImage;
    const { other } = isEN
      ? parseOtherMeta(other_meta)
      : parseOtherMeta(other_meta_ar);


    console.log("Metadata for project detail:", title)
    return {
      title: title,
      description: description,
      keywords: keywords,

      openGraph: {
        title: title,
        description: description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: t("image_alt"),
          },
        ],
        type: "article",
        authors: undefined,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects/project-details/${slug}`,
        locale: isEN ? "en_US" : "ar_AR",
      },

      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImage],
      },

      other: {
        ...other,
      },

      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects/project-details/${slug}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/projects/project-details/${slug}`,
          ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/projects/project-details/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
}

const local_data = {
  heroData: {
    title: "Wonderworld Ltd - Office Space, UAE",
    description: null,
  },
  projectData: {
    year: "2025",
    location: "Dubai, UAE",
    category: "Corporate Headquaters",
    media: {
      type: "image",
      mobile_path: "/images/projects-hero-1.jpg",
      desktop_path: "/images/projects-hero-1.jpg",
      media_alt: "projects-hero-1",
    },
    title: "Wonderworld Ltd - Office Space, UAE",
    description:
      "<p>The Commons represents a new paradigm in workplace design, combining flexible collaboration spaces with private work areas. This 15,000 sq ft headquarters features BOSQ's complete ergonomic furniture solution, designed to support 200+ employees across multiple departments.</p><p>Our comprehensive approach included custom executive suites, open collaboration zones, meeting rooms, and specialized areas for different work styles. Every piece of furniture was selected and configured to promote employee wellbeing and productivity.</p>",
    projectInfo: [
      {
        id: 1,
        title: "Project Size",
        description: "15,000 sq ft",
      },
      {
        id: 2,
        title: "Workstations",
        description: "200+ Employees",
      },
      {
        id: 3,
        title: "Completion",
        description: "March 2025",
      },
      {
        id: 4,
        title: "Timeline",
        description: "8 Weeks",
      },
    ],
    projectGallery: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-1.jpg",
          media_alt: "projects-gallery-1",
        },
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-2.jpg",
          media_alt: "projects-gallery-2",
        },
      },
      {
        id: 4,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-2.jpg",
          media_alt: "projects-gallery-2",
        },
      },
    ],
  },
  solutionData: {
    media: {
      media_type: "image",
      media_path: "/images/project-solution-1.jpg",
      media_alt: "project-solution-1",
    },
    title: "The BOSQ Solution",
    description:
      "<p>Our integrated approach to The Commons project encompassed every aspect of the workspace environment. From initial space planning to final installation, we provided a comprehensive solution that addressed both aesthetic and functional requirements.</p><p>The result is a workspace that not only looks exceptional but performs at the highest level, supporting employee productivity and wellbeing through thoughtful ergonomic design.</p><ul><li>Custom space planning and layout optimization</li><li>Ergonomic furniture selection and configuration</li><li>Professional installation and project management</li><li>Ongoing support and maintenance services</li></ul>",
  },
  specializedAreasData: {
    title: "Specialized Areas",
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
    ],
  },
  enquiryData: {
    media: {
      media_type: "image",
      media_path: "/images/home-enquiry-1.jpg",
      media_alt: "home-enquiry-1",
    },
    title: "Let's Get in Touch",
    description:
      "<p>Let's work together to find the most effective solution for your business.</p>",
    button: null,
  },
};

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const { data, error } = await getProjectDetails({ slug });



  if (error || !data) {
    return notFound();
  }

  const {
    heroData,
    cmsData,
    projectData,
    solutionData,
    specializedAreasData,
    enquiryData,
  } = data;

  const isEn = locale === "en";
  const slugData = locale === "en" ? "Project" : "تفاصيل المشروع";




  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={heroData?.title}
        slugData={slugData}
        type="project"
      />
      <ProjectDetail
        locale={locale}
        data={local_data?.projectData}
        projectData={projectData}
      />
      <ProjectSolution locale={locale} data={solutionData} />

      {specializedAreasData?.items?.length > 0 && (
        <ProjectSpecialized locale={locale} data={specializedAreasData} />
      )}

      <HomeEnquiry
        isEN={isEn}
        locale={locale}
        data={enquiryData}
        projectId={projectData?.id}
        type={"project"}
      />
    </>
  );
}
