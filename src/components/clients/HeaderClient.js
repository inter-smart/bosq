"use client";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/layout/header"), { ssr: true });

export default function HeaderClient({ locale, navigationData, data }) {
  return <Header locale={locale} navigationData={navigationData} data={data} />;
}
