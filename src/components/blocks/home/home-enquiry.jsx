import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";
import EnquiryForm from "@/components/form/enquiry-form";

export default function HomeEnquiry({ data }) {
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px] bg-[#ebebeb]">
      <div className="container">
        <div className="flex flex-wrap sm:items-center">
          <div className="w-full sm:w-[468px] xl:w-[520px] 2xl:w-[640px] 3xl:w-[800px]">
            <div className="w-full aspect-4/3 overflow-hidden">
              <Image
                src={data?.media?.media_path}
                alt={data?.media?.media_alt}
                width={810}
                height={520}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>
          </div>

          <div className="w-full sm:w-[calc(100%-468px)] xl:w-[calc(100%-520px)] 2xl:w-[calc(100%-640px)] 3xl:w-[calc(100%-800px)]">
            <div className="w-full px-[30px] sm:px-[40px] xl:px-[80px] 2xl:px-[100px]">
              <Heading
                as="h2"
                size="heading1"
                className="line-clamp-2 text-black mb-1"
              >
                {parse(data?.title)}
                <span className="text-[#f17423]">.</span>
              </Heading>
              <Text
                as="div"
                size="text1"
                className="line-clamp-4 font-light text-black mb-2 xl:mb-4 2xl:mb-6"
              >
                {parse(data?.description)}
              </Text>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
