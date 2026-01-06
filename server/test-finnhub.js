// Quick test script to verify Finnhub API key
import 'dotenv/config';
import axios from 'axios';

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

console.log('Testing Finnhub API...');
console.log('API Key:', FINNHUB_API_KEY ? `${FINNHUB_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

async function testAPI() {
  try {
    // Test 1: Basic API test
    console.log('\n1. Testing basic API connection...');
    const response = await axios.get('https://finnhub.io/api/v1/quote', {
      params: {
        symbol: 'AAPL',
        token: FINNHUB_API_KEY,
      },
    });
    console.log('✓ API connection successful!');
    console.log('Response:', response.data);

    // Test 2: IPO Calendar test
    console.log('\n2. Testing IPO calendar endpoint...');
    const from = '2024-01-01';
    const to = '2026-12-31';

    const ipoResponse = await axios.get('https://finnhub.io/api/v1/calendar/ipo', {
      params: {
        from,
        to,
        token: FINNHUB_API_KEY,
      },
    });

    console.log('✓ IPO calendar request successful!');
    console.log('IPO Data:', JSON.stringify(ipoResponse.data, null, 2));

    if (ipoResponse.data.ipoCalendar) {
      console.log(`\nFound ${ipoResponse.data.ipoCalendar.length} IPOs`);
    } else {
      console.log('\nNo ipoCalendar data in response');
    }

  } catch (error) {
    console.error('✗ Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('\n❌ API Key is INVALID or not authorized');
    }
    if (error.response?.status === 429) {
      console.error('\n❌ Rate limit exceeded');
    }
  }
}

testAPI();
