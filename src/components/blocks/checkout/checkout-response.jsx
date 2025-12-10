import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function CheckoutResponse({ orderStatus }) {
  return (
    <div className="w-full py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image
              src="/images/icon-checkout-success.svg"
              alt="icon-checkout-success"
              width={100}
              height={100}
              className="w-[30px] xl:w-[50px]"
            />
          </EmptyMedia>
          <EmptyTitle>
            <Heading as="h1" size="heading1" className="text-[#282828]">
              Thank You for the Purchase !
            </Heading>
          </EmptyTitle>
          <EmptyDescription>
            <Text as="p" size="text2" className="font-normal text-[#282828]">
              ORDER ID #BOSQ1400
            </Text>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Text as="div" size="text3" className="text-[#282828]">
            {parse(
              "<p>Your order was successful. You'll receive a confirmation shortly.</p>"
            )}
          </Text>
          <div className="flex gap-2 xl:gap-5">
            <Button
              variant={"black"}
              disabled={false}
              className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px]"
            >
              Explore More
            </Button>
            <Button
              variant={"white"}
              disabled={false}
              className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px] border border-black"
              asChild
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
      <hr />
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image
              src="/images/icon-checkout-error.svg"
              alt="icon-checkout-error"
              width={100}
              height={100}
              className="w-[30px] xl:w-[50px]"
            />
          </EmptyMedia>
          <EmptyTitle>
            <Heading as="h1" size="heading1" className="text-[#282828]">
              Payment Failed
            </Heading>
          </EmptyTitle>
          <EmptyDescription>
            <Text as="p" size="text2" className="font-normal text-[#282828]">
              ORDER ID #BOSQ1400
            </Text>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Text as="div" size="text3" className="text-[#282828]">
            {parse(
              "<p>We couldn’t place your order .Please double-check your shipping <br /> and payment information.</p>"
            )}
          </Text>
          <div className="flex gap-2 xl:gap-5">
            <Button
              variant={"black"}
              disabled={false}
              className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px]"
            >
              Try Again
            </Button>
            <Button
              variant={"white"}
              disabled={false}
              className="font-normal min-w-[120px] xl:min-w-[140px] 2xl:min-w-[200px] border border-black"
              asChild
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
