const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || '174379';
const MPESA_PASSKEY = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1f2fd068';
const MPESA_CALLBACK_URL = process.env.MPESA_CALLBACK_URL || 'https://sethcharlesair.com/api/mpesa/callback';
const MPESA_AUTH_URL = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const MPESA_STK_URL = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

interface MpesaToken {
  access_token: string;
  expires_in: string;
}

interface MpesaStkRequest {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export async function getMpesaToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY || 'your_consumer_key';
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET || 'your_consumer_secret';
  
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  const response = await fetch(MPESA_AUTH_URL, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get M-Pesa token');
  }
  
  const data: MpesaToken = await response.json();
  return data.access_token;
}

export function generatePassword(): string {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const dataToHash = MPESA_SHORTCODE + MPESA_PASSKEY + timestamp;
  
  function sha256(plain: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return btoa(String.fromCharCode(...new Uint8Array(
      data.reduce((acc: number[], byte) => [...acc, byte], [])
    )));
  }
  
  return btoa(dataToHash);
}

export async function initiateMpesaPayment(
  phone: string,
  amount: number,
  accountReference: string,
  transactionDesc: string = 'Sethcharles Air Charters Booking'
): Promise<MpesaStkRequest> {
  const token = await getMpesaToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');
  
  const cleanedPhone = phone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanedPhone.startsWith('254') ? cleanedPhone : 
                         cleanedPhone.startsWith('0') ? `254${cleanedPhone.slice(1)}` : 
                         `254${cleanedPhone}`;
  
  const payload = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Math.ceil(amount),
    PartyA: formattedPhone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: formattedPhone,
    CallBackURL: MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };
  
  const response = await fetch(MPESA_STK_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    throw new Error('Failed to initiate M-Pesa payment');
  }
  
  return response.json();
}

export function formatMpesaPhone(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('254')) return cleaned;
  if (cleaned.startsWith('0')) return `254${cleaned.slice(1)}`;
  return `254${cleaned}`;
}
