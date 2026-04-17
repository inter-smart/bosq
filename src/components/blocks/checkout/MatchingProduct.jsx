import { fetchApi } from "@/lib/api/server";
import MatchingProductClient from "./MatchingProductClient";

const MatchingProduct = async ({ locale }) => {
  let items = [];

  try {
    const res = await fetchApi("/api/frontend/cart/matching-products", {}, true);
    items = res?.data || [];
  } catch {
    // fail silently — hide the section if the request errors
  }

  if (!items.length) return null;

  const data = {
    frequentlyBought: {
      items,
    },
  };

  return <MatchingProductClient data={data} locale={locale} />;
};

export default MatchingProduct;
