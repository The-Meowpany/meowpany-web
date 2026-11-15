// List prices from the business plan (section 11), anchored to the median and mean of six
// Uruguayan price lists published in 2026. Prices are in USD; local clients add 22 % VAT.

export type ServiceKey = "website" | "store" | "custom" | "support" | "hours";

export const prices = {
  website: { from: 1000, extraPage: 120, includedPages: 6 },
  store: { from: 2200, largeCatalog: 400, largeCatalogThreshold: 100, extraPayment: 150 },
  custom: { from: 3000, typical: 6000 },
  support: { basic: 50, pro: 120, premium: 200 },
  hours: { rate: 35 },
} as const;

export type QuoteInput = {
  service: ServiceKey;
  pages?: number;
  products?: number;
  extraPayments?: number;
  supportPlan?: keyof typeof prices.support;
  hoursPerMonth?: number;
};

/** A first estimate shown in the quote form. The team confirms the final price after a call. */
export function estimate(input: QuoteInput): { amount: number; monthly: boolean; from: boolean } {
  switch (input.service) {
    case "website": {
      const extra = Math.max(0, (input.pages ?? 0) - prices.website.includedPages);
      return { amount: prices.website.from + extra * prices.website.extraPage, monthly: false, from: false };
    }
    case "store": {
      const big = (input.products ?? 0) > prices.store.largeCatalogThreshold ? prices.store.largeCatalog : 0;
      const payments = Math.max(0, input.extraPayments ?? 0) * prices.store.extraPayment;
      return { amount: prices.store.from + big + payments, monthly: false, from: false };
    }
    case "custom":
      return { amount: prices.custom.from, monthly: false, from: true };
    case "support":
      return { amount: prices.support[input.supportPlan ?? "basic"], monthly: true, from: false };
    case "hours":
      return { amount: prices.hours.rate * Math.max(10, input.hoursPerMonth ?? 40), monthly: true, from: false };
  }
}
