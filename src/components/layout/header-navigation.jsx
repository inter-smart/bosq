// "use client"
// import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export default function HeaderNavigation({
  pathname,
  menuItems,
  onNavigationClick,
  locale,
}) {
  //   const isMobile = useIsMobile();

  const getNavigationMenuTriggerStyle = (isActive) => {
    const baseStyle =
      "text-[14px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-start lg:text-center w-full h-auto p-[5px_15px] lg:p-[6px_12px] 2xl:p-[10px_15px] 3xl:p-[15px_25px] bg-transparent border border-transparent hover:bg-black/0 focus:bg-black/0 ring-0 hover:border-white/10 data-[state=open]:border-white/10 data-[state=open]:hover:bg-black/10 data-[state=open]:text-white data-[state=open]:focus:bg-black/10 data-[state=open]:bg-black/10 transition-all duration-200";

    const pageTextColor =
      pathname === `/${locale}`
        ? "text-[#282828] lg:text-white hover:text-white focus:text-white"
        : "text-[#282828] hover:text-[#282828] focus:text-[#282828]";

    const activeColor = isActive ? "text-[#f17423]" : "";

    return `${baseStyle} ${pageTextColor} ${activeColor}`;
  };

  return (
    <NavigationMenu
      //   viewport={true}
    //   defaultValue={"toplevel2"}
      className="w-full max-w-full justify-start lg:justify-center max-lg:[&>div]:w-full static [--radix-navigation-menu-viewport-width: 100%] [--radix-navigation-menu-viewport-height: 176px;]"
    >
      <NavigationMenuList className="xl:gap-x-3 2xl:gap-x-4 max-lg:flex-col max-lg:[&>div]:w-full">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.slug;
          return (
            <motion.div key={i} variants={itemVariants}>
              {item?.hasSubmenu ? (
                <NavigationMenuItem value={"toplevel" + i}>
                  <NavigationMenuTrigger
                    className={cn(getNavigationMenuTriggerStyle(isActive))}
                  >
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className={"min-w-full"}>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                            href="/"
                          >
                            <div className="mb-2 text-lg font-medium sm:mt-4">
                              shadcn/ui
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Beautifully designed components built with
                              Tailwind CSS.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </li>
                      <li href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </li>
                      <li href="/docs/primitives/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(getNavigationMenuTriggerStyle(isActive))}
                  >
                    <Link
                      href={`/${locale}${item.slug}`}
                      onClick={onNavigationClick}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </motion.div>
          );
        })}
      </NavigationMenuList>
      {/* <NavigationMenuViewport className={"bg-red-500"} /> */}
      {/* <NavigationMenuViewport
        className={cn(
          "absolute left-0 top-full flex w-full justify-center",
          "origin-top-center"
        )}
        asChild
      /> */}
    </NavigationMenu>
  );
}
