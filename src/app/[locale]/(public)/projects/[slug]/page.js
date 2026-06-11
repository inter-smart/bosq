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
