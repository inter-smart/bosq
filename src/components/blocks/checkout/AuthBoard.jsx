"use client";

import SoftLoginForm from "@/components/form/soft-login-form";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { keepCartAsGuestAPI } from "@/lib/api/cart/cartApi";
import { logoutUser } from "@/store/slices/authSlice";
import { resetCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const AuthBoard = ({ locale }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const tAccount = useTranslations("account");

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await dispatch(logoutUser()).unwrap();
      if (result) {
        dispatch(resetCart());
        router.push(`/${locale}`);
      }
    } catch (err) {
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const handleKeepCartLogout = async () => {
    setIsLoggingOut(true);
    try {
      await keepCartAsGuestAPI();
      const result = await dispatch(logoutUser()).unwrap();
      if (result) {
        window.location.reload();
      }
    } catch (err) {
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  return (
    <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
      <Heading as="h4" size="heading4" className="font-normal text-[#282828] mb-3 2xl:mb-4">
        {tAccount("personal_info")}
      </Heading>
      {!user ? (
        <SoftLoginForm locale={locale} />
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 2xl:gap-1.5">
            {(user?.first_name || user?.name) && (
              <Text as="div" size="text3" className="text-[#282828] [&_span]:font-light [&_span]:text-[#808080]">
                <span>{tAccount("name")}</span> {user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : user?.name}
              </Text>
            )}
            {user?.email && (
              <Text as="div" size="text3" className="text-[#282828] [&_span]:font-light [&_span]:text-[#808080]">
                <span>{tAccount("email")}</span> {user.email}
              </Text>
            )}
          </div>
          <div
            className="hover:underline cursor-pointer text-[12px] 2xl:text-[14px] font-light text-[#808080] shrink-0"
            onClick={() => setShowLogoutDialog(true)}
          >
            {tAccount("log_out")}
          </div>
        </div>
      )}

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[360px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-[#282828]">Logout</DialogTitle>
            <DialogDescription>{locale == "en" ? "Are you sure you want to log out?" : "هل أنت متأكد أنك تريد تسجيل الخروج؟"}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <button
              onClick={handleKeepCartLogout}
              disabled={isLoggingOut}
              className="w-full bg-[#282828] text-white text-[13px] font-light py-2.5 px-4 rounded-[4px] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Logout &amp; Keep Cart
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full border border-[#e0e0e0] text-[#282828] text-[13px] font-light py-2.5 px-4 rounded-[4px] hover:bg-[#f4f4f4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {locale === "en" ? "Logout & Clear Cart" : "تسجيل الخروج ومسح السلة"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthBoard;
