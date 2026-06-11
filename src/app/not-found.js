import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";



const local_data = {
  title: "Oops! Page not found",
  description:
    "<p>We're sorry, but the page you are looking for doesn't exist or has been moved. We apologize for the inconvenience!</p>",
  ctaText: "View Product",
};

export default async function NotFound({ params }) {
  
  const t = await getTranslations("page_not_found");

  const locale = params?.locale || "en";
  return (
    <div className="w-full py-12 sm:py-20 xl:py-40 2xl:py-60 h-screen flex items-center justify-center">
      <div className="container">
        <div className="w-full max-w-[320px] sm:max-w-[368px] xl:max-w-[400px] 2xl:max-w-[600px] mx-auto flex flex-col">
          <Heading
            as="h2"
            size="heading1"
            className="text-center text-black mb-2 xl:mb-3"
          >
            {t("title")}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                locale === "ar"
                  ? "-translate-x-1 xl:-translate-x-2 "
                  : "translate-x-1 xl:translate-x-2 "
              )}
            />
          </Heading>
          <Text
            as="div"
            size="text1"
            className="text-center text-[#282828] mb-4 xl:mb-6"
          >
            {t("description")}
          </Text>
          <Button
            variant={"black"}
            disabled={false}
            className="min-w-[168px] xl:min-w-[190px] 2xl:min-w-[220px] mx-auto"
            asChild
          >
            <Link href={`/${locale}`}>{t("ctaText")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
