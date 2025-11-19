import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function HomeCalculator({ calculatorData, customizeData }) {
  return (
    <section className="w-full h-auto block py-[10px] sm:py-[20px] xl:py-[30px] 2xl:py-[40px] relative z-0">
      <Image
        src={"/images/home-calculator-dvd.png"}
        alt={"home-calculator-dvd"}
        width={35}
        height={600}
        className="w-[20px] xl:w-[25px] aspect-[30/600] absolute z-0 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent_0%,white_10%,white_90%,transparent_100%)] pointer-events-none"
      />
      <div className="container">
        <div className="xl:max-w-[1040px] 2xl:max-w-[1260px] 3xl:max-w-[1620px] mx-auto">
          <div className="flex flex-wrap [&>*]:p-[20px] sm:[&>*]:p-[40px] xl:[&>*]:p-[60px]">
            <div className="w-full sm:w-1/2">
              <CardComp data={calculatorData} />
            </div>
            <div className="w-full sm:w-1/2">
              <CardComp data={customizeData} variant={"reverse"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardComp({ data, variant }) {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-wrap [&>*]:py-[10px] xl:[&>*]:py-[15px]",
        variant === "reverse" ? "flex-col" : "flex-col-reverse"
      )}
    >
      <div className="w-full aspect-4/3 hover:scale-105 transition duration-300">
        <Image
          src={data?.media?.path}
          alt={data?.media?.alt}
          width={620}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full">
        <Heading
          as="h1"
          size="heading1"
          className="line-clamp-2 text-[#282828] mb-2 xl:mb-4 2xl:mb-6"
        >
          {parse(data?.title)}
          <span className="text-[#f17423]">.</span>
        </Heading>
        <Text
          as="div"
          size="text1"
          className="line-clamp-6 font-light text-black mb-4 xl:mb-7 2xl:mb-10"
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
  );
}
