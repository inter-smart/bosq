import React from "react";
import parse from "html-react-parser";
import { convertRichTextToHtml } from "@/lib/utils";

export default function InfoSection({ data }) {
  const parsedData = convertRichTextToHtml(data);

  // console.log(parsedData)
  return (
    <section className="w-full h-auto block py-[20px] sm:py-[30px] xl:py-[40px] 2xl:py-[50px]">
      <div className="container">
        <div className="typography [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-brownede [&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:font-normal mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]">
          {parse(parsedData)}
        </div>
      </div>
    </section>
  );
}
