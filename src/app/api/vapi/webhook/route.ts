import { NextResponse } from 'next/server';
import { airtable } from '@/lib/airtable';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { 
      callerNumber,
      callerName,
      callData,
      assistantId 
    } = await request.json();

    // Parse call data
    const appointmentData = {
      name: callerName || 'Anonymous',
      phone: callerNumber,
      email: callData?.email || '',
      reason: callData?.reason || 'General Inquiry',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    };

    // Create appointment in Airtable
    const appointmentResponse = await airtable.createAppointment(appointmentData);
    
    // Send confirmation email
    if (appointmentData.email) {
      await resend.emails.send({
        from: 'noreply@yourdomain.com',
        to: appointmentData.email,
        subject: 'Your Appointment has been Scheduled',
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Thank you for scheduling an appointment!</p>
          <p>Name: ${appointmentData.name}</p>
          <p>Phone: ${appointmentData.phone}</p>
          <p>Reason: ${appointmentData.reason}</p>
          <p>Start Time: ${new Date(appointmentData.startTime).toLocaleString()}</p>
          <p>End Time: ${new Date(appointmentData.endTime).toLocaleString()}</p>
        `
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment scheduled successfully' 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process appointment', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
