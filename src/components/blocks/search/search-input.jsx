"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
  "Search by Category",
  "Ergonomic Chairs",
  "Office Chairs",
];

export default function SearchInput({ locale }) {
  const handleChange = (e) => {
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
      autoFocus
      locale={locale}
      className="max-w-full"
      variant="search"
    />
  );
}
