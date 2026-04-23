"use client";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "@/components/utils/custom-image";
import { cn } from "@/lib/utils";
import { useReturnOrderMutation } from "@/store/services/orderApi";

const MAX_PHOTOS = 5;

const labelCls = "block text-xs xl:text-sm font-medium text-[#282828] mb-1";
const inputCls =
  "w-full border border-[#e9e9e9] rounded px-3 py-2 text-sm text-[#282828] placeholder:text-[#bbbcbc] focus:outline-none focus:border-[#282828] transition-colors";

export default function ReturnOrderDialog({ open, onOpenChange, order, locale }) {
  const isEn = locale === "en";
  const t = useTranslations("account");
  const router = useRouter();

  const [returnOrder, { isLoading }] = useReturnOrderMutation();

  const [selectedItemIds, setSelectedItemIds] = useState(new Set());
  const [reason, setReason] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const resetForm = useCallback(() => {
    setSelectedItemIds(new Set());
    setReason("");
    setPickupAddress("");
    photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPhotos([]);
    setPhotoPreviewUrls([]);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [photoPreviewUrls]);

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  const toggleItem = (itemId) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
    setErrors((e) => ({ ...e, items: undefined }));
  };

  const handlePhotoChange = (e) => {
    const incoming = Array.from(e.target.files ?? []);
    const combined = [...photos, ...incoming];

    if (combined.length > MAX_PHOTOS) {
      setErrors((e) => ({ ...e, photos: t("return_photos_max_error") }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const newPreviews = incoming.map((f) => URL.createObjectURL(f));
    setPhotos(combined);
    setPhotoPreviewUrls((prev) => [...prev, ...newPreviews]);
    setErrors((e) => ({ ...e, photos: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photoPreviewUrls[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs = {};
    if (selectedItemIds.size === 0) errs.items = t("return_select_at_least_one");
    if (!reason.trim()) errs.reason = t("return_reason_required");
    if (!pickupAddress.trim()) errs.pickup_address = t("return_pickup_address_required");
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const formData = new FormData();
    formData.append("reason", reason.trim());
    formData.append("pickup_address", pickupAddress.trim());
    selectedItemIds.forEach((id) => formData.append("item_ids", String(id)));
    photos.forEach((file) => formData.append("photos", file));

    try {
      await returnOrder({ orderId: order.id, formData }).unwrap();
      toast.success(t("return_success"));
      router.refresh();
      handleOpenChange(false);
    } catch (error) {
      toast.error(typeof error?.en === "string" ? error.en : t("return_error"));
    }
  };

  const items = order?.items ?? [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} dir={isEn ? "ltr" : "rtl"}>
      <DialogContent className="xl:max-w-[520px] 2xl:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#282828]">
            {t("return_order_title")}
            {order?.order_id && (
              <span className="ms-2 text-sm font-normal text-[#bbbcbc]">#{order.order_id}</span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-1">
          {/* Item selector */}
          <div>
            <p className={cn(labelCls, "mb-2")}>{t("return_select_items")} *</p>
            <div className="flex flex-col gap-2">
              {items.map((orderItem) => {
                const checked = selectedItemIds.has(orderItem.id);
                return (
                  <label
                    key={orderItem.id}
                    className={cn(
                      "flex items-center gap-3 cursor-pointer rounded border p-2.5 transition-colors",
                      checked ? "border-[#282828] bg-[#f9f9f9]" : "border-[#e9e9e9]",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#282828] flex-shrink-0"
                      checked={checked}
                      onChange={() => toggleItem(orderItem.id)}
                    />
                    <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded border border-[#e9e9e9] bg-white">
                      <Image
                        src={orderItem?.variant?.media_path}
                        alt={isEn ? orderItem?.variant?.title : orderItem?.variant?.title_ar}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        quality={80}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#282828] truncate">
                        {isEn ? orderItem?.variant?.title : orderItem?.variant?.title_ar}
                      </p>
                      <p className="text-xs text-[#bbbcbc]">Qty: {orderItem?.quantity}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.items && <p className="text-xs text-red-500 mt-1">{errors.items}</p>}
          </div>

          {/* Reason */}
          <div>
            <label className={labelCls}>{t("return_reason_label")} *</label>
            <textarea
              className={cn(inputCls, "resize-none min-h-[80px]")}
              placeholder={t("return_reason_placeholder")}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setErrors((err) => ({ ...err, reason: undefined }));
              }}
              maxLength={1000}
            />
            {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
          </div>

          {/* Pickup address */}
          <div>
            <label className={labelCls}>{t("return_pickup_address_label")} *</label>
            <input
              type="text"
              className={inputCls}
              placeholder={t("return_pickup_address_placeholder")}
              value={pickupAddress}
              onChange={(e) => {
                setPickupAddress(e.target.value);
                if (e.target.value.trim()) setErrors((err) => ({ ...err, pickup_address: undefined }));
              }}
              maxLength={500}
            />
            {errors.pickup_address && <p className="text-xs text-red-500 mt-1">{errors.pickup_address}</p>}
          </div>

          {/* Photos */}
          <div>
            <label className={labelCls}>{t("return_photos_label")}</label>
            {photoPreviewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {photoPreviewUrls.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded border border-[#e9e9e9] overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`photo-${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length < MAX_PHOTOS && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handlePhotoChange}
                className="text-sm text-[#282828] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[#282828] file:text-white hover:file:bg-[#444] cursor-pointer"
              />
            )}
            <p className="text-xs text-[#bbbcbc] mt-1">
              {photos.length}/{MAX_PHOTOS} {t("return_photos_label")}
            </p>
            {errors.photos && <p className="text-xs text-red-500 mt-1">{errors.photos}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading} className="border-[#e9e9e9] text-[#282828]">
            {t("cancel_order") === "Cancel Order" ? "Cancel" : t("cancel_order")}
          </Button>
          <Button
            variant="black"
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-[130px]"
          >
            {isLoading ? "Submitting…" : t("return_submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
