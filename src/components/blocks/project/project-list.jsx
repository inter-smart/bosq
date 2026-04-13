import { getProjectListBySlug } from "@/lib/api/CMS/basicGet";
import ProjectClient from "./project-client";
import NotFound from "@/app/[locale]/(public)/not-found";

export default async function ProjectList({ locale, data, slug, limit }) {
  const { data: projects, error } = await getProjectListBySlug({ slug, limit });

  const { totalItems } = projects

  if (error) {
    return <NotFound params={{ locale }} />;
  }

  return (
    <>
      <ProjectClient locale={locale} data={data} projects={projects?.projects} slug={slug} totalItems={totalItems} currentLimit={limit} />
    </>
  );
}
