"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Text } from "@/components/utils/text";
import Link from "next/link";
import { Heading } from "@/components/utils/heading";
import Image from "@/components/utils/custom-image";
import { useTranslations } from "next-intl";

export function OrderEmpty({
  mediaUrl = "/images/order-empty.svg",
  title,
  description,
}) {
  const t = useTranslations("cart");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Image
            src={mediaUrl}
            alt="order-empty"
            width={100}
            height={90}
            className="w-[60px] xl:w-[80px] 2xl:w-[100px]"
            quality={90}
          />
        </EmptyMedia>
        <EmptyTitle>
          <Heading
            as="h3"
            size="heading3"
            className="font-normal text-[#121212]"
          >
            {title}
          </Heading>
        </EmptyTitle>
        <EmptyDescription>
          <Text as="p" size="text3" className="text-[#282828]">
            {description}
          </Text>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant={"black"}
          disabled={false}
          className="min-w-[168px] xl:min-w-[190px] 2xl:min-w-[220px] mt-2"
          asChild
        >
          <Link href="/en/products">{t("continue_shopping")}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
