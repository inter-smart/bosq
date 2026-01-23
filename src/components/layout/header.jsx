"use client";

import { useTransition, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import SearchDialog from "../common/search-dialog";
import HeaderNavigation from "./header-navigation";
import MobileHeaderNavigation from "./mobile-header-navigation";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export default function Header({ headerData, navigationData, locale, data }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [bg, setBg] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [headerHover, setHeaderHover] = useState(true);

  const pathname = usePathname();

  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => setSheetOpen(false), [pathname]);

  // Handle scroll visibility + background
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      const atTop = scrollYProgress.get() < 0.05;
      setVisible(atTop || direction < 0);
      setBg(!atTop && direction < 0);
    }
  });

  const handleNavigationLinkClick = () => setSheetOpen(false);

  const switchLocale = (newLocale) => {
    console.log("locale: ", locale)
    if (newLocale === locale) return;


    // Remove current locale from pathname and add new one
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale; // Replace locale segment
    const newPath = `/${segments.join("/")}`;

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Use transition for smooth loading state
    startTransition(() => {
      router.push(newPath);
      setIsOpen(false);
    });
  };

  const showDarkHeader = headerHover === true || pathname !== `/${locale}`;

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHeaderHover(true)}
        onMouseLeave={() => setHeaderHover(false)}
        className={cn(
          "w-full h-(--header-y) z-10 top-0 inset-x-0 flex items-center bg-linear-to-b from-black/20 to-transparent transition-background duration-300",
          bg
            ? "border-b border-white/10 shadow-[0px_10px_4px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm fixed"
            : "absolute",
          // bg && (pathname === `/${locale}` ? "bg-black/90" : "bg-white/90"),
          // pathname === `/${locale}`
          //   ? "bg-linear-to-b from-black/20 to-transparent"
          //   : "bg-linear-to-b from-white/20 to-transparent",
          headerHover
            ? "bg-white from-white to-white"
            : bg
            ? showDarkHeader
              ? "bg-white/90"
              : "bg-black/90"
            : showDarkHeader
            ? "bg-linear-to-b from-white/20 to-white"
            : "bg-linear-to-b from-black/20 to-transparent"
        )}
      >
        <div className="container">
          <div className="flex justify-between items-center gap-x-3 lg:gap-x-8">
            <MediaQuery maxWidth={1023}>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="flex items-center gap-x-1.5 2xs:gap-x-2">
                  <Menu
                    size={18}
                    strokeWidth={1}
                    className={cn(
                      "size-5",
                      showDarkHeader ? "text-[#282828]" : "text-white"
                    )}
                  />
                  <div
                    className={cn(
                      "w-[1px] h-5 2xs:h-6",
                      showDarkHeader ? "bg-[#282828]/10" : "bg-white/10"
                    )}
                  />
                </SheetTrigger>
                <SheetContent
                  className="max-w-[320px] sm:max-w-[320px] bg-white"
                  side={locale === "ar" ? "right" : "left"}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Navigation</SheetDescription>
                  </SheetHeader>
                  <Link
                    href={`/${locale}/login`}
                    className="text-[14px] leading-none font-light text-white min-h-(--header-y) h-(--header-y) bg-black flex items-center gap-x-2 px-4"
                  >
                    <Image
                      src="/images/icon-user.svg"
                      alt="user"
                      width={12}
                      height={12}
                      unoptimized
                      className="w-[15px]"
                    />
                    Login/Sign Up
                  </Link>
                  <div className="w-full h-[calc(100%_-_var(--header-y)} overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {sheetOpen && (
                        <motion.div
                          key="menu-anim"
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                        >
                          <MobileHeaderNavigation
                            locale={locale}
                            pathname={pathname}
                            menuItems={navigationData}
                            onNavigationClick={handleNavigationLinkClick}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <SheetClose
                    className={cn(
                      "w-14 h-(--header-y) bg-[#121212] absolute z-1 top-0 rounded-none! flex items-center justify-center",
                      locale === "ar" ? "left-0" : "right-0"
                    )}
                    asChild
                  >
                    <Button variant="none">
                      <X className="size-5 text-white" />
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </MediaQuery>

            {/* Brand Logo */}
            <div className="w-[80px] 2xs:w-[90px] sm:w-[100px] xl:w-[120px] 2xl:w-[140px] 3xl:w-[176px]">
              <Link href={`/${locale}${headerData?.slug}`}>
                <Image
                  src={
                    showDarkHeader
                      ? headerData?.logoUrl
                      : headerData?.logoWhiteUrl
                  }
                  alt={headerData?.name}
                  width={176}
                  height={57}
                  unoptimized
                  className="w-full h-full block object-contain"
                  priority
                />
              </Link>
            </div>

            <div
              className={cn(
                "flex-1 flex items-center justify-end lg:justify-between transition gap-x-[15px] 2xs:gap-x-[20px] sm:gap-sm-[30px] lg:gap-x-[30px] 2xl:gap-x-[40px]"
              )}
            >
              <MediaQuery minWidth={1024}>
                <HeaderNavigation
                  locale={locale}
                  pathname={pathname}
                  menuItems={navigationData}
                  onNavigationClick={handleNavigationLinkClick}
                  showDarkHeader={showDarkHeader}
                />
              </MediaQuery>
              <SearchDialog locale={locale}>
                <Button variant="none" size="none">
                  <Image
                    src={
                      showDarkHeader
                        ? "/images/icon-search-dark.svg"
                        : "/images/icon-search.svg"
                    }
                    alt="search"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px] 2xl:w-[18px]"
                  />
                </Button>
              </SearchDialog>
              <Button variant="none" size="none" asChild>
                <Link href={`/${locale}/cart`}>
                  <Image
                    src={
                      showDarkHeader
                        ? "/images/icon-bag-dark.svg"
                        : "/images/icon-bag.svg"
                    }
                    alt="bag"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px] 2xl:w-[18px]"
                  />
                </Link>
              </Button>
              <Button variant="none" size="none" asChild>
                <Link href={`/${locale}/account/profile`}>
                  <Image
                    src={
                      showDarkHeader
                        ? "/images/icon-user-dark.svg"
                        : "/images/icon-user.svg"
                    }
                    alt="user"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px] 2xl:w-[18px]"
                  />
                </Link>
              </Button>
              {locale == "ar" ? (
                <Button
                  variant="link"
                  onClick={() => switchLocale("en")}
                  className={cn(
                    "text-[12px] leading-none font-normal font-cairo text-white min-w-[60px] sm:min-w-[60px] lg:min-w-[80px] 2xl:min-w-[100px] gap-1",
                    showDarkHeader ? "text-[#282828]" : "text-white"
                  )}
                >
                  <Image
                    src="/images/lang-2.jpg"
                    alt="lang-1"
                    width={12}
                    height={12}
                    className="w-[15px] 2xl:w-[18px] aspect-square rounded-full block border-black border-1"
                  />
                  English
                </Button>
              ) : (
                <Button
                  variant="link"
                  onClick={() => switchLocale("ar")}
                  className={cn(
                    "text-[12px] leading-none font-normal font-cairo min-w-[60px] sm:min-w-[60px] lg:min-w-[80px] 2xl:min-w-[100px] gap-1",
                    showDarkHeader ? "text-[#282828]" : "text-white"
                  )}
                >
                  <Image
                    src="/images/lang-1.jpg"
                    alt="lang-1"
                    width={12}
                    height={12}
                    className="w-[15px] 2xl:w-[18px] aspect-square rounded-full block border-black border-1"
                  />
                  العربية
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
