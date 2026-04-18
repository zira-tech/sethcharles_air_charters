'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, CheckCircle, XCircle, Loader2, ArrowRight, Phone, Send } from 'lucide-react';

interface PaymentSelectorProps {
  amount: number;
  currency: 'USD' | 'KES';
  email: string;
  onSuccess: (paymentMethod: string, reference: string) => void;
  onError: (error: string) => void;
  passengerInfo?: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  tripDetails?: {
    origin: string;
    destination: string;
    departureDate: string;
  };
}

type PaymentMethod = 'mpesa' | 'paystack' | 'callback' | null;

export default function PaymentSelector({ amount, currency, email, onSuccess, onError, passengerInfo, tripDetails }: PaymentSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaStatus, setMpesaStatus] = useState<'idle' | 'waiting' | 'success' | 'error'>('idle');
  const [mpesaError, setMpesaError] = useState('');
  const [checkoutId, setCheckoutId] = useState('');
  const [kesRate, setKesRate] = useState(155);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  const fetchCurrencyRates = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.kes_rate) {
          setKesRate(parseFloat(data.kes_rate));
        }
      }
    } catch (error) {
      console.error('Failed to fetch currency rates:', error);
    }
  };

  const handleMpesaPayment = async () => {
    if (!phone || phone.length < 9) {
      setMpesaError('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);
    setMpesaError('');
    setMpesaStatus('waiting');

    try {
      const response = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: currency === 'USD' ? Math.ceil(amount * kesRate) : amount,
          accountReference: `SETH-${Date.now()}`,
          description: 'Sethcharles Air Charters Booking',
        }),
      });

      const data = await response.json();

      if (response.ok && data.ResponseCode === '0') {
        setCheckoutId(data.CheckoutRequestID);
        setTimeout(() => {
          checkMpesaStatus(data.CheckoutRequestID);
        }, 3000);
      } else {
        throw new Error(data.ResponseDescription || 'Payment initiation failed');
      }
    } catch (error) {
      setMpesaStatus('error');
      setMpesaError(error instanceof Error ? error.message : 'Payment failed');
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const checkMpesaStatus = async (checkoutRequestId: string) => {
    try {
      const response = await fetch(`/api/mpesa/status?checkoutRequestId=${checkoutRequestId}`);
      const data = await response.json();

      if (data.ResultCode === '0') {
        setMpesaStatus('success');
        onSuccess('mpesa', checkoutRequestId);
      } else if (data.ResultCode === '1032') {
        setMpesaStatus('error');
        setMpesaError('Payment cancelled by user');
      } else {
        setMpesaStatus('error');
        setMpesaError(data.ResultDesc || 'Payment failed');
      }
    } catch {
      setMpesaStatus('error');
      setMpesaError('Failed to verify payment');
    }
  };

  const handlePaystackPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: currency === 'KES' ? Math.ceil(amount / kesRate * 100) : Math.ceil(amount * 100),
          currency: currency === 'KES' ? 'KES' : 'USD',
        }),
      });

      const data = await response.json();

      if (data.status) {
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCallbackRequest = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        type: 'callback',
        email: email || 'no-email-provided@sethcharlesair.com',
        phone: passengerInfo?.phone || phone || '0000000000',
        firstName: passengerInfo?.firstName || 'Guest',
        lastName: passengerInfo?.lastName || 'User',
        tripDetails: tripDetails ? `${tripDetails.origin} → ${tripDetails.destination}` : 'Not specified',
        amount: amount || 0,
        currency: currency || 'USD',
      };

      console.log('Submitting callback request:', payload);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Callback response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Callback submitted successfully:', data);
        setCallbackSubmitted(true);
      } else {
        const text = await response.text();
        console.error('Callback error - Status:', response.status, 'Response:', text);
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
      }
    } catch (error) {
      console.error('Callback request error:', error);
      onError(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedMethod('mpesa')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
            selectedMethod === 'mpesa'
              ? 'border-[#C9A962] bg-[#C9A962]/10'
              : 'border-[#2A2A2A] bg-[#1F1F1F] hover:border-[#C9A962]/50'
          }`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#00A86B]/20 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-[#00A86B]" />
            </div>
            <div>
              <p className="text-white font-semibold">M-Pesa</p>
              <p className="text-[#666666] text-sm">Pay with Safaricom</p>
            </div>
          </div>
          <p className="text-[#A0A0A0] text-sm">
            Quick & secure mobile payment.
          </p>
          {currency === 'USD' && (
            <p className="text-[#C9A962] text-xs mt-2">
              ~KSh {(amount * kesRate).toLocaleString()}
            </p>
          )}
        </button>

        <button
          onClick={() => setSelectedMethod('paystack')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
            selectedMethod === 'paystack'
              ? 'border-[#C9A962] bg-[#C9A962]/10'
              : 'border-[#2A2A2A] bg-[#1F1F1F] hover:border-[#C9A962]/50'
          }`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#3BB4E5]/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#3BB4E5]" />
            </div>
            <div>
              <p className="text-white font-semibold">Card Payment</p>
              <p className="text-[#666666] text-sm">Visa, Mastercard</p>
            </div>
          </div>
          <p className="text-[#A0A0A0] text-sm">
            Secure card payment. International accepted.
          </p>
        </button>

        <button
          onClick={() => setSelectedMethod('callback')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
            selectedMethod === 'callback'
              ? 'border-[#C9A962] bg-[#C9A962]/10'
              : 'border-[#2A2A2A] bg-[#1F1F1F] hover:border-[#C9A962]/50'
          }`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-[#C9A962]" />
            </div>
            <div>
              <p className="text-white font-semibold">Request Callback</p>
              <p className="text-[#666666] text-sm">Contact me first</p>
            </div>
          </div>
          <p className="text-[#A0A0A0] text-sm">
            Prefer to discuss before paying.
          </p>
        </button>
      </div>

      {selectedMethod === 'mpesa' && mpesaStatus === 'idle' && (
        <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
          <h4 className="text-white font-semibold mb-4">Enter M-Pesa Phone Number</h4>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0700 123 456"
                className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
              />
            </div>
            <button
              onClick={handleMpesaPayment}
              disabled={isProcessing}
              className="px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-lg hover:bg-[#00A86B]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Pay KSh {currency === 'USD' ? (amount * kesRate).toLocaleString() : amount.toLocaleString()}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          {mpesaError && (
            <p className="text-red-500 text-sm mt-3">{mpesaError}</p>
          )}
          <p className="text-[#666666] text-xs mt-4">
            You will receive a payment prompt on your phone. Enter your M-Pesa PIN to confirm.
          </p>
        </div>
      )}

      {selectedMethod === 'mpesa' && mpesaStatus === 'waiting' && (
        <div className="bg-[#1F1F1F] rounded-xl p-8 border border-[#2A2A2A] text-center">
          <Loader2 className="w-12 h-12 text-[#00A86B] mx-auto mb-4 animate-spin" />
          <h4 className="text-white font-semibold mb-2">Waiting for Payment</h4>
          <p className="text-[#A0A0A0]">
            Please check your phone and enter your M-Pesa PIN to complete the payment.
          </p>
        </div>
      )}

      {selectedMethod === 'mpesa' && mpesaStatus === 'success' && (
        <div className="bg-[#1F1F1F] rounded-xl p-8 border border-[#22C55E]/50 text-center">
          <CheckCircle className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
          <h4 className="text-white font-semibold mb-2">Payment Successful!</h4>
          <p className="text-[#A0A0A0]">
            Your M-Pesa payment has been confirmed.
          </p>
        </div>
      )}

      {selectedMethod === 'mpesa' && mpesaStatus === 'error' && (
        <div className="bg-[#1F1F1F] rounded-xl p-8 border border-[#EF4444]/50 text-center">
          <XCircle className="w-12 h-12 text-[#EF4444] mx-auto mb-4" />
          <h4 className="text-white font-semibold mb-2">Payment Failed</h4>
          <p className="text-[#A0A0A0] mb-4">{mpesaError}</p>
          <button
            onClick={() => {
              setMpesaStatus('idle');
              setMpesaError('');
            }}
            className="px-6 py-3 border border-[#C9A962] text-[#C9A962] rounded-lg hover:bg-[#C9A962]/10 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {selectedMethod === 'paystack' && (
        <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
          <h4 className="text-white font-semibold mb-4">Card Payment</h4>
          <p className="text-[#A0A0A0] mb-4">
            You will be redirected to Paystack&apos;s secure payment page to complete your payment.
          </p>
          <button
            onClick={handlePaystackPayment}
            disabled={isProcessing}
            className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {selectedMethod === 'callback' && !callbackSubmitted && (
        <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
          <h4 className="text-white font-semibold mb-4">Request a Callback</h4>
          <p className="text-[#A0A0A0] mb-4">
            Our concierge team will contact you to discuss your booking and answer any questions before proceeding with payment.
          </p>
          <div className="bg-[#141414] rounded-lg p-4 mb-4">
            <p className="text-white text-sm mb-2">We&apos;ll reach out to:</p>
            <p className="text-[#C9A962]">{email}</p>
            <p className="text-[#A0A0A0] text-sm">{passengerInfo?.phone || phone}</p>
          </div>
          <button
            onClick={handleCallbackRequest}
            disabled={isProcessing}
            className="w-full py-4 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Request Callback
              </>
            )}
          </button>
        </div>
      )}

      {selectedMethod === 'callback' && callbackSubmitted && (
        <div className="bg-[#1F1F1F] rounded-xl p-8 border border-[#22C55E]/50 text-center">
          <CheckCircle className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
          <h4 className="text-white font-semibold mb-2">Callback Requested!</h4>
          <p className="text-[#A0A0A0]">
            Our concierge team will contact you shortly. You can expect a call within the next few hours.
          </p>
          <p className="text-[#C9A962] text-sm mt-4">
            Reference: SETH-CB-{Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}
