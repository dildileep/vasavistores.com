export const paiseToRupees = (p: number) => p / 100;

export const formatINR = (paise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paiseToRupees(paise));

export const discountPercent = (mrp: number, price: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
