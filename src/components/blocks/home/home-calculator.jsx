import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function HomeCalculator({
  calculatorData,
  customizeData,
  locale,
}) {
  return (
    <section className="w-full h-auto block py-[10px_30px] sm:py-[20px_40px] xl:py-[30px_80px] 2xl:py-[50px_100px] relative z-0">
      <Image
        src={"/images/home-calculator-dvd.png"}
        alt={"home-calculator-dvd"}
        width={35}
        height={600}
        className="w-[20px] xl:w-[25px] aspect-[30/600] absolute z-0 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent_0%,white_10%,white_90%,transparent_100%)] pointer-events-none max-sm:hidden"
      />
      <div className="container">
        <div className="xl:max-w-[1040px] 2xl:max-w-[1260px] 3xl:max-w-[1620px] mx-auto">
          <div className="flex flex-wrap [&>*]:p-[15px_0] sm:[&>*]:p-[20px_40px] xl:[&>*]:p-[25px_60px] 2xl:[&>*]:p-[30px_80px]">
            <div className="w-full sm:w-1/2">
              <CardComp locale={locale} data={calculatorData} />
            </div>
            <div className="block sm:hidden">
              <Image
                src={"/images/home-calculator-dvd-x.png"}
                alt={"home-calculator-dvd"}
                width={600}
                height={35}
                className="w-full aspect-[60/3] [mask-image:linear-gradient(to_left,transparent_0%,white_10%,white_90%,transparent_100%)] pointer-events-none"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <CardComp
                locale={locale}
                data={customizeData}
                variant={"reverse"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardComp({ data, variant, locale }) {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-wrap [&>*]:py-[10px] 2xl:[&>*]:py-[15px]",
        variant === "reverse"
          ? "justify-end sm:flex-col"
          : "justify-start sm:flex-col-reverse"
      )}
    >
      <div className="w-full max-w-[220px] sm:max-w-[90%] aspect-4/3 hover:scale-105 transition duration-300">
        <Image
          src={data?.media?.media_path}
          alt={data?.media?.media_alt}
          width={620}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
      <div
        className={cn(
          "w-full",
          variant === "reverse" ? "max-sm:text-right" : "max-sm:text-left"
        )}
      >
        <Heading
          as="h2"
          size="heading1"
          className="line-clamp-2 text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
        >
          {parse(data?.title)}<span
            className={cn(
              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
              locale === "ar"
                ? "-translate-x-1 xl:-translate-x-2 "
                : "translate-x-1 xl:translate-x-2 "
            )}
          />
          &nbsp;
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
          className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px]"
          asChild
        >
          <Link href={data?.button?.link}>{data?.button?.label}</Link>
        </Button>
      </div>
    </div>
  );
}
