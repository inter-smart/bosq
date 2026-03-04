"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/common/socialMediaIcons";


export default function ProductShareModal({ open, onClose, locale }) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const encodedUrl = encodeURIComponent(pageUrl);
  const isEn = locale !== "ar";

  const shareLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedUrl}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] sm:max-w-[540px] p-6 gap-5">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-[13px] xl:text-[14px] font-normal text-[#282828]">
            {isEn ? "Share" : "مشاركة"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 justify-center">
          {shareLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 hover:opacity-70 transition"
            >
              <span className="w-12 h-12 rounded-full bg-[#f2f2f2] border border-[#e9e9e9] flex items-center justify-center">
                {item.id === "whatsapp" ? (
                  <WhatsAppIcon />
                ) : item.id === "facebook" ? (
                  <FacebookIcon />
                ) : item.id === "instagram" ? (
                  <InstagramIcon />
                ) : item.id === "linkedin" ? (
                  <LinkedInIcon />
                ) : (
                  <Image src={item.icon} alt={item.label} width={22} height={22} unoptimized />
                )}
              </span>
              <span className="text-[10px] xl:text-[11px] text-[#282828] font-light">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 border border-[#dedede] rounded-[4px] px-3 py-2 bg-[#f8f8f8]">
          <span className="flex-1 text-[9px] xl:text-[10px] text-[#808080] truncate">{pageUrl}</span>
          <Button
            variant="black"
            className="text-[9px] xl:text-[10px] h-6 px-2.5 rounded-[2px] shrink-0"
            onClick={handleCopy}
          >
            {copied ? (isEn ? "Copied!" : "تم النسخ!") : (isEn ? "Copy" : "نسخ")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


