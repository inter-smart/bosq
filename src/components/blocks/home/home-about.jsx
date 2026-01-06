import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function HomeAbout({ data, locale }) {
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[100px] 2xl:py-[120px] bg-[#f4f4f4] overflow-hidden relative z-0">
      <Image
        src="/images/home-about-1.png"
        alt="home-about-1"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
        className="w-full h-full absolute -z-1 inset-0 object-cover pointer-events-none"
      />

      <div className="container">
        <div className="xl:max-w-[1040px] 2xl:max-w-[1260px] 3xl:max-w-[1620px] mx-auto">
          <div className="flex flex-wrap sm:items-center">
            <div className="w-full sm:w-[220px] xl:w-[480px] 2xl:w-[576px] 3xl:w-[720px] max-sm:mb-2">
              <div className="group w-[140px] sm:w-[168px] xl:w-[200px] 2xl:w-[268px] 3xl:w-[320px] aspect-[20/34] mx-auto hover:scale-110  transition duration-300 relative z-0">
                <Image
                  src={data?.media?.path}
                  alt={locale == "ar" ? data?.media?.alt_ar : data?.media?.alt}
                  width={308}
                  height={517}
                  className="w-full h-full object-contain group-hover:-translate-y-2 transition duration-300"
                />
                <div className="w-full aspect-6/1 rounded-full bg-black absolute z-[-1] bottom-0 left-0 right-0 blur-2xl opacity-0 group-hover:opacity-40 group-hover:scale-80 transition duration-300" />
              </div>
            </div>

            <div className="w-full sm:w-[calc(100%-220px)] xl:w-[calc(100%-480px)] 2xl:w-[calc(100%-576px)] 3xl:w-[calc(100%-720px)]">
              <div className="w-full max-sm:text-center">
                <Heading as="h2" size="heading1" className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6">
                  {parse(locale == "ar" ? data?.title_ar : data?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar" ? "-translate-x-1 xl:-translate-x-2 " : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Text as="div" size="text1" className="line-clamp-4 font-light text-black mb-4 xl:mb-8 2xl:mb-10">
                  {parse(locale == "ar" ? data?.description_ar : data?.description)}
                </Text>
                <Button variant={"black"} className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40" asChild>
                  <Link href={"/"}>{locale == "ar" ? "قراءة المزيد" : "Read More"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
