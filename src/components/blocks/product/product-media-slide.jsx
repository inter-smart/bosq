"use client";
import Image from "@/components/utils/custom-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductMediaSlide({ item, onClick, isOutOfStock }) {
  return (
    <div
      className="flex-[0_0_100%] min-w-0"
      onClick={onClick}
    >
      <div className={cn("w-full h-full rounded-[4px] overflow-hidden border transition duration-300 bg-white select-none relative")}>
        {isOutOfStock && (
          <div className="w-full h-full bg-[#f4f4f4]/90 flex items-center justify-center absolute z-2 inset-0">
            <Button
              variant={"black"}
              disabled={true}
              className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[200px] disabled:opacity-100 rounded-[2px] m-auto"
            >
              Out of Stock
            </Button>
          </div>
        )}
        {item?.type === "video" ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={item?.path} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={item?.path || "/images/placeholder.jpg"}
            alt={item?.alt || "main"}
            width={1080}
            height={1080}
            className="w-full h-full object-cover"
            quality={90}
          />
        )}
      </div>
    </div>
  );
}
