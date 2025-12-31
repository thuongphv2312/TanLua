export const PARAMETERS = {
  NEWS: "NEWS",
  CONTACT: "CONTACT",
  ABOUT: "ABOUT",
  CHECKOUT: "CHECKOUT",
  CART: "CART",
  SEARCH: 'SEARCH',
  INDUSTRIAL_MACHINERY: "INDUSTRIAL_MACHINERY",
  AGRICULTURAL_MACHINERY: "AGRICULTURAL_MACHINERY",
};

// Định nghĩa các hằng số route để tránh gõ nhầm chữ (typo)
export const ROUTE_MAP: Record<string, string> = {
  [PARAMETERS["NEWS"]]: "/news",
  [PARAMETERS["INDUSTRIAL_MACHINERY"]]: "/may-cong-nghiep",
  [PARAMETERS["AGRICULTURAL_MACHINERY"]]: "/may-nong-nghiep",
  [PARAMETERS["ABOUT"]]: "/about-us",
  [PARAMETERS["CONTACT"]]: "/contact",
  [PARAMETERS["CHECKOUT"]]: "/checkout",
  [PARAMETERS["CART"]]: "/cart",
  [PARAMETERS["SEARCH"]]: "/search",
};
