"use client";

import { useEffect, useState } from "react";
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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  return isMobile ? children : null;
};

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 640 });
  return isNotMobile ? children : null;
};

export default function Header({ headerData, navigationData }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [bg, setBg] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [brandLogo, setBrandLogo] = useState("");
  const [brandUrl, setBrandUrl] = useState("/");
  const [loginButton, setLoginButton] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const pathname = usePathname();

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

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "w-full h-(--header-y) z-10 top-0 inset-x-0 flex items-center",
          bg
            ? "border-b border-white/10 bg-black/80 shadow-[0px_10px_4px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm fixed"
            : "absolute"
        )}
      >
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <div className="w-[100px] xl:w-[120px] 2xl:w-[176px]">
              <Link href={headerData?.slug}>
                <Image
                  src={headerData?.logoWhiteUrl}
                  alt={headerData?.name}
                  width={173}
                  height={58}
                  unoptimized
                  className="w-full h-full"
                  priority
                />
              </Link>
            </div>

            <div
              className={cn(
                "flex items-center justify-between space-x-[20px] xl:space-x-[25px] 2xl:space-x-[35px] transition"
              )}
            >
              <Default>
                <NavigationMenuBar
                  pathname={pathname}
                  menuItems={navigationData}
                  onNavigationClick={handleNavigationLinkClick}
                />
                <Button variant="none" size="none" className="">
                  <Image
                    src="/images/icon-search.svg"
                    alt="search"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px]"
                  />
                </Button>
                <Button variant="none" size="none" className="">
                  <Image
                    src="/images/icon-bag.svg"
                    alt="bag"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px]"
                  />
                </Button>
                <Button variant="none" size="none" className="">
                  <Image
                    src="/images/icon-user.svg"
                    alt="user"
                    width={12}
                    height={12}
                    unoptimized
                    className="w-[15px]"
                  />
                </Button>
              </Default>
              <Button
                variant="outline"
                className="min-w-[70px] sm:min-w-[80px] xl:min-w-[80px] 2xl:min-w-[100px] 3xl:min-w-[120px]"
              >
                <Image
                  src="/images/icon-user.svg"
                  alt="user"
                  width={12}
                  height={12}
                  unoptimized
                  className="w-[15px]"
                />
                العربية
              </Button>

              {/* Mobile Menu */}
              <Mobile>
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger>
                    <div className="text-[12px] font-normal text-center text-white flex items-center justify-center">
                      <Image
                        src="/images/header-hamburger.svg"
                        alt="Menu"
                        width={24}
                        height={10}
                        unoptimized
                        className="w-[15px] mr-[6px]"
                      />
                      <span>Menu</span>
                    </div>
                  </SheetTrigger>
                  <SheetContent className="w-[320px] bg-[#030303]">
                    <SheetHeader>
                      <SheetTitle className="sr-only">Navigation</SheetTitle>
                      <SheetDescription className="sr-only">
                        Navigation
                      </SheetDescription>
                      <AnimatePresence mode="wait">
                        {sheetOpen && (
                          <motion.div
                            key="menu-anim"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                          >
                            <NavigationMenuBar
                              pathname={pathname}
                              menuItems={menuItems}
                              onNavigationClick={handleNavigationLinkClick}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </Mobile>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}

/* ----------------------------------------
   Navigation Component
---------------------------------------- */
function NavigationMenuBar({ pathname, menuItems, onNavigationClick }) {
  const getNavigationMenuTriggerStyle = (isActive) => {
    const baseStyle =
      "text-[14px] sm:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-center w-full h-auto p-[4px_10px] xl:p-[6px_12px] 2xl:p-[10px_15px] 2xl:p-[15px_25px] bg-transparent border border-transparent hover:text-white focus:text-primary hover:bg-black/10 focus:bg-black/50 ring-0 hover:border-white/10 data-[state=open]:border-white/10 data-[state=open]:hover:bg-black/10 data-[state=open]:text-white data-[state=open]:focus:bg-black/10 data-[state=open]:bg-black/10 transition-all duration-200";
    return `${baseStyle} ${
      isActive ? "text-primary border-transparent" : "text-white"
    }`;
  };
  return (
    <NavigationMenu viewport={false} className="max-w-full justify-normal">
      <NavigationMenuList className="max-lg:flex-col max-lg:items-start max-lg:gap-[20px] max-lg:py-[20px]">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.url;
          return (
            <motion.div key={i} variants={itemVariants}>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={getNavigationMenuTriggerStyle(isActive)}
                >
                  <Link href={item.url || "#"} onClick={onNavigationClick}>
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </motion.div>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
