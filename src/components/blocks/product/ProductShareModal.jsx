"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "/images/share-linkedin.svg",
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
