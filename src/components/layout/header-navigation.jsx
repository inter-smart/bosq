"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "@/components/utils/custom-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});


export default function HeaderNavigation({
  locale,
  isDesktop,
  pathname,
  onNavigationClick,
  menuItems,
  showDarkHeader,
}) {
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const [hoveredSubSubmenu, setHoveredSubSubmenu] = useState(null);

  const router = useRouter();
  const isEN = locale === "en";
  const getNavigationMenuTriggerStyle = (isActive) => {
    const baseStyle =
      "text-[20px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-medium lg:font-normal text-start lg:text-center w-full h-auto p-[8px_15px] lg:p-[6px_12px] 2xl:p-[10px_15px] 3xl:p-[15px_25px] bg-transparent border border-transparent hover:bg-black/0 focus:bg-black/0 ring-0 hover:border-white/10 data-[state=open]:border-white/10 data-[state=open]:hover:bg-black/0 data-[state=open]:focus:bg-black/0 data-[state=open]:bg-black/0 transition-all duration-200 max-lg:justify-between";

    const pageTextColor = showDarkHeader
      ? "text-[#282828] lg:data-[state=open]:text-black hover:text-[#282828] focus:text-[#282828]"
      : "text-[#282828] lg:text-white lg:data-[state=open]:text-white hover:text-white focus:text-white";

    const activeColor = isActive ? "text-[#f17423]" : "";

    return cn(baseStyle, pageTextColor, activeColor);
  };
  const getSubNavMenuTriggerStyle = (isActive, isHovered) => {
    return cn(
      "text-[14px] lg:text-[14px] 2xl:text-[17px] 3xl:text-[22px] leading-normal font-normal text-start hover:bg-black/0 px-0 py-2 2xl:py-3 transition-colors duration-200",
      isActive
        ? "text-[#f17423]"
        : isHovered
          ? "text-black underline"
          : "text-black/80 lg:text-black group-hover:text-black/50",
    );
  };

  const getSubSubNavMenuTriggerStyle = (isActive, isHovered) => {
    return cn(
      "text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-start hover:bg-black/0 px-0 py-2 transition-colors duration-200",
      isActive
        ? "text-[#f17423]"
        : isHovered
          ? "text-black underline"
          : "text-black/60 lg:text-black group-hover:text-black/50",
    );
  };

  const handleNavigation = (slug) => {
    console.log("Navigating to:", slug);
  };

  return (
    <NavigationMenu
      data-motion="from-end"
      viewport={isDesktop ? false : true}
      // defaultValue={"toplevel1"}
      className="w-full max-w-full justify-start lg:justify-center max-lg:[&>div]:w-full static"
    >
      <NavigationMenuList className="xl:gap-x-3 2xl:gap-x-4 max-lg:flex-col max-lg:[&>div]:w-full">
        {menuItems?.map((item, i) => {
          const isActive = pathname === item.slug;
          return item?.hasSubmenu ? (
                <NavigationMenuItem key={i} value={"toplevel" + i}>
                  <NavigationMenuTrigger
                    className={cn(getNavigationMenuTriggerStyle(isActive))}
                    onClick={() => {
                      if (item.slug) router.push(`/${locale}${item.slug}`);
                    }}
                  >
                    {isEN ? item?.name : item?.name_ar}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    data-motion="from-end"
                    className={cn(
                      "md:w-full min-w-full py-1 px-0 lg:py-6 xl:py-16 2xl:py-20",
                      "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-0",
                    )}
                  >
                    <div className="container">
                      <div className="flex justify-between">
                        <ul
                          className="group w-full lg:w-3/12 relative z-0"
                          onMouseLeave={() => {
                            setHoveredSubmenu(null);
                            setHoveredSubSubmenu(null);
                          }}
                        >
                          {item?.items?.slice(0, 8).map((subItem, i) => {
                            const isSubActive = pathname === subItem.slug;
                            const hasSubSubItems =
                              subItem?.items && subItem.items.length > 0;
                            const isSubHovered =
                              hoveredSubmenu?.id === subItem.id;

                            return (
                              <li
                                key={"subItem" + i}
                                onMouseEnter={() => {
                                  setHoveredSubmenu(subItem);
                                  if (hasSubSubItems) {
                                    setHoveredSubSubmenu(null);
                                  }
                                }}
                              >
                                {subItem.slug ? (
                                  <NavigationMenuLink
                                    className={getSubNavMenuTriggerStyle(
                                      isSubActive,
                                      isSubHovered,
                                    )}
                                    asChild
                                  >
                                    <Link
                                      href={`/${locale}${subItem.slug}`}
                                      onClick={onNavigationClick}
                                    >
                                      {isEN ? subItem.name : subItem.name_ar}
                                    </Link>
                                  </NavigationMenuLink>
                                ) : (
                                  <div
                                    className={getSubNavMenuTriggerStyle(
                                      isSubActive,
                                      isSubHovered,
                                    )}
                                  >
                                    {isEN ? subItem.name : subItem.name_ar}
                                  </div>
                                )}

                                {hasSubSubItems && (
                                  <div
                                    className={cn(
                                      "w-full h-full lg:w-[320px] xl:w-[420px] 2xl:w-[500px] 3xl:w-[576px] lg:absolute top-0 left-full transition-opacity duration-200",
                                      hoveredSubmenu?.id === subItem.id
                                        ? "opacity-100 pointer-events-auto max-h-auto"
                                        : "opacity-0 pointer-events-none max-h-0",
                                    )}
                                  >
                                    <ul>
                                      {subItem.items.map((subSubItem) => {
                                        const isSubSubActive =
                                          pathname === subSubItem.slug;
                                        const isSubSubHovered =
                                          hoveredSubSubmenu?.id ===
                                          subSubItem.id;

                                        return (
                                          <li
                                            key={"subsubmenu" + subSubItem.id}
                                            onMouseEnter={() =>
                                              setHoveredSubSubmenu(subSubItem)
                                            }
                                          >
                                            {subSubItem.slug ? (
                                              <NavigationMenuLink
                                                className={getSubSubNavMenuTriggerStyle(
                                                  isSubSubActive,
                                                  isSubSubHovered,
                                                )}
                                                asChild
                                              >
                                                <Link
                                                  href={`/${locale}${subSubItem.slug}`}
                                                  onClick={() => {
                                                    handleNavigation(
                                                      subSubItem.slug,
                                                    );
                                                    onNavigationClick();
                                                  }}
                                                >
                                                  {isEN
                                                    ? subSubItem.name
                                                    : subSubItem.name_ar}
                                                </Link>
                                              </NavigationMenuLink>
                                            ) : (
                                              <div
                                                className={getSubSubNavMenuTriggerStyle(
                                                  isSubSubActive,
                                                  isSubSubHovered,
                                                )}
                                              >
                                                {isEN
                                                  ? subSubItem.name
                                                  : subSubItem.name_ar}
                                              </div>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                          {item?.items?.length > 8 && (
                            <li>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${locale}${item.slug}`}
                                  onClick={onNavigationClick}
                                  className="inline-block mt-3 text-[14px] 2xl:text-[17px] 3xl:text-[22px] font-medium text-[#f17423] hover:underline transition-colors duration-200"
                                >
                                  View All
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          )}
                        </ul>

                        {/* Image container */}
                        <MediaQuery minWidth={1024}>
                          <div className="w-4/12">
                            {(() => {
                              // Priority: hoveredSubSubmenu > hoveredSubmenu > first item
                              let imageToShow = null;
                              let nameToShow = "" || "placeholder";

                              if (hoveredSubSubmenu?.image) {
                                imageToShow = hoveredSubSubmenu.image;
                                nameToShow = hoveredSubSubmenu.name;
                              } else if (hoveredSubmenu?.image) {
                                imageToShow = hoveredSubmenu.image;
                                nameToShow = hoveredSubmenu.name;
                              } else if (item.items[0]?.image) {
                                imageToShow = item.items[0].image;
                                nameToShow = item.items[0].name;
                              }

                              return imageToShow ? (
                                <div
                                  className={cn(
                                    "w-full aspect-[3/2] overflow-hidden rounded-lg bg-gray-100",
                                  )}
                                >
                                  <Image
                                    src={imageToShow}
                                    alt={nameToShow}
                                    title={nameToShow}
                                    width={450}
                                    height={300}
                                    className="w-full h-full object-cover hover:scale-110 transition"
                                    quality={90}
                                  />
                                </div>
                              ) : null;
                            })()}
                          </div>
                        </MediaQuery>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink
                    className={cn(getNavigationMenuTriggerStyle(isActive))}
                    asChild
                  >
                    <Link
                      href={`/${locale}${item.slug}`}
                      onClick={onNavigationClick}
                    >
                      {isEN ? item?.name : item?.name_ar}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
