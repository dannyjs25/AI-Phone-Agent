import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing Twilio environment variables');
}

const client = twilio(accountSid, authToken);

export const twilioConfig = {
  client,
  twiml: {
    VoiceResponse: twilio.twiml.VoiceResponse,
  },
  phoneNumber: twilioPhoneNumber,
};
