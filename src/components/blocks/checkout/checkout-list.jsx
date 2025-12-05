"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useState } from "react";

const local_data = {
  id: 1,
  customer_email: "john@example.com",
  customer_first_name: "John",
  customer_last_name: "Doe",
  shipping_method: "flatrate_flatrate",
  coupon_code: "FLAT10%",
  items_count: 2,
  items_qty: 4,
  base_currency_code: "AED",
  channel_currency_code: "AED",
  cart_currency_code: "AED",
  grand_total: 10,
  formatted_grand_total: "$10.00",
  base_grand_total: 10,
  formatted_based_grand_total: "$10.00",
  sub_total: 10,
  formatted_sub_total: "$10.00",
  base_sub_total: 10,
  formatted_based_sub_total: "$10.00",
  tax_total: 10,
  formatted_tax_total: "$10.00",
  base_tax_total: 10,
  formatted_based_tax_total: "$10.00",
  discount: 10,
  formatted_discount: "$10.00",
  base_discount: 10,
  formatted_based_discount: "$10.00",
  is_guest: true,
  is_active: true,
  customer: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "example@example.com",
    gender: "Male",
    date_of_birth: "1991-05-15",
    phone: "1234567890",
    status: "1",
    subscribed_to_news_letter: "1",
    image: "http://localhost/private/storage/customer/image.jpg",
    notes: "string",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  items: {
    id: 1,
    quantity: 2,
    slug: "wooden-chair",
    type: "configurable",
    name: "Orca Mid Back Ergonomic Office Chair",
    description: "light grey Frisco fabric with aquaclean 2063",
    weight: 1.5,
    total_weight: 3,
    price: 458,
    formatted_price: "AED 458",
    base_price: 10,
    formatted_based_price: "AED 10.00",
    total: 18.26,
    formatted_total: "AED 18.26",
    base_total: 20,
    formatted_based_total: "AED 20.00",
    tax_percent: 2,
    tax_amount: 0.37,
    formatted_tax_amount: "AED 0.37",
    base_tax_amount: 0.41,
    formatted_based_tax_amount: "AED 0.41",
    attributes: {
      size: {
        option_id: 8,
        option_label: "L",
        attribute_name: "Size",
      },
      color: {
        option_id: 5,
        option_label: "White",
        option_code: "#fff",
        attribute_name: "Color",
      },
    },
    child: "string",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  selected_shipping_rate: {
    id: 1,
    carrier: "flatrate",
    carrier_title: "Flat Rate",
    method: "flatrate_flatrate",
    method_title: "Flat Rate",
    method_description: "Flat Rate Shipping",
    price: 9.15,
    formatted_price: "€9.15",
    base_price: 10,
    formatted_based_price: "$10.00",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  payment: {
    id: 1,
    method: "cashondelivery",
    method_title: "Cash On Delivery",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  billing_address: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    name: "John Doe",
    email: "john@example.com",
    address1: ["819, Farnum Road"],
    address2: "St. Elmira",
    country: "US",
    country_name: "United States",
    state: "MD",
    city: "Woodbine",
    postcode: 21797,
    phone: "1234567890",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  shipping_address: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    name: "John Doe",
    email: "john@example.com",
    address1: ["819, Farnum Road"],
    address2: "St. Elmira",
    country: "US",
    country_name: "United States",
    state: "MD",
    city: "Woodbine",
    postcode: 21797,
    phone: "1234567890",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
  created_at: "2020-01-27 17:50:45",
  updated_at: "2020-01-27 17:50:45",
};

export default function CheckoutList({ locale, data }) {
  const [loading, setLoading] = useState(false);
  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px]">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-4 2xl:-mx-5 [&>*]:p-2.5 xl:[&>*]:p-4 2xl:[&>*]:p-5">
          <div className="w-full lg:w-[calc(100%-420px)] xl:w-[calc(100%-468px)] 2xl:w-[calc(100%-520px)] 3xl:w-[calc(100%-576px)] max-sm:mb-2">
            aaaaa
          </div>
          <div className="w-full lg:w-[420px] xl:w-[468px] 2xl:w-[520px] 3xl:w-[576px] xl:p-5">
            {/* <div className="w-full lg:w-[520px] xl:w-[668px] 2xl:w-[800px] 3xl:w-[1000px]"></div> */}
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-lg p-3 sm:p-4 xl:p-7 2xl:p-8">
              <Heading
                as="div"
                size="heading4"
                className="text-[#282828] mb-3 xl:mb-5 2xl:mb-8"
              >
                Order Summary
              </Heading>
              <Text
                as="div"
                size="none"
                className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#282828] my-2 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Subtotal (2)</span>
                AED 1058
              </Text>
              <Text
                as="div"
                size="none"
                className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#282828] my-2 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Shipping Charge</span>
                Free
              </Text>
              <hr />
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>Total Price</span>
                AED 1058
              </Text>

              <Button
                variant={"black"}
                disabled={loading}
                className="min-w-full"
              >
                {loading ? "Sending..." : "Checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
