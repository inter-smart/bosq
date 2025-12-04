import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("leading-normal font-light", {
  variants: {
    size: {
      text1:
        "text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]",
      text2:
        "text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px]",
      text3:
        "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px]",
    },
  },
  defaultVariants: {
    size: "text1",
  },
});

function Text({ as, className, size, ...props }) {
  const Comp = as || "p";
  return <Comp className={cn(textVariants({ size, className }))} {...props} />;
}

export { Text };
