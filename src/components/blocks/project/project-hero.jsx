import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import { Text } from "@/components/utils/text";

export default function ProjectHero({ locale, data }) {
  
  const isEN = locale === "en";

  return (
    <section className="w-full block">
      <div className="w-full aspect-6/4 sm:aspect-1920/740 overflow-hidden bg-black flex items-center mt-[10px] sm:mt-[15px] xl:mt-[20px] 2xl:mt-[30px] relative z-0">
        {data?.media?.media_type === "video" ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute -z-2 inset-0 opacity-80 block sm:hidden"
            >
              <source src={isEN ? data?.media?.mobile_path: data?.media?.mobile_path_ar} type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute -z-2 inset-0 opacity-80 hidden sm:block"
            >
              <source src={isEN ? data?.media?.desktop_path: data?.media?.desktop_path_ar} type="video/mp4" />
            </video>
          </>
        ) : (
          <picture className="absolute -z-2 inset-0 opacity-95">
            <source
              media="(max-width: 640px)"
              srcSet={isEN ? data?.media?.mobile_path: data?.media?.mobile_path_ar}
            />
            <Image
              src={isEN ? data?.media?.desktop_path: data?.media?.desktop_path_ar}
              alt={isEN? data?.media?.media_alt: data?.media?.media_alt_ar}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-2 object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              quality={90}
            />
          </picture>
        )}
        <div className="container">
          <div className="w-full sm:max-w-1/2 xl:max-w-[468px] 2xl:max-w-[576px] 2xl:max-w-[676px] py-[60px] xl:py-[80px] 2xl:py-[100px]">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEN? data?.title: data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
            <Text as="div" size="text1" className="text-white">
              {parse(isEN? data?.description: data?.description_ar)}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
