// Commercial terms the site states. There is no price list: every project is quoted from its own
// requirements, and the fixed price is sent after the client has seen the first version working.

/** The first clients get a discount on their quote in exchange for publishing the case. */
export const launch = { clients: 5 } as const;

/** Standing offers (the offers page). Every one of them is written into the client's proposal. */
export const offers = {
  starterSupportMonths: 3, // A website or store comes with this many months of support included.
  annualFreeMonths: 2, // Paying a support plan a year in advance, these months are free.
  referralFreeMonths: 1, // Both the client who refers and the company referred get this many months.
  codeOnlyInstallments: 6, // Interest-free monthly instalments when the client takes the code without support.
} as const;

/** Commission for people who bring clients in, as a share of the first project actually collected. */
export const commissions = { closer: 10, accountant: 10 } as const;

/** Support plans: only commitments the team can keep today (response times are tracked in Core). */
export const supportPlans = [
  { key: "basic", responseHours: { es: "2 días hábiles", en: "2 business days" }, improvementHours: 0 },
  { key: "pro", responseHours: { es: "1 día hábil", en: "1 business day" }, improvementHours: 2 },
  { key: "premium", responseHours: { es: "4 horas hábiles", en: "4 business hours" }, improvementHours: 5 },
] as const;
