"use client";
import parse from "html-react-parser";

export default function CategoryDescription({ category, locale }) {
  if (!category?.description) return null;

  return (
    <section className="w-full">
      {/* Added 'editor-content' class here */}
      <div className="container py-8 xl:py-12 editor-content">{parse(locale === "ar" ? category.description_ar : category.description)}</div>
    </section>
  );
}
