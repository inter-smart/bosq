"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/utils/text";
import Image from "@/components/utils/custom-image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "@/store/slices/cartSlice";
import { selectCartIsUpdating, selectCartItems } from "@/store/selectors/cart/selectors";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const PriceAndCart = ({ stock, price, item, locale, quantity, setQuantity, onEnquireTrigger }) => {
  const isEn = locale === "en";

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isUpdating = useSelector(selectCartIsUpdating);
  const cartItems = useSelector(selectCartItems) || [];
  const cartItem = cartItems.find((cItem) => cItem.variant_id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const t = useTranslations();


  const getValidatedQuantity = (rawQty, { triggerEnquire = false } = {}) => {
    if (rawQty === "") return "";
    let qty = isNaN(rawQty) ? 1 : Number(rawQty);

    if (quantityInCart + qty > 10) {
      if (triggerEnquire) {
        onEnquireTrigger?.();
      }
      return qty;
    }

    if (qty < 1) {
      qty = 1;
    }

    return qty;
  };

  const handleAddToCart = async () => {
    if (isUpdating || stock === 0 || quantity === "") return;

    const { product_id, id: variant_id } = item;
    let qty = isNaN(quantity) ? 1 : Number(quantity);


    if (quantityInCart + qty > 10) {
      onEnquireTrigger?.();
      toast.error(isEn ? "You can only order 10 items at a time. Please contact us for bulk orders." : "يمكنك طلب 10 قطع فقط في المرة الواحدة. يرجى التواصل معنا للطلبات الكبيرة.");
      return;
    }

    if (qty > stock) {
      toast.error(isEn ? "Quantity exceeds available stock" : "الكمية تتجاوز المخزون المتاح");
      return;
    }


    if (qty < 1) {
      qty = 1;
      setQuantity(1);
    }

    try {
      await dispatch(
        addToCart({
          product_id,
          variant_id,
          quantity: qty,
          isAuthenticated,
        }),
      ).unwrap();
      dispatch(fetchCart());
      toast.success(t("product.item_added_to_cart"));
    } catch (error) {
      if (error.requiresLogin) {
        router.push(`/${locale}/login`);
        toast.error(locale === "en" ? error?.message?.en : error?.message?.ar || "Failed to add item to cart");
      } else {

        toast.error(locale === "en" ? error?.en : error?.ar || "Failed to add item to cart");
      }
    }
  };

  const handleIncrement = () => {
    const currentQty = quantity === "" || isNaN(quantity) ? 0 : Number(quantity);
    const newQty = currentQty + 1;

    if (quantityInCart + newQty > 10) {
      onEnquireTrigger?.();
      return;
    }
    if (currentQty < stock) {
      setQuantity(newQty);
    }
  };

  const handleDecrement = () => {
    const currentQty = quantity === "" || isNaN(quantity) ? 0 : Number(quantity);
    if (currentQty > 1) {
      setQuantity(currentQty - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    // Allow the field to be cleared so users can retype a new value
    if (value === "") {
      setQuantity("");
      return;
    }

    setQuantity(parseInt(value, 10));
  };

  const handleBlur = () => {
    setQuantity(getValidatedQuantity(quantity, { triggerEnquire: true }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (quantity !== "") {
        handleAddToCart();
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-2.5 mb-3 xl:mb-3 2xl:mb-5">
        <div className="w-[60px] xl:w-[60px] 2xl:w-[80px] h-[35px] lg:h-[40px] 2xl:h-[45px] 3xl:h-[55px] flex items-center rounded-[6px] overflow-hidden bg-white border border-[#dedede]">
          <input
            type="text"
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-[12px] xl:text-[14px] leading-none font-normal text-center text-black w-8/10 overflow-hidden focus:outline-none"
          />

          <div className="w-4/10 flex flex-col align-center justify-center">
            {/* ✅ Increment (UP) */}
            <button
              onClick={handleIncrement}
              className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity >= stock}
            >
              <ChevronUp className="size-3 text-black" />
            </button>

            {/* ✅ Decrement (DOWN) */}
            <button onClick={handleDecrement} className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity <= 1}>
              <ChevronDown className="size-3 text-black" />
            </button>
          </div>
        </div>
        <Button variant={"black"} className="flex-1 max-w-[320px] xl:max-w-[768px]" disabled={isUpdating || stock === 0 || quantity === ""} asChild>
          <div onClick={quantity === "" || isUpdating || stock === 0 ? undefined : handleAddToCart}>
            {isUpdating ? (
              t("product.adding")
            ) : (
              <>
                <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" quality={90} />
                {t("product.add_to_cart")}
              </>
            )}
          </div>
        </Button>
      </div>

      <div className="w-full mb-1 xl:mb-2">
        <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
          {t("product.total")}
          {":"} {t("common.aed")} <span className="font-medium">{((Number(quantity) || 0) * price).toFixed(2)}</span>
        </Text>
      </div>
    </>
  );
};

export default PriceAndCart;