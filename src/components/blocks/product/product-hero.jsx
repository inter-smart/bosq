import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";

export default function ProductHero({ data, locale, slug, link }) {
  const isEn = locale === "en";

  return (
    <section className="w-full pt-[calc(var(--header-y)_+_20px)] sm:pt-[calc(var(--header-y)_+_10px)] pb-1 sm:pb-2.5">
      <div className="container">
        <Breadcrumb className="mb-1 xl:mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}`}>
                {isEn ? "Home" : "بيت"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem> */}
            {slug && (
              <BreadcrumbItem>
                {link ? (
                  <BreadcrumbLink href={`/${locale}${link}`}>
                    {slug}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={"capitalize"}>
                    {slug}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {(data?.title || data?.title_ar) && (
          <Heading as="h2" size="heading6" className="line-clamp-2 text-black">
            {parse(isEn ? data?.title : data?.title_ar)}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                locale === "ar"
                  ? "-translate-x-1 xl:-translate-x-2 "
                  : "translate-x-1 xl:translate-x-2 "
              )}
            />
          </Heading>
        )}

        {data?.description && (
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={cn("typography", "[--text-color:#282828]")}
          >
            {parse(isEn ? data?.description : data?.description_ar)}
          </div>
        )}
      </div>
    </section>
  );
}
