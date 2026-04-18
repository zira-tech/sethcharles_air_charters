const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key';
const PAYSTACK_VERIFY_URL = 'https://api.paystack.co/transaction/verify';
const PAYSTACK_INITIALIZE_URL = 'https://api.paystack.co/transaction/initialize';

export interface PaystackInitializeRequest {
  email: string;
  amount: number;
  currency?: 'USD' | 'EUR' | 'GBP' | 'KES';
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      email: string;
    };
  };
}

export function generatePaystackReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `LESUS_${timestamp}_${random}`;
}

export async function initializePaystackPayment(
  data: PaystackInitializeRequest
): Promise<PaystackInitializeResponse> {
  const payload = {
    ...data,
    reference: data.reference || generatePaystackReference(),
    currency: data.currency || 'USD',
    callback_url: data.callback_url || `${process.env.NEXT_PUBLIC_SITE_URL}/book/confirmation`,
  };

  const response = await fetch(PAYSTACK_INITIALIZE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to initialize Paystack payment');
  }

  return response.json();
}

export async function verifyPaystackPayment(reference: string): Promise<PaystackVerifyResponse> {
  const response = await fetch(`${PAYSTACK_VERIFY_URL}/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to verify Paystack payment');
  }

  return response.json();
}

export function isPaystackPaymentSuccessful(verifyResponse: PaystackVerifyResponse): boolean {
  return verifyResponse.status && verifyResponse.data.status === 'success';
}

export { PAYSTACK_PUBLIC_KEY };
