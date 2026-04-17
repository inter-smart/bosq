import { ProductData } from "@/lib/api/products/ResourcesApi";
import SearchDialog from "../search-dialog";

export default async function SearchPage() {
  const { data } = await ProductData.getSearchSectionSections();

  if (error) {
    NotFound();
  }

  return (
    <>
      <SearchDialog locale={locale} data={data} />
    </>
  );
}
