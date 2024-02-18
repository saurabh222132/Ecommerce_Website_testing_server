export const ITEMS_PER_PAGE = 10;
export const BaseURL = "http://localhost:8080";
// export const BaseURL = "https://ecommerce-backend-testing-server.onrender.com";

export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}
