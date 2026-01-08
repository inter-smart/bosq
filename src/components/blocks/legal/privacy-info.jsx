import parse from "html-react-parser";

import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";

export default function PrivacyInfo({ data, locale }) {
  const isEN = locale === "en";

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
      <div className="container">
        {data?.categories?.map((item, index) => (
          <div
            key={"privacy-info-" + index}
            className="flex flex-wrap -mx-1 xl:-mx-4 2xl:-mx-6 [&>*]:p-1 xl:[&>*]:p-4 2xl:[&>*]:p-6"
          >
            <div className="w-full xl:w-[360px] 2xl:sm:w-[520px]">
              <Heading
                as="h2"
                size="heading2"
                className="tracking-tight text-[#282828] mt-3 xl:mt-1.5"
              >
                {isEN ? item?.title : item?.title_ar}
              </Heading>
            </div>
            <div className="w-full xl:w-[calc(100%-360px)] 2xl:sm:w-[calc(100%-520px)]">
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className={cn("typography", "[--text-color:#282828]")}
              >
                {parse(isEN ? item?.description : item?.description_ar)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
