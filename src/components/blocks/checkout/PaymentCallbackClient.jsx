"use client";

import { useEffect, useRef, useState } from "react";
import CheckoutResponse from "@/components/blocks/checkout/checkout-response";

const MAX_RETRIES = 5;
const POLL_INTERVAL_MS = 3000;

export default function PaymentCallbackClient({ locale, orderId }) {
  const [paymentStatus, setPaymentStatus] = useState(null); // "success" | "failed" | null
  const [orderCode, setOrderCode] = useState(null);
  const retryCount = useRef(0);

  useEffect(() => {
    if (!orderId) {
      setPaymentStatus("failed");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/orders/${orderId}/payment-status`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) {
          setPaymentStatus("failed");
          return;
        }

        const status = data.data?.payment_status;
        const returnedOrderCode = data.data?.order_id;

        if (returnedOrderCode) setOrderCode(returnedOrderCode);

        if (status === "paid") {
          setPaymentStatus("success");
        } else if (status === "failed") {
          setPaymentStatus("failed");
        } else {
          // Still pending — poll again if retries remain
          retryCount.current += 1;
          if (retryCount.current < MAX_RETRIES) {
            setTimeout(checkStatus, POLL_INTERVAL_MS);
          } else {
            // Exceeded retries — treat as failed
            setPaymentStatus("failed");
          }
        }
      } catch {
        setPaymentStatus("failed");
      }
    };

    checkStatus();
  }, [orderId]);

  if (!paymentStatus) {
    return (
      <div className="w-full py-[60px] flex items-center justify-center">
        <p className="text-[#808080] text-sm">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <CheckoutResponse
      orderStatus={paymentStatus}
      locale={locale}
      orderId={orderCode || orderId}
    />
  );
}
