import { ProductData } from "@/lib/api/products/ResourcesApi";
import SearchDialog from "../search-dialog";
import { notFound } from "next/navigation";

export default async function SearchPage() {
  const { data, error } = await ProductData.getSearchSectionSections();

  if (error) {
    return notFound();
  }

  return (
    <>
      <SearchDialog locale={locale} data={data} />
    </>
  );
}
