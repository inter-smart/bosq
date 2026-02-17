import ProductHero from "@/components/blocks/product/product-hero";
import ProjectHero from "@/components/blocks/project/project-hero";
import ProjectList from "@/components/blocks/project/project-list";
import { getProjectData, getProjectListBySlug } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";

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





export default async function ProjectsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { locale } = resolvedParams;
  const slug = resolvedSearchParams.slug ?? "all";
  const limit = resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit) : 6;
  const { data, error } = await getProjectData();

  if (error) {
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
      <ProjectList locale={locale} data={data?.projectCategories} slug={slug} limit={limit} />
    </>
  );
}
