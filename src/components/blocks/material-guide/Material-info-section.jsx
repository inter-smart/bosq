import Image from "next/image";
import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import MaterialsList from "./materialsList";

export default function MaterialInfoSection({
  data,
  locale,
  extraMaterialsInfo,
}) {

    const isEn = locale === "en";

  return (
    <section className="w-full h-auto pt-2.5 sm:pt-3.75 xl:pt-5 2xl:pt-7.5 block">
      <div className="w-full aspect-6/5 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <picture className="absolute -z-2 inset-0 opacity-95">
          <source media="(max-width: 640px)" srcSet={data?.media?.mobilePath} />
          <Image
            src={data?.media?.desktopPath}
            alt={isEn ? data?.media?.media_alt : data?.media?.media_alt_ar}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
            className="-z-2 object-cover"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
          />
        </picture>
        <div className="container">
          <div className="w-full xl:max-w-1/2 py-15 xl:py-20 2xl:py-25">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEn ? data?.title : data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
          </div>
        </div>
      </div>

      <MaterialsList
        data={data}
        locale={locale}
        extraMaterialsInfo={extraMaterialsInfo}
      />
    </section>
  );
}
