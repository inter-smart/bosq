"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearAuth, setUser } from "@/store/slices/authSlice";

export default function AuthSyncProvider() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;

    const bc = new BroadcastChannel("bosq_auth");

    bc.onmessage = (e) => {
      if (e.data.type === "LOGOUT") {
        dispatch(clearAuth());
        router.refresh();
      } else if (e.data.type === "LOGIN") {
        dispatch(setUser(e.data.user));
        router.refresh();
      }
    };

    return () => bc.close();
  }, [dispatch, router]);

  return null;
}
