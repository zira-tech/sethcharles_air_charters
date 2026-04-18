import { NextRequest, NextResponse } from 'next/server';
import { getMpesaToken, generatePassword, formatMpesaPhone } from '@/lib/mpesa';

const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || '174379';
const MPESA_PASSKEY = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1f2fd068';
const MPESA_STK_URL = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

const pendingPayments: Map<string, { phone: string; amount: number; status: string }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const { phone, amount, accountReference, description } = await request.json();

    if (!phone || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    const token = await getMpesaToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');
    const formattedPhone = formatMpesaPhone(phone);

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount),
      PartyA: formattedPhone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL || 'https://sethcharlesair.com/api/mpesa/callback',
      AccountReference: accountReference,
      TransactionDesc: description || 'Sethcharles Air Charters Booking',
    };

    const response = await fetch(MPESA_STK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.ResponseCode === '0') {
      pendingPayments.set(data.CheckoutRequestID, {
        phone: formattedPhone,
        amount: Math.ceil(amount),
        status: 'pending',
      });

      return NextResponse.json({
        ResponseCode: '0',
        ResponseDescription: data.ResponseDescription,
        CheckoutRequestID: data.CheckoutRequestID,
        MerchantRequestID: data.MerchantRequestID,
      });
    }

    return NextResponse.json(
      { error: data.ResponseDescription || 'Payment initiation failed' },
      { status: 400 }
    );
  } catch (error) {
    console.error('M-Pesa STK push error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
