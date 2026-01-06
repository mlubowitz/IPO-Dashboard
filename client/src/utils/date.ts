// Date utility functions
import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';

/**
 * Format a date string to readable format
 */
export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return '';
  }
}

/**
 * Calculate days until IPO
 */
export function getDaysUntilIPO(ipoDate: string): number {
  try {
    const date = parseISO(ipoDate);
    const today = new Date();
    return differenceInDays(date, today);
  } catch (error) {
    return 0;
  }
}

/**
 * Get date range for API queries
 * Fetches from 2024 onwards to capture historical and upcoming IPOs
 * Default extends 2 years into the future to get maximum upcoming IPO coverage
 */
export function getDateRange(months: number = 24): { from: string; to: string } {
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + months);

  return {
    from: '2024-01-01',
    to: format(futureDate, 'yyyy-MM-dd'),
  };
}
