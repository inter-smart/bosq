"use client";

import SoftLoginForm from "@/components/form/soft-login-form";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { logoutUser } from "@/store/slices/authSlice";
import { resetCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthBoard = ({ locale }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const logout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();

      if (result) {
        dispatch(resetCart());
        router.push(`/${locale}`);
      }
    } catch (err) {
      console.log("LOG OUT ERROR", err);
    }
  };

  return (
    <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
      <Heading as="h4" size="heading4" className="font-normal text-[#282828] mb-3 2xl:mb-4">
        Personal Information
      </Heading>
      {!user ? (
        <SoftLoginForm />
      ) : (
        <div>
          <Text as="div" size="text3" className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]">
            {/* <span>Connected as</span> {data?.customer?.first_name + " " + data?.customer?.last_name}. */}
          </Text>
          <Text as="div" size="text3" className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]">
            <span>Not you?</span>{" "}
            <div className="inline hover:underline cursor-pointer" onClick={logout}>
              {" "}
              Log out
            </div>
          </Text>
        </div>
      )}
    </div>
  );
};

export default AuthBoard;
