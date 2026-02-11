import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";

const STATUS_CONFIG = {
  success: {
    en: {
      title: "Thank You for the Purchase!",
      message: "Your order was successful. You'll receive a confirmation shortly.",
      primaryAction: "Explore More",
      secondaryAction: "Back to Home",
      orderLabel: "ORDER ID",
    },
    ar: {
      title: "شكرًا لك على الشراء!",
      message: "تم تأكيد طلبك بنجاح. ستصلك رسالة تأكيد خلال وقت قصير.",
      primaryAction: "تصفح المزيد",
      secondaryAction: "العودة إلى الرئيسية",
      orderLabel: "رقم الطلب",
    },
    icon: "/images/icon-checkout-success.svg",
    href: "/shop",
  },

  failed: {
    en: {
      title: "Payment Failed",
      message: "We couldn't place your order. Please double-check your shipping and payment information.",
      primaryAction: "Try Again",
      secondaryAction: "Back to Home",
      orderLabel: "ORDER ID",
    },
    ar: {
      title: "فشل الدفع",
      message: "لم نتمكن من إتمام طلبك. يرجى التحقق من معلومات الشحن والدفع والمحاولة مرة أخرى.",
      primaryAction: "حاول مرة أخرى",
      secondaryAction: "العودة إلى الرئيسية",
      orderLabel: "رقم الطلب",
    },
    icon: "/images/icon-checkout-error.svg",
    href: "/checkout",
  },
};

export default function CheckoutResponse({ orderStatus, orderId, locale = "en" }) {
  const config = STATUS_CONFIG[orderStatus];
  if (!config) return null;

  const text = locale === "ar" ? config.ar : config.en;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="w-full py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image src={config.icon} alt={orderStatus} width={100} height={100} className="w-[30px] xl:w-[50px]" />
          </EmptyMedia>

          <EmptyTitle>
            <Heading as="h1" size="heading1" className="text-[#282828]">
              {text.title}
            </Heading>
          </EmptyTitle>

          {orderId && (
            <EmptyDescription>
              <Text as="p" size="text2" className="font-normal text-[#282828]">
                {text.orderLabel} #{orderId}
              </Text>
            </EmptyDescription>
          )}
        </EmptyHeader>

        <EmptyContent>
          <Text as="p" size="text3" className="text-[#282828] text-center">
            {text.message}
          </Text>

          <div className="flex gap-2 xl:gap-5">
            <Button variant="black" className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px]" asChild>
              <Link href={`/${locale}${config.href}`}>{text.primaryAction}</Link>
            </Button>

            <Button variant="white" className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px] border border-black" asChild>
              <Link href={`/${locale}`}>{text.secondaryAction}</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
