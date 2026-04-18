import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key';

export async function POST(request: NextRequest) {
  try {
    const { email, amount, currency, reference, metadata } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { error: 'Email and amount are required' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    const paymentReference = reference || `SETH_${timestamp}_${random}`;

    const payload = {
      email,
      amount,
      currency: currency || 'USD',
      reference: paymentReference,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/book/confirmation?ref=${paymentReference}`,
      metadata: {
        ...metadata,
        platform: 'sethcharles-air-charters',
      },
    };

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({
        status: true,
        message: 'Payment initialized',
        data: {
          authorization_url: data.data.authorization_url,
          access_code: data.data.access_code,
          reference: data.data.reference,
        },
      });
    }

    return NextResponse.json(
      { error: data.message || 'Failed to initialize payment' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Paystack initialize error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
