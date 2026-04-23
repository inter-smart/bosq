"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { clearAuth, loginFromBroadcast, fetchUserProfile } from "@/store/slices/authSlice";

const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/create-password", "/otp-submission"];

export default function AuthSyncProvider() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);

  // On mount, validate persisted session against the server.
  // isAuthenticated is never persisted, so we check for a persisted user object instead.
  // fetchUserProfile success sets isAuthenticated=true; failure clears all auth state.
  // Skip on auth pages — don't silently re-authenticate a user who intentionally navigated to login.
  useEffect(() => {
    const isAuthPage = AUTH_PATHS.some((p) => pathname.includes(p));
    if (user && !isAuthPage) {
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
