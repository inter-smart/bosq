import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("leading-tight font-light", {
  variants: {
    size: {
      heading1:
        "text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] 3xl:text-[50px]",
      heading2:
        "text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]",
      // heading4:
      //   "text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[24px]",
      // heading5:
      //   "text-[12px] sm:text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[17px] 3xl:text-[22px]",
      // heading6:
      //   "text-[11px] sm:text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]",
    },
  },
  defaultVariants: {
    size: "heading1",
  },
});

function Heading({ as, className, size, ...props }) {
  const Comp = as || "h6";

  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
}

export { Heading };
