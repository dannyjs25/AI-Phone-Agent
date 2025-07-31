import axios from 'axios';
import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const airtable = {
  async createAppointment(data: {
    name: string;
    phone: string;
    email: string;
    reason: string;
    startTime: string;
    endTime: string;
  }) {
    try {
      const response = await airtableApi.post('', {
        fields: {
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
          Reason: data.reason,
          'Start Time': data.startTime,
          'End Time': data.endTime,
          Status: 'Pending',
        }
      });

      return NextResponse.json({ success: true, record: response.data });
    } catch (error) {
      console.error('Airtable error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to create appointment',
          details: error.response?.data?.error?.message || error.message 
        },
        { status: error.response?.status || 500 }
      );
    }
  },

  async getAppointments() {
    try {
      const response = await airtableApi.get('');
      return NextResponse.json(response.data.records);
    } catch (error) {
      console.error('Airtable error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to fetch appointments',
          details: error.response?.data?.error?.message || error.message 
        },
        { status: error.response?.status || 500 }
      );
    }
  },
};
