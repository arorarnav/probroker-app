// Single source of truth for pricing. Both the dashboard (to show prices)
// and the API routes (to validate and charge the correct amount) import
// from here -- so there's never a mismatch between what's displayed and
// what's actually charged.
export const PRICING_TIERS = [
  { months: 3, priceInr: 299 },
  { months: 6, priceInr: 349 },
  { months: 12, priceInr: 449 },
  { months: 60, priceInr: 619 },
];

export function getTierByMonths(months) {
  return PRICING_TIERS.find((t) => t.months === months) || null;
}
