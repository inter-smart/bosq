"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";
import { resetCart } from "@/store/slices/cartSlice";

const AccountGuard = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    fetch("/api/profile/status", { credentials: "include" })
      .then((res) => res.json())
      .then(({ status }) => {
        setIsActive(status == "active");
        if (status == "inactive") {
          dispatch(logoutUser()).finally(() => {
            dispatch(resetCart());
            router.push(`/${locale}/login`);
          });
        }
      })
      .catch((err) => {
      });
  }, []);

  return <>{isActive && children}</>;
};

export default AccountGuard;
