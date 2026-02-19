"use client";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const ASIDE_ITEMS = [
  {
    id: 1,
    media: {
      type: "image",
      path: "/images/account-nav-1.svg",
      alt: "account-nav",
    },
    title: "My Profile",
    key: "my_profile",
    href: "/account/profile",
  },
  {
    id: 2,
    media: {
      type: "image",
      path: "/images/account-nav-2.svg",
      alt: "account-nav",
    },
    title: "My Orders",
    key: "my_orders",
    href: "/account/orders",
  },
  {
    id: 3,
    media: {
      type: "image",
      path: "/images/account-nav-3.svg",
      alt: "account-nav",
    },
    title: "Cancelled Orders",
    key: "cancelled_orders",
    href: "/account/cancelled-orders",
  },
  {
    id: 4,
    media: {
      type: "image",
      path: "/images/account-nav-4.svg",
      alt: "account-nav",
    },
    title: "Manage Address",
    key: "manage_address",
    href: "/account/manage-address",
  },
  {
    id: 5,
    media: {
      type: "image",
      path: "/images/account-nav-5.svg",
      alt: "account-nav",
    },
    title: "Wishlist",
    key: "wishlist",
    href: "/account/wishlist",
  },
  {
    id: 6,
    media: {
      type: "image",
      path: "/images/account-nav-6.svg",
      alt: "account-nav",
    },
    title: "Coupons",
    key: "coupons",
    href: "/account/coupons",
  },
  {
    id: 7,
    media: {
      type: "image",
      path: "/images/account-nav-7.svg",
      alt: "account-nav",
    },
    title: "Account Settings",
    key: "account_settings",
    href: "/account/settings",
  },
  {
    id: 8,
    media: {
      type: "image",
      path: "/images/account-nav-8.svg",
      alt: "account-nav",
    },
    title: "Log out",
    key: "log_out",
    href: "#",
  },
];

export default function AccountNav({ locale }) {
  const t = useTranslations("account");
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const tToast = useTranslations("toast");

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(tToast("logout_success"));
      router.replace(`profile`);
    } catch (error) {
      toast.error(tToast("logout_failed"));
    }
  };

  return (
    <>
      <div className="relative z-2 sm:sticky sm:top-(--header-y)">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "text-[13px] leading-none font-normal text-black max-w-22 rounded-lg bg-gray-100 p-2 flex gap-1  flex items-center justify-center sm:hidden",
            open && "bg-gray-200 rounded-tb-lg",
            locale === "ar" ? "mr-auto" : "ml-auto",
          )}
        >
          <Menu className="size-3" />
          {t("menu")}
        </div>
        <div
          className={cn(
            "w-full max-w-40 sm:max-w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-tb-[4px] sm:rounded-s-[4px] shadow-xl sm:shadow-none overflow-hidden max-sm:absolute max-sm:top-full",
            open ? "max-sm:block" : "max-sm:hidden",
            locale === "ar" ? "max-sm:left-0" : "max-sm:right-0",
          )}
        >
          {ASIDE_ITEMS.map((item) => {
            const localizedHref = item.href === "#" ? "#" : `/${locale}${item.href}`;
            const isActive = pathname === localizedHref;
            const isLogout = item.id === 8;

            if (isLogout) {
              return (
                <button
                  key={"account-nav-" + item.id}
                  onClick={handleLogout}
                  className={cn(
                    "w-full flex gap-x-1.5 xl:gap-x-2.5 items-center py-2.5 xl:py-3 3xl:py-4.5 px-3 xl:px-5 3xl:px-6 transition bg-transparent hover:bg-gray-200 cursor-pointer",
                  )}
                >
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={12}
                    height={14}
                    className="w-3 xl:w-3 2xl:w-4 aspect-square object-contain hover:scale-105 transition duration-300 invert-0"
                  />
                  <Text as="div" size="text3" className="leading-none text-black">
                    {t(item?.key)}
                  </Text>
                </button>
              );
            }

            return (
              <Link
                key={"account-nav-" + item.id}
                href={localizedHref}
                className={cn(
                  "w-full flex gap-x-1.5 xl:gap-x-2.5 items-center py-2.5 xl:py-3 3xl:py-4.5 px-3 xl:px-5 3xl:px-6 transition ",
                  isActive ? "bg-black" : "bg-transparent hover:bg-gray-200",
                )}
              >
                <Image
                  src={item?.media?.path}
                  alt={item?.media?.alt}
                  width={12}
                  height={14}
                  className={cn(
                    "w-3 xl:w-3 2xl:w-4 aspect-square object-contain hover:scale-105 transition duration-300 ",
                    isActive ? "invert-100" : "invert-0",
                  )}
                />
                <Text as="div" size="text3" className={cn("leading-none text-black", isActive ? "text-white" : "text-black")}>
                  {t(item?.key)}
                </Text>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
