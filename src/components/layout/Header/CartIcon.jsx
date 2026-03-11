"use client";
import { Button } from "@/components/ui/button";
import { selectCartCount, selectCartIsLoading } from "@/store/selectors/cart/selectors";
import { fetchCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CartIcon = ({ showDarkHeader, locale }) => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);


  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Button variant="none" size="none" asChild>
      <Link href={`/${locale}/cart`} className="relative inline-flex">
        <Image
          src={showDarkHeader ? "/images/icon-bag-dark.svg" : "/images/icon-bag.svg"}
          alt="bag"
          width={12}
          height={12}
          unoptimized
          className="w-[15px] 2xl:w-[18px]"
        />

        {cartCount > 0 && (
          <span
            className="
              absolute -top-[6px] -right-[6px]
              min-w-[16px] h-[16px]
              px-[4px]
              flex items-center justify-center
              rounded-full
              bg-red-600 text-white
              text-[9px] 2xl:text-[10px]
              font-semibold
              leading-[1]
            "
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIcon;
