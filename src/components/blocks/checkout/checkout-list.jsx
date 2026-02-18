import OrderSummary from "./OrderSummary";
import AddressSection from "./AddressSection";
import AuthBoard from "./AuthBoard";
import MatchingProduct from "./MatchingProduct";
import OrderSummaryPage from "./OrderSummaryPage";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";
import CheckoutResponse from "./checkout-response";

export default function CheckoutList({ locale }) {
  return (
    <>
      <section className="w-full block py-[10px_30px] xl:py-[15px_60px] 2xl:py-[20px_100px] relative z-0">
        <div className="container">
          <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:px-2.5 xl:[&>*]:px-8 2xl:[&>*]:px-10 [&>*]:py-3 xl:[&>*]:py-5 2xl:[&>*]:py-7">
            {/* <MatchingProduct data={data} locale={locale} /> */}

            <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)]">
              {/* Personal Information */}
              <AuthBoard locale={locale} />

              {/* Shipping Address Block */}
              <AddressSection locale={locale} />
            </div>

            {/* Order Summary Sidebar */}
            <OrderSummaryPage locale={locale} />
          </div>
        </div>

        {/* Place Order Button - Mobile */}
        {/* <MediaQuery maxWidth={639}>
          <hr />
          <div className="w-full py-1 px-4 pb-2 bg-white sticky z-1 bottom-0 left-0 right-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)]">
            <Button variant={"black"} disabled={loading || !termsAccepted} onClick={handlePlaceOrder} className="min-w-full">
              {loading ? "Placing order..." : "Place Order"}
            </Button>
          </div>
        </MediaQuery> */}
      </section>
    </>
  );
}
