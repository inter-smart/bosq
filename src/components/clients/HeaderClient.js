"use client";
import Header from "@/components/layout/header";

export default function HeaderClient({ locale, navigationData, data }) {
  return <Header locale={locale} navigationData={navigationData} data={data} />;
}
