import BlogHero from "@/components/blocks/blog/blog-hero";
import BlogList from "@/components/blocks/blog/blog-list";
import { getBlogsData } from "@/lib/api/blog";
import { notFound } from "next/navigation";


export default async function BlogsPage({params}) {
  const resolvedParams = await params;
  const {locale} = resolvedParams;

  let page = 1;
  let limit = 6;

  const { data, error } = await getBlogsData.getCmsData({ page, limit });

  if(error){
    notFound()
  }

  const { heroData, blogData } = data;

  return (
    <>
      <BlogHero locale={locale} data={heroData} slug={"Blogs"} />
      <BlogList locale={locale} initialData={blogData} limit={limit} />
    </>
  );
}