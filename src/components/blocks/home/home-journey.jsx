import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function HomeJourney({ data }) {
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[100px] xl:py-[160px] 2xl:py-[220px] bg-black overflow-hidden relative z-0">
      <div className="w-full h-full bg-linear-to-l from-transparent via-30% via-transparent to-[#f4f4f4] absolute -z-1 inset-0 " />
      {data?.media?.type === "video" ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute -z-2 inset-0 block sm:hidden"
          >
            <source src={data?.media?.mobile?.path} type="video/mp4" />
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute -z-2 inset-0 hidden sm:block"
          >
            <source src={data?.media?.desktop?.path} type="video/mp4" />
          </video>
        </>
      ) : (
        <picture className="absolute -z-2 inset-0">
          <source
            media="(max-width: 640px)"
            srcSet={data?.media?.mobile?.path}
          />
          <Image
            src={data?.media?.desktop?.path}
            alt={data?.media?.desktop?.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
            className="-z-2"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
          />
        </picture>
      )}

      <div className="container">
        <div className="w-full sm:max-w-[376px] xl:max-w-[468px] 2xl:max-w-[568px] 3xl:max-w-[700px]">
          <Heading
            as="h1"
            size="heading1"
            className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6"
          >
            {parse(data?.title)}
            <span className="text-[#f17423]">.</span>
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
    </section>
  );
}
