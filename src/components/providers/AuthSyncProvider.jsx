"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearAuth, loginFromBroadcast, fetchUserProfile } from "@/store/slices/authSlice";

export default function AuthSyncProvider() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // On mount, validate persisted session against the server to detect stale cookies
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;

    const bc = new BroadcastChannel("bosq_auth");

    bc.onmessage = (e) => {
      if (e.data.type === "LOGOUT") {
        dispatch(clearAuth());
        router.refresh();
      } else if (e.data.type === "LOGIN") {
        dispatch(loginFromBroadcast(e.data.user));
        router.refresh();
      }
    };

    return () => bc.close();
  }, [dispatch, router]);

  return null;
}
