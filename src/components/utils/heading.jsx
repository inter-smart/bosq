import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("leading-tight tracking-tight font-light", {
  variants: {
    size: {
      heading1:
        "text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] 3xl:text-[50px]",
      heading2:
        "text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px]",
      heading3:
        "text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px]",
      heading4:
        "text-[12px] sm:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px]",
      heading5:
        "text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px]",
      heading6:
        "text-[16px] sm:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px]",
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
