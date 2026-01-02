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
import { Text } from "@/components/utils/text";

export default function ProductHero({ data, locale, slug }) {
  return (
    <section className="w-full pt-[calc(var(--header-y)_+_20px)] sm:pt-[calc(var(--header-y)_+_10px)] pb-1 sm:pb-2.5">
      <div className="container">
        <Breadcrumb className="mb-1 xl:mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem> */}
            {slug && (
              <BreadcrumbItem>
                <BreadcrumbPage className={"capitalize"}>{slug}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {data?.title && (
          <Heading as="h2" size="heading1" className="line-clamp-2 text-black">
            {parse(data?.title)}
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
            {parse(data?.description)}
          </div>
        )}
      </div>
    </section>
  );
}
