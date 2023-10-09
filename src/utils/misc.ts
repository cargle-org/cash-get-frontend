// import jwtDecode from "jwt-decode";

export const isObjectEmpty = (obj: Record<string, unknown>): boolean => {
  for (const _i in obj) return false;
  return true;
};

export const nairaCurrencyFormatter = (num: number | string) => {
  return `₦${Intl.NumberFormat("en-US", {
    currencyDisplay: "symbol",
  }).format(parseFloat(`${num}`))}`;
};
