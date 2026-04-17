import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";
import EnquiryForm from "@/components/form/enquiry-form";
import { cn } from "@/lib/utils";
import ProjectEnquiryForm from "@/components/form/project-enquiry-form";

export default function HomeEnquiry({ data, locale, isEN, type = "", projectId = null }) {
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px] bg-[#ebebeb]">
      <div className="container">
        <div className="flex flex-wrap sm:items-center">
          <div className="w-full md:w-[268px] xl:w-[520px] 2xl:w-[640px] 3xl:w-[800px] max-md:mb-4">
            <div className="w-full aspect-4/2 md:aspect-4/3 overflow-hidden">
              <Image
                src={data?.media?.path}
                alt={isEN ? data?.media?.alt : data?.media?.alt_ar}
                width={810}
                height={520}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                quality={90}
              />
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-268px)] xl:w-[calc(100%-520px)] 2xl:w-[calc(100%-640px)] 3xl:w-[calc(100%-800px)]">
            <div
              className={cn(
                "w-full",
                !isEN
                  ? "md:pr-5 xl:px-[60px] 2xl:px-[80px]"
                  : "md:pl-5 xl:px-[60px] 2xl:px-[80px]",
              )}
            >
              <Heading
                as="h2"
                size="heading1"
                className="line-clamp-2 text-black mb-1"
              >
                {parse(isEN ? data?.title : data?.title_ar)}

                <span
                  className={cn(
                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                    !isEN
                      ? "-translate-x-1 xl:-translate-x-2 "
                      : "translate-x-1 xl:translate-x-2 ",
                  )}
                />
              </Heading>
              <Text
                as="div"
                size="text1"
                className="line-clamp-4 font-light text-black mb-2 xl:mb-4 2xl:mb-6"
              >
                {parse(isEN ? data?.description : data?.description_ar)}
              </Text>

              {type === "project" ? (
                <ProjectEnquiryForm projectId={projectId} locale={locale} />
              ) : (
                <EnquiryForm locale={locale} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
