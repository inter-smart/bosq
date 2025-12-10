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

export default function CartEmpty() {
  return (
    <div className="py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            <Heading as="h1" size="heading1" className="text-[#121212]">
              Your Cart is Empty
            </Heading>
          </EmptyTitle>
          <EmptyDescription>
            <Text as="p" size="text3" className="text-[#282828]">
              Please add products to your cart
            </Text>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant={"black"}
            disabled={false}
            className="min-w-[168px] xl:min-w-[190px] 2xl:min-w-[220px] mt-2"
          >
            See All products Here
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
