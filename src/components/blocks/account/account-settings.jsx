import AccountNav from "./account-nav";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import parse from "html-react-parser";

import { cn } from "@/lib/utils";
import { OrderEmpty } from "./order-empty";
import AddressForm from "@/components/form/address-form";
import PersonalInformationForm from "@/components/form/personal-information-form";
import PasswordChangeForm from "@/components/form/password-change-form";

export default function AccountSettings({ data, locale }) {
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-1 xl:-mx-1.5 2xl:-mx-2 [&>*]:p-1 xl:[&>*]:p-1.5 2xl:[&>*]:p-2">
          <div className="w-full sm:w-[200px] xl:w-[240px] 2xl:w-[268px] 3xl:w-[330px]">
            <AccountNav />
          </div>

          <div className="w-full sm:w-[calc(100%-200px)] xl:w-[calc(100%-240px)] 2xl:w-[calc(100%-268px)] 3xl:w-[calc(100%-330px)] max-sm:mb-2">
            {data?.coupons?.length === 0 ? (
              <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
                <OrderEmpty
                  title={"No Coupons Available"}
                  description={
                    "Once you place your first order, you'll be able to track your deliveries and manage returns from here."
                  }
                />
              </div>
            ) : (
              <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
                <Heading
                  as="h2"
                  size={"heading5"}
                  className="font-semibold text-[#282828] mb-2 xl:mb-4"
                >
                  Account Settings
                </Heading>
                <div className="w-full border border-[#e9e9e9] sm:rounded-e-lg py-3 xl:py-6 3xl:py-9 px-3 xl:px-4 3xl:px-5">
                  <Heading
                    as="h4"
                    size="heading5"
                    className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
                  >
                    Personal Information
                  </Heading>
                  <PersonalInformationForm />
                  <Heading
                    as="h4"
                    size="heading5"
                    className="font-normal text-[#282828] mb-3 xl:mb-5 2xl:mb-8 mt-6 xl:mt-10 2xl:mt-12"
                  >
                    Password Change
                  </Heading>
                  <div className="flex">
                    <div className="w-full lg:w-1/2">
                      <PasswordChangeForm />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
