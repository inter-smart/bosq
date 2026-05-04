import { fetchFromAPIWithCredentials, fetchWithCredentials } from "@/lib/helper";

// Get cart
export async function fetchCartAPI() {
  return fetchWithCredentials("/api/frontend/cart", {
    method: "GET",
  });
}

// Add item to cart
export async function addToCartAPI({ product_id, variant_id, isAuthenticated, quantity = 1 }) {
  return fetchWithCredentials("/api/frontend/cart/add", {
    method: "POST",
    body: JSON.stringify({ product_id, variant_id, isAuthenticated, quantity }),
  });
}

// Add items to cart
export async function addToCartTogetherAPI({ variant_ids, isAuthenticated }) {
  return fetchWithCredentials("/api/frontend/cart/add-together", {
    method: "POST",
    body: JSON.stringify({ variant_ids, isAuthenticated }),
  });
}

// Buy now (add to cart and redirect to checkout)
export async function buyNowAPI({ product_id, variant_id, isAuthenticated, quantity = 1 }) {
  return fetchWithCredentials("/api/frontend/cart/buynow", {
    method: "POST",
    body: JSON.stringify({ product_id, variant_id, isAuthenticated, quantity }),
  });
}

// Update cart item quantity
export async function updateCartItemAPI({ itemId, quantity, variant_id, isAuthenticated }) {
  return fetchWithCredentials(`/api/frontend/cart/item/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity, variant_id, isAuthenticated }),
  });
}

// Remove item from cart
export async function removeCartItemAPI({ itemId, isAuthenticated }) {
  return fetchWithCredentials(`/api/frontend/cart/item/${itemId}`, {
    method: "DELETE",
    body: JSON.stringify({ isAuthenticated }),
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

// Copy user cart to guest session before logout (so cart persists after logout)
export async function keepCartAsGuestAPI() {
  return fetchFromAPIWithCredentials("/api/frontend/cart/keep-as-guest", {
    method: "POST",
  });
}

// Get matching products based on the most repeated category in the cart
export async function fetchMatchingProductsAPI() {
  return fetchFromAPIWithCredentials("/api/frontend/cart/matching-products", {
    method: "GET",
  });
}
