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

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    },
    () => {
      console.error("Failed to copy");
      /* Rejected - text failed to copy to the clipboard */
    }
  );
};
