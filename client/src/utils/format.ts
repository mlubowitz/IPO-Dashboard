// Formatting utility functions

/**
 * Format currency values
 */
export function formatCurrency(value: number | undefined, currency: string = 'USD'): string {
  if (value === undefined || value === null) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large numbers (e.g., market cap)
 */
export function formatNumber(value: number | undefined): string {
  if (value === undefined || value === null) return 'N/A';

  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }

  return `$${value.toFixed(2)}`;
}

/**
 * Get price range string
 */
export function getPriceRange(low?: number, high?: number, currency: string = 'USD'): string {
  if (!low || !high) return 'Price TBD';

  return `${formatCurrency(low, currency)} - ${formatCurrency(high, currency)}`;
}
