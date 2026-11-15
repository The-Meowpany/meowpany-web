// Return on investment of a software project for a small business: what the current manual way
// of working costs every month, against what the project costs, and how fast it pays for itself.

export type RoiInput = {
  hoursLostPerWeek: number; // Time the team spends on work the software would do.
  hourlyCost: number; // Loaded cost of one hour of that team, in USD.
  errorsPerMonth: number; // Mistakes caused by manual work (wrong orders, lost bookings...).
  costPerError: number; // What one mistake costs, in USD.
  salesLostPerMonth: number; // Sales missed today, e.g. from not selling online, in USD of margin.
  projectPrice: number; // One-time price of the project, in USD.
  monthlySupport: number; // Monthly support plan, in USD.
};

export type RoiResult = {
  monthlyLoss: number; // What the current way costs per month.
  monthlyNet: number; // Monthly savings after paying for support.
  paybackMonths: number | null; // Months until the project has paid for itself; null if never.
  net12: number; // Net gain after 12 months, project price included.
  net36: number;
  breakdown: { time: number; errors: number; sales: number };
};

const WEEKS_PER_MONTH = 52 / 12;

const clean = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

export function roi(input: RoiInput): RoiResult {
  const time = clean(input.hoursLostPerWeek) * WEEKS_PER_MONTH * clean(input.hourlyCost);
  const errors = clean(input.errorsPerMonth) * clean(input.costPerError);
  const sales = clean(input.salesLostPerMonth);
  const monthlyLoss = time + errors + sales;
  const monthlyNet = monthlyLoss - clean(input.monthlySupport);
  const price = clean(input.projectPrice);
  const paybackMonths = monthlyNet > 0 ? Math.ceil((price / monthlyNet) * 10) / 10 : null;
  const round = (n: number) => Math.round(n);
  return {
    monthlyLoss: round(monthlyLoss),
    monthlyNet: round(monthlyNet),
    paybackMonths,
    net12: round(monthlyNet * 12 - price),
    net36: round(monthlyNet * 36 - price),
    breakdown: { time: round(time), errors: round(errors), sales: round(sales) },
  };
}
