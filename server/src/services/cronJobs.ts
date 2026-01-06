// Cron jobs for scheduled tasks
import cron from 'node-cron';
import { getIPOCalendar } from './finnhub.js';

/**
 * Initialize cron jobs for the application
 */
export function initializeCronJobs() {
  // Refresh IPO data daily at 6:00 AM
  cron.schedule('0 6 * * *', async () => {
    console.log('Running daily IPO data refresh...');

    try {
      // Get IPO data from 2024 onwards to capture historical and upcoming IPOs
      const from = '2024-01-01';
      const threeMonthsLater = new Date();
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

      const to = threeMonthsLater.toISOString().split('T')[0];

      const ipos = await getIPOCalendar(from, to);
      console.log(`Fetched ${ipos.length} upcoming IPOs`);

      // You could optionally cache this data in a database or file
      // For now, we'll just log it
    } catch (error) {
      console.error('Error refreshing IPO data:', error);
    }
  });

  console.log('Cron jobs initialized');
}
