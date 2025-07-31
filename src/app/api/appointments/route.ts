import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { clientPromise } from '@/lib/mongodb';
import { twilioConfig } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { date, time, phoneNumber, name } = await request.json();

    // Store the appointment in MongoDB
    const client = await clientPromise;
    await client.db().collection('appointments').insertOne({
      date,
      time,
      phoneNumber,
      name,
      status: 'pending',
      timestamp: new Date(),
    });

    // Send confirmation SMS
    const message = await twilioConfig.client.messages.create({
      body: `Thank you ${name}! Your appointment is confirmed for ${date} at ${time}. We'll see you then!`,
      from: twilioConfig.phoneNumber,
      to: phoneNumber,
    });

    return NextResponse.json({ success: true, message: message.sid });
  } catch (error) {
    console.error('Appointment error:', error);
    return NextResponse.json({ error: 'Failed to process appointment' }, { status: 500 });
  }
}
