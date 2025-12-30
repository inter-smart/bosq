"use client";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ASIDE_ITEMS = [
  {
    id: 1,
    media: {
      type: "image",
      path: "/images/account-nav-1.svg",
      alt: "account-nav",
    },
    title: "My Profile",
    href: "/en/account/profile",
  },
  {
    id: 2,
    media: {
      type: "image",
      path: "/images/account-nav-2.svg",
      alt: "account-nav",
    },
    title: "My Orders",
    href: "/en/account/orders",
  },
  {
    id: 3,
    media: {
      type: "image",
      path: "/images/account-nav-3.svg",
      alt: "account-nav",
    },
    title: "Cancelled Orders",
    href: "/en/account/cancelled-orders",
  },
  {
    id: 4,
    media: {
      type: "image",
      path: "/images/account-nav-4.svg",
      alt: "account-nav",
    },
    title: "Manage Address",
    href: "/en/account/manage-address",
  },
  {
    id: 5,
    media: {
      type: "image",
      path: "/images/account-nav-5.svg",
      alt: "account-nav",
    },
    title: "Wishlist",
    href: "#",
  },
  {
    id: 6,
    media: {
      type: "image",
      path: "/images/account-nav-6.svg",
      alt: "account-nav",
    },
    title: "Coupons",
    href: "#",
  },
  {
    id: 7,
    media: {
      type: "image",
      path: "/images/account-nav-7.svg",
      alt: "account-nav",
    },
    title: "Account Settings",
    href: "#",
  },
  {
    id: 8,
    media: {
      type: "image",
      path: "/images/account-nav-8.svg",
      alt: "account-nav",
    },
    title: "Log out",
    href: "#",
  },
];

export default function AccountNav() {
  const pathname = usePathname();
  return (
    <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-s-lg overflow-hidden sticky top-(--header-y)">
      {ASIDE_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={"account-nav-" + item.id}
            href={item.href}
            className={cn(
              "w-full flex gap-x-1.5 xl:gap-x-2.5 items-center py-2.5 xl:py-3 3xl:py-4.5 px-3 xl:px-5 3xl:px-6 transition ",
              isActive ? "bg-black" : "bg-transparent hover:bg-gray-200"
            )}
          >
            <Image
              src={item?.media?.path}
              alt={item?.media?.alt}
              width={12}
              height={14}
              className={cn(
                "w-3 xl:w-3 2xl:w-4 aspect-square object-contain hover:scale-105 transition duration-300 ",
                isActive ? "invert-100" : "invert-0"
              )}
            />
            <Text
              as="div"
              size="text3"
              className={cn(
                "leading-none text-black",
                isActive ? "text-white" : "text-black"
              )}
            >
              {item?.title}
            </Text>
          </Link>
        );
      })}
    </div>
  );
}
