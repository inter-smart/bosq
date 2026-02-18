import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RequestEnquiryForm from "../form/request-enquiry-form";
import { Heading } from "../utils/heading";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";
import { useTranslations } from "next-intl";

export default function EnquiryDialog({
  children,
  locale,
  state,
  dropdownData,
}) {
  const t = useTranslations("form");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={
          "sm:max-w-[576px] xl:max-w-[768px] 2xl:max-w-[920px] 3xl:max-w-[1100px] gap-0"
        }
      >
        <div className="w-full relative z-0">
          <DialogHeader className={"sr-only"}>
            <DialogTitle>{t("enquire_now")}</DialogTitle>
            <DialogDescription>
              Enquiry Form
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              variant="none"
              size="none"
              className={cn(
                "block fixed z-1 top-4 xl:top-5",
                locale === "ar"
                  ? "mr-auto left-4 xl:left-5"
                  : "ml-auto right-4 xl:right-5",
              )}
            >
              <X className="size-5 sm:size-4 2xl:size-5 text-black" />
            </Button>
          </DialogClose>

          <Heading as="h2" size="heading1" className="text-black mb-2 xl:mb-3">
            {t("enquire_now")}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                locale === "ar"
                  ? "-translate-x-1 xl:-translate-x-2 "
                  : "translate-x-1 xl:translate-x-2 ",
              )}
            />
          </Heading>
          <div className="w-full max-h-[80vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] overflow-x-hidden overflow-y-auto">
            <RecaptchaProvider>
              <RequestEnquiryForm
                locale={locale}
                states={state}
                dropdownData={dropdownData}
              />
            </RecaptchaProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
