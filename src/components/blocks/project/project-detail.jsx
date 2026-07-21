"use client";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import Image from "@/components/utils/custom-image";
import { Text } from "@/components/utils/text";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from "react";

export default function ProjectDetail({ locale, projectData }) {
  const [openProject, setOpenProject] = useState(false);
  const [indexProject, setIndexProject] = useState(0);

  const isEN = locale === "en";

  const features = isEN ? projectData?.features : projectData?.features_ar;

  return (
    <section className="w-full block pb-8 sm:pb-14 xl:pb-18 2xl:pb-24">
      <div className="container">
        <div className="flex flex-wrap mb-4 xl:mb-7 2xl:mb-9 gap-2">
          {isEN
            ? projectData?.tags.map((item, index) => (
                <Tag data={item} key={index} />
              ))
            : projectData?.tags_ar.map((item, index) => (
                <Tag data={item} key={index} />
              ))}
        </div>

        <div className="w-full aspect-6/4 sm:aspect-1920/740 overflow-hidden mb-6 xl:mb-10 2xl:mb-18 relative z-0">
          <picture className="absolute -z-2 inset-0 opacity-95">
            <source
              media="(max-width: 640px)"
              srcSet={
                projectData?.media?.mobile_path ?? "/images/placeholder.jpg"
              }
            />
            <Image
              src={
                projectData?.media?.desktop_path ?? "/images/placeholder.jpg"
              }
              alt={
                isEN
                  ? projectData?.media?.media_alt
                  : projectData?.media?.media_alt_ar
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-2 object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              quality={90}
            />
          </picture>
        </div>

        <div className={cn("w-full h-auto mb-3 xl:mb-6 2xl:mb-8")}>
          <div className="w-full h-auto block">
            <div
              className={cn(
                "w-full max-w-[220px] sm:max-w-[42%] overflow-hidden mb-3 xl:mb-5",
                locale === "ar"
                  ? "sm:float-left sm:mr-15 xl:mr-24 2xl:mr-28 3xl:mr-80 sm:ml-0"
                  : "sm:float-right sm:ml-15 xl:ml-24 2xl:ml-28 3xl:ml-80 sm:mr-0",
              )}
            >
              <div className="flex flex-wrap -m-3 xl:-m-5 2xl:-m-7 [&>*]:p-3 xl:[&>*]:p-5 2xl:[&>*]:p-7 mb-4 2xl:mb-5">
                {features?.map((item, index) => (
                  <div key={`project-info-${index}`} className="w-1/2">
                    <Text
                      as="div"
                      size="text1"
                      className="font-medium text-[#282828] mb-1 2xl:mb-2"
                    >
                      {item?.label}
                    </Text>
                    <Text as="div" size="text2" className="text-[#282828]">
                      {item?.value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={cn("typography", "[--text-color:#282828]")}
            >
              {parse(
                isEN ? projectData?.description : projectData?.description_ar,
              )}
            </div>
            <div className="clear-both" />
          </div>
        </div>

        <div className={cn("w-full h-auto")}>
          <div className="flex flex-wrap -mx-1 sm:-mx-3 xl:-mx-5 2xl:-mx-7 [&>*]:p-1 sm:[&>*]:p-3 xl:[&>*]:p-5 2xl:[&>*]:p-7">
            {projectData?.projectGallery?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setIndexProject(index);
                  setOpenProject(true);
                }}
                className={cn("w-[56%]", index % 2 === 1 && "w-[42%]")}
              >
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={item?.media?.media_path || "/images/placeholder.jpg"}
                    alt={
                      isEN ? item?.media?.media_alt : item?.media?.media_alt_ar
                    }
                    width={976}
                    height={633}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    quality={90}
                  />
                </div>
              </div>
            ))}

            <Lightbox
              open={openProject}
              close={() => setOpenProject(false)}
              index={indexProject}
              slides={projectData?.projectGallery.map((src) => ({
                src: src.media?.media_path,
              }))}
              animation={{ fade: 0 }}
              controller={{
                closeOnPullDown: true,
                closeOnBackdropClick: true,
              }}
              plugins={[Thumbnails]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ data }) {
  return (
    <Text
      as="div"
      size="text3"
      className="text-[#282828] rounded-full bg-[#f4f4f4] px-3 xl:px-4 2xl:px-6 py-1 xl:py-1.5 2xl:py-2"
    >
      {data}
    </Text>
  );
}
