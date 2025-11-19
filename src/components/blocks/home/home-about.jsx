import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function HomeAbout({ data }) {
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
          <div className="flex flex-wrap sm:items-center max-sm:flex-col-reverse">
            <div className="w-full sm:w-[220px] xl:w-[480px] 2xl:w-[468px] 3xl:w-[568px]">
              <div className="w-full sm:w-[168px] xl:w-[200px] 2xl:w-[268px] 3xl:w-[300px] aspect-[20/34] mx-auto">
                <Image
                  src={data?.media?.path}
                  alt={data?.media?.alt}
                  width={308}
                  height={517}
                  className="w-full h-full object-contain hover:scale-110 transition duration-300"
                />
              </div>
            </div>

            <div className="w-full sm:w-[calc(100%-220px)] xl:w-[calc(100%-480px)] 2xl:w-[calc(100%-468px)] 3xl:w-[calc(100%-568px)] max-sm:mb-[20px]">
              <div className="w-full">
                <Heading
                  as="h1"
                  size="heading1"
                  className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6"
                >
                  {parse(data?.title)}
                  <span className="text-[#f17423]">.</span>
                  {/* <span className="w-2 2xl:w-2.5 aspect-square rounded-full bg-[#f17423] inline-block" /> */}
                </Heading>
                <Text
                  as="div"
                  size="text1"
                  className="line-clamp-4 font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.description)}
                </Text>
                <Button
                  variant={"black"}
                  className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40"
                  asChild
                >
                  <Link href={data?.button?.link}>{data?.button?.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
