import { getProjectListBySlug } from "@/lib/api/CMS/basicGet";
import ProjectClient from "./project-client";
import NotFound from "@/app/[locale]/(public)/not-found/page";

export default async function ProjectList({ locale, data, slug }) {
  const { data: projects, error } = await getProjectListBySlug({ slug });

  if (error) {
    <NotFound />;
  }

  return (
    <>
      <ProjectClient locale={locale} data={data} projects={projects} slug={slug} />
    </>
  );
}
