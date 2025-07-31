import axios from 'axios';

async function testAirtable() {
  try {
    const AIRTABLE_API_KEY = process.env['AIRTABLE_API_KEY'];
    const AIRTABLE_BASE_ID = process.env['AIRTABLE_BASE_ID'];
    const AIRTABLE_TABLE_NAME = process.env['AIRTABLE_TABLE_NAME'];

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      console.error('Missing required environment variables');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    // Test getting records
    console.log('Testing Airtable connection...');
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      config
    );

    console.log('Connection successful!');
    console.log('Found records:', response.data.records.length);

    // Test creating a record
    console.log('\nTesting record creation...');
    const testRecord = {
      fields: {
        Name: 'Test Appointment',
        Phone: '+1234567890',
        'Start Time': new Date().toISOString(),
        'End Time': new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        Status: 'Pending'
      }
    };

    const createResponse = await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      testRecord,
      config
    );

    console.log('Record created successfully!');
    console.log('Record ID:', createResponse.data.id);

  } catch (error) {
    console.error('Airtable test failed:', (error as any).response?.data || (error as any).message);
  }
}

testAirtable();
