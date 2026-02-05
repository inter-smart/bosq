"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { selectCartIsUpdating } from "@/store/selectors/cart/selectors";
import { toast } from "sonner";

const PriceAndCart = ({ stock, price, item }) => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(selectCartIsUpdating);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const { product_id, id: variant_id } = item;

    try {
      await dispatch(
        addToCart({
          product_id,
          variant_id,
          quantity,
        }),
      ).unwrap();
      toast.success("Item added to cart");
    } catch (error) {
      // error is already the message string (from rejectWithValue or throw)
      toast.error(error || "Failed to add item to cart");
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/, "");
    const numValue = value === "" ? 1 : parseInt(value);
    // Clamp value between 1 and stock
    setQuantity(Math.min(Math.max(numValue, 1), stock));
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-2.5 mb-3 xl:mb-3 2xl:mb-5">
        <div className="w-[60px] xl:w-[60px] 2xl:w-[80px] h-[35px] lg:h-[40px] 2xl:h-[45px] 3xl:h-[55px] flex items-center rounded-[6px] overflow-hidden bg-white border border-[#dedede]">
          <input
            type="text"
            value={quantity}
            onChange={handleChange}
            className="text-[12px] xl:text-[14px] leading-none font-normal text-center text-black w-8/10 overflow-hidden focus:outline-none"
          />
          <div className="w-4/10 flex flex-col align-center justify-center">
            <button onClick={handleDecrement} className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity <= 1}>
              <ChevronUp className="size-3 text-black" />
            </button>

            <button
              onClick={handleIncrement}
              className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity >= stock}
            >
              <ChevronDown className="size-3 text-black" />
            </button>
          </div>
        </div>
        <Button variant={"black"} className="flex-1 max-w-[320px] xl:max-w-[768px]" disabled={isUpdating || stock === 0} asChild>
          <div onClick={handleAddToCart}>
            {isUpdating ? (
              "Adding..."
            ) : (
              <>
                <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" />
                Add to Cart
              </>
            )}
          </div>
        </Button>
      </div>

      <div className="w-full mb-1 xl:mb-2">
        <Text as="div" size="text3" className="text-[#282828] max-w-[95%]">
          {"Total: AED "}
          <span className="font-medium">{(quantity * price).toFixed(2)}</span>
        </Text>
      </div>
    </>
  );
};

export default PriceAndCart;
