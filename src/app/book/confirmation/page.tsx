'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, Calendar, MapPin, Users, Plane, ArrowRight, Phone, Mail } from 'lucide-react';

interface BookingSummary {
  tripDetails: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    tripType: string;
  };
  selectedAircraft: {
    name: string;
    image: string;
    category: string;
  };
  totals: {
    subtotal: number;
    taxes: number;
    total: number;
  };
  currency: string;
  passengerInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref') || 'SETH-XXXXXXXX';
  const [booking, setBooking] = useState<BookingSummary | null>(null);

  useEffect(() => {
    const savedBooking = sessionStorage.getItem('bookingConfirmation');
    if (savedBooking) {
      try {
        setBooking(JSON.parse(savedBooking));
      } catch (e) {
        console.error('Failed to parse booking:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#22C55E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Booking Confirmed
          </h1>
          <p className="text-[#A0A0A0] text-lg mb-2">
            Thank you for choosing Sethcharles Air Charters Ltd
          </p>
          <p className="text-[#C9A962] font-mono text-xl">
            Reference: {reference}
          </p>
        </div>

        {booking && (
          <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-[#A0A0A0] text-sm">Route</p>
                    <p className="text-white">{booking.tripDetails.origin} → {booking.tripDetails.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-[#A0A0A0] text-sm">Date</p>
                    <p className="text-white">{booking.tripDetails.departureDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-[#A0A0A0] text-sm">Passengers</p>
                    <p className="text-white">{booking.tripDetails.passengers}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-[#A0A0A0] text-sm">Aircraft</p>
                    <p className="text-white">{booking.selectedAircraft?.name || 'Selected Aircraft'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#A0A0A0] text-sm mb-1">Total Paid</p>
                  <p className="text-2xl font-bold text-[#C9A962]">
                    {booking.currency === 'KES' ? 'KSh' : '$'}{booking.totals.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A962] font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Confirmation Email Sent</h3>
                <p className="text-[#A0A0A0] text-sm">
                  We&apos;ve sent your booking details and receipt to your email address.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A962] font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Flight Coordination</h3>
                <p className="text-[#A0A0A0] text-sm">
                  Our operations team will confirm your aircraft positioning and crew assignment within 2 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A962] font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Pre-Flight Briefing</h3>
                <p className="text-[#A0A0A0] text-sm">
                  You&apos;ll receive a detailed itinerary 24 hours before departure including FBO locations and contact details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Contact Your Concierge</h2>
          <p className="text-[#A0A0A0] mb-6">
            Our 24/7 concierge team is available to assist with any questions or special requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:+254700123456"
              className="flex items-center gap-4 p-4 bg-[#1F1F1F] rounded-xl border border-[#2A2A2A] hover:border-[#C9A962] transition-colors"
            >
              <Phone className="w-6 h-6 text-[#C9A962]" />
              <div>
                <p className="text-white font-medium">Call Us</p>
                <p className="text-[#A0A0A0] text-sm">+254 700 123 456</p>
              </div>
            </a>
            <a
              href="mailto:concierge@sethcharlesair.com"
              className="flex items-center gap-4 p-4 bg-[#1F1F1F] rounded-xl border border-[#2A2A2A] hover:border-[#C9A962] transition-colors"
            >
              <Mail className="w-6 h-6 text-[#C9A962]" />
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-[#A0A0A0] text-sm">concierge@sethcharlesair.com</p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#C9A962]/10 to-[#E5C989]/10 rounded-2xl p-8 border border-[#C9A962]/20 text-center">
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-white mb-4">
            Ready for Your Journey?
          </h2>
          <p className="text-[#A0A0A0] mb-6">
            Browse our destinations or contact our team to plan your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
            >
              Return Home
            </Link>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A962] text-[#C9A962] font-medium rounded-lg hover:bg-[#C9A962]/10 transition-colors">
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#C9A962]">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
