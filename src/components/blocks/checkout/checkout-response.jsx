"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";

const MAX_RETRIES = 10;
const POLL_INTERVAL_MS = 3000;

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
    href: "/products",
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

export default function CheckoutResponse({ orderRef, locale = "en" }) {
  const [resolvedStatus, setResolvedStatus] = useState(null);
  const [resolvedOrderId, setResolvedOrderId] = useState(null);
  const [isLongWait, setIsLongWait] = useState(false);
  const retryCount = useRef(0);

  useEffect(() => {
    if (!orderRef) {
      setResolvedStatus("failed");
      return;
    }

    const checkStatus = async () => {
      // Show "still verifying" message after 3 retries (~9s)
      if (retryCount.current >= 3) {
        setIsLongWait(true);
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/payment/verify?ref=${orderRef}`, { credentials: "include" });
        const json = await res.json();

        if (!res.ok) {
          // Non-2xx — retry up to max, then show failed
          retryCount.current += 1;
          if (retryCount.current < MAX_RETRIES) {
            setTimeout(checkStatus, POLL_INTERVAL_MS);
          } else {
            setResolvedStatus("failed");
          }
          return;
        }

        const status = json.data?.resolvedStatus;
        const returnedOrderId = json.data?.merchantRef;

        if (returnedOrderId) setResolvedOrderId(returnedOrderId);

        if (status === "paid") {
          setResolvedStatus("success");
        } else if (status === "failed" || status === "cancelled") {
          setResolvedStatus("failed");
        } else {
          // Still pending — retry
          retryCount.current += 1;
          if (retryCount.current < MAX_RETRIES) {
            setTimeout(checkStatus, POLL_INTERVAL_MS);
          } else {
            setResolvedStatus("failed");
          }
        }
      } catch {
        // Network error — retry, don't immediately fail
        retryCount.current += 1;
        if (retryCount.current < MAX_RETRIES) {
          setTimeout(checkStatus, POLL_INTERVAL_MS);
        } else {
          setResolvedStatus("failed");
        }
      }
    };

    checkStatus();
  }, [orderRef]);

  if (!resolvedStatus) {
    return (
      <div className="w-full py-[60px] flex flex-col items-center justify-center gap-2">
        <p className="text-[#808080] text-sm">Verifying your payment...</p>
        {isLongWait && (
          <p className="text-[#aaaaaa] text-xs">Still verifying — please wait a moment.</p>
        )}
      </div>
    );
  }

  const config = STATUS_CONFIG[resolvedStatus];
  if (!config) return null;

  const text = locale === "ar" ? config.ar : config.en;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="w-full py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image src={config.icon} alt={resolvedStatus} width={100} height={100} className="w-[30px] xl:w-[50px]" quality={90} />
          </EmptyMedia>

          <EmptyTitle>
            <Heading as="h1" size="heading1" className="text-[#282828]">
              {text.title}
            </Heading>
          </EmptyTitle>

          {resolvedOrderId && (
            <EmptyDescription>
              <Text as="p" size="text2" className="font-normal text-[#282828]">
                {text.orderLabel} #{resolvedOrderId}
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
