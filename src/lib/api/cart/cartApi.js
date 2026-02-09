import { fetchFromAPIWithCredentials, fetchWithCredentials } from "@/lib/helper";

// Get cart
export async function fetchCartAPI() {
  return fetchWithCredentials("/api/frontend/cart", {
    method: "GET",
  });
}

// Add item to cart
export async function addToCartAPI({ product_id, variant_id, quantity = 1 }) {
  return fetchWithCredentials("/api/frontend/cart/add", {
    method: "POST",
    body: JSON.stringify({ product_id, variant_id, quantity }),
  });
}

// Update cart item quantity
export async function updateCartItemAPI({ itemId, quantity, variant_id }) {
  return fetchWithCredentials(`/api/frontend/cart/item/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity, variant_id }),
  });
}

// Remove item from cart
export async function removeCartItemAPI({ itemId }) {
  return fetchWithCredentials(`/api/frontend/cart/item/${itemId}`, {
    method: "DELETE",
  });
}

// Clear cart
export async function clearCartAPI(session_id = null) {
  return fetchWithCredentials("/api/frontend/cart/clear", {
    method: "DELETE",
  });
}

// Merge guest cart into user cart (call after login)
export async function mergeCartAPI() {
  return fetchFromAPIWithCredentials("/api/frontend/cart/merge", {
    method: "POST",
  });
}
