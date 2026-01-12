"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export default function MobileHeaderNavigation({
  pathname,
  menuItems,
  onNavigationClick,
  locale,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <div className="w-full">
      {menuItems.map((item, i) => {
        const isActive = pathname === item.slug;
        const isOpen = openMenu === i;

        return (
          <motion.div key={i} variants={itemVariants} className="px-4">
            {/* TOP LEVEL */}
            <div className="flex items-center justify-between py-3">
              <Link
                href={`/${locale}${item.slug ?? ""}`}
                onClick={onNavigationClick}
                className={cn(
                  "text-[20px] font-medium",
                  isActive && "text-[#f17423]"
                )}
              >
                {item.name}
              </Link>

              {item.hasSubmenu && (
                <button
                  onClick={() => toggleMenu(i)}
                  className="p-0"
                  aria-label="Toggle submenu"
                >
                  <ChevronDownIcon
                    className={cn(
                      "size-4 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              )}
            </div>

            {/* SUB MENU */}
            {item.hasSubmenu && isOpen && (
              <div className="space-y-4">
                {item.items?.map((subItem) => {
                  const isSubOpen = openSubMenu === subItem.id;
                  const hasSubSub = subItem.items?.length > 0;

                  return (
                    <div key={subItem.id}>
                      <div className="flex justify-between items-center">
                        {subItem.slug ? (
                          <Link
                            href={`/${locale}${subItem.slug}`}
                            onClick={onNavigationClick}
                            className="text-[15px] text-black/80"
                          >
                            {subItem.name}
                          </Link>
                        ) : (
                          <span className="text-[15px]">{subItem.name}</span>
                        )}

                        {hasSubSub && (
                          <button
                            onClick={() => toggleSubMenu(subItem.id)}
                            className="p-0"
                          >
                            <ChevronDownIcon
                              className={cn(
                                "size-4 transition-transform",
                                isSubOpen && "rotate-180"
                              )}
                            />
                          </button>
                        )}
                      </div>

                      {/* SUB SUB MENU */}
                      {hasSubSub && isSubOpen && (
                        <div className="pt-4 space-y-3">
                          {subItem.items.map((subSubItem) => (
                            <Link
                              key={subSubItem.id}
                              href={`/${locale}${subSubItem.slug}`}
                              onClick={onNavigationClick}
                              className={cn(
                                "block text-[13px] text-black/60",
                                pathname === subSubItem.slug && "text-[#f17423]"
                              )}
                            >
                              {subSubItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
