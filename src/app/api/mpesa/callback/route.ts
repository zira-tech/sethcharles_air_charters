import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { Body } = data;
    const stkCallback = Body?.stkCallback;

    if (stkCallback) {
      const checkoutRequestId = stkCallback.CheckoutRequestID;
      const resultCode = stkCallback.ResultCode;
      const resultDesc = stkCallback.ResultDesc;
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];

      console.log('M-Pesa Callback received:', {
        checkoutRequestId,
        resultCode,
        resultDesc,
      });

      if (resultCode === 0) {
        const amount = callbackMetadata.find((item: { Name: string }) => item.Name === 'Amount')?.Value;
        const receipt = callbackMetadata.find((item: { Name: string }) => item.Name === 'MpesaReceiptNumber')?.Value;
        const phone = callbackMetadata.find((item: { Name: string }) => item.Name === 'PhoneNumber')?.Value;

        console.log('Payment successful:', {
          checkoutRequestId,
          amount,
          receipt,
          phone,
        });
      } else {
        console.log('Payment failed:', {
          checkoutRequestId,
          resultCode,
          resultDesc,
        });
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Received' });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    );
  }
}
