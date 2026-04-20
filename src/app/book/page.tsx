'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Plane, Users, Calendar, MapPin, ArrowRight, ArrowLeft, Plus, X, CreditCard, Loader2 } from 'lucide-react';
import { conciergeServices, ConciergeService, calculateBookingTotal, generateBookingReference } from '@/lib/booking';
import PaymentSelector from '@/components/PaymentSelector';
import Link from 'next/link';

interface Aircraft {
  id: string;
  name: string;
  category: string;
  passengers: number;
  range: number;
  speed: number;
  baggage: number;
  price: number;
  image: string;
  features: string;
}

type Step = 'details' | 'aircraft' | 'extras' | 'passengers' | 'payment';

const steps: { id: Step; label: string }[] = [
  { id: 'details', label: 'Trip Details' },
  { id: 'aircraft', label: 'Select Aircraft' },
  { id: 'extras', label: 'Add-ons' },
  { id: 'passengers', label: 'Passengers' },
  { id: 'payment', label: 'Payment' },
];

export default function BookPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [bookingRef, setBookingRef] = useState('SETH-XXXXXX');
  const [fleet, setFleet] = useState<Aircraft[]>([]);
  const [loadingAircraft, setLoadingAircraft] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const [tripDetails, setTripDetails] = useState({
    tripType: 'one-way' as 'one-way' | 'return',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 2,
  });

  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [selectedServices, setSelectedServices] = useState<ConciergeService[]>([]);
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [currency, setCurrency] = useState<'USD' | 'KES'>('USD');

  useEffect(() => {
    setBookingRef(generateBookingReference());
    
    const savedBooking = sessionStorage.getItem('bookingState');
    if (savedBooking) {
      try {
        const state = JSON.parse(savedBooking);
        if (state.tripDetails) setTripDetails(state.tripDetails);
        if (state.passengerInfo) setPassengerInfo(state.passengerInfo);
        if (state.selectedServices) setSelectedServices(state.selectedServices);
        if (state.currency) setCurrency(state.currency);
        if (state.currentStep) setCurrentStep(state.currentStep);
      } catch (e) {
        console.error('Failed to restore booking state:', e);
      }
    }
    
    const savedQuote = sessionStorage.getItem('selectedQuote');
    if (savedQuote && !savedBooking) {
      try {
        const quote = JSON.parse(savedQuote);
        setTripDetails(prev => ({
          ...prev,
          origin: quote.originName || quote.route?.origin?.city || quote.origin || prev.origin,
          destination: quote.destinationName || quote.route?.destination?.city || quote.destination || prev.destination,
          departureDate: quote.date || prev.departureDate,
          passengers: parseInt(quote.passengers) || prev.passengers,
          tripType: quote.tripType || prev.tripType,
        }));
      } catch (e) {
        console.error('Failed to parse saved quote:', e);
      }
    }
    
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    
    async function fetchFleet() {
      try {
        const res = await fetch('/api/aircraft');
        const data = await res.json();
        setFleet(data);
        
        const savedQuote = sessionStorage.getItem('selectedQuote');
        if (savedQuote) {
          const quote = JSON.parse(savedQuote);
          if (quote.aircraft) {
            const matchedAircraft = data.find((a: Aircraft) => a.id === quote.aircraft.id);
            if (matchedAircraft) {
              setSelectedAircraft(matchedAircraft);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch fleet:', error);
      } finally {
        setLoadingAircraft(false);
      }
    }
    fetchFleet();
  }, [initialized]);

  useEffect(() => {
    if (!initialized) return;
    sessionStorage.setItem('bookingState', JSON.stringify({
      tripDetails,
      passengerInfo,
      selectedServices,
      currency,
      currentStep,
    }));
  }, [tripDetails, passengerInfo, selectedServices, currency, currentStep, initialized]);

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  const totals = selectedAircraft
    ? calculateBookingTotal(
        selectedAircraft,
        [{ origin: tripDetails.origin, originCode: '', destination: tripDetails.destination, destinationCode: '', departureDate: tripDetails.departureDate }],
        selectedServices,
        currency
      )
    : { subtotal: 0, taxes: 0, total: 0 };

  const goNext = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goBack = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const toggleService = (service: ConciergeService) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handlePaymentSuccess = () => {
    sessionStorage.setItem('bookingConfirmation', JSON.stringify({
      tripDetails,
      selectedAircraft,
      totals,
      currency,
      passengerInfo,
    }));
    router.push(`/book/confirmation?ref=${bookingRef}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Book Your Flight
          </h1>
          <p className="text-[#A0A0A0] text-lg">
            Reference: <span className="text-[#C9A962] font-mono">{bookingRef}</span>
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index < stepIndex
                      ? 'bg-[#C9A962] text-[#0A0A0A]'
                      : index === stepIndex
                      ? 'bg-[#C9A962] text-[#0A0A0A]'
                      : 'bg-[#1F1F1F] text-[#666666]'
                  }`}
                >
                  {index < stepIndex ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span
                  className={`ml-3 text-sm hidden md:block ${
                    index <= stepIndex ? 'text-white' : 'text-[#666666]'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-px mx-4 ${
                      index < stepIndex ? 'bg-[#C9A962]' : 'bg-[#2A2A2A]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'details' && (
              <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
                <h2 className="text-2xl font-semibold text-white mb-6">Trip Details</h2>

                <div className="mb-6">
                  <label className="block text-[#A0A0A0] text-sm mb-3">Trip Type</label>
                  <div className="flex gap-4">
                    {['one-way', 'return'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setTripDetails({ ...tripDetails, tripType: type as 'one-way' | 'return' })}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                          tripDetails.tripType === type
                            ? 'bg-[#C9A962] text-[#0A0A0A]'
                            : 'bg-[#1F1F1F] text-[#A0A0A0] border border-[#2A2A2A]'
                        }`}
                      >
                        {type === 'one-way' ? 'One Way' : 'Return'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                      <input
                        type="text"
                        value={tripDetails.origin}
                        onChange={(e) => setTripDetails({ ...tripDetails, origin: e.target.value })}
                        placeholder="Nairobi (NBO)"
                        className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                      <input
                        type="text"
                        value={tripDetails.destination}
                        onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
                        placeholder="Masai Mara (MRA)"
                        className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Departure Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                      <input
                        type="date"
                        value={tripDetails.departureDate}
                        onChange={(e) => setTripDetails({ ...tripDetails, departureDate: e.target.value })}
                        className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A962] [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  {tripDetails.tripType === 'return' && (
                    <div>
                      <label className="block text-[#A0A0A0] text-sm mb-2">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                        <input
                          type="date"
                          value={tripDetails.returnDate}
                          onChange={(e) => setTripDetails({ ...tripDetails, returnDate: e.target.value })}
                          className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A962] [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                    <select
                      value={tripDetails.passengers}
                      onChange={(e) => setTripDetails({ ...tripDetails, passengers: parseInt(e.target.value) })}
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A962] appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'aircraft' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-6">Select Your Aircraft</h2>
                {loadingAircraft ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-[#C9A962] animate-spin" />
                  </div>
                ) : fleet
                  .filter((a) => a.passengers >= tripDetails.passengers)
                  .map((aircraft) => (
                    <div
                      key={aircraft.id}
                      onClick={() => setSelectedAircraft(aircraft)}
                      className={`bg-[#141414] rounded-xl p-6 border-2 cursor-pointer transition-all ${
                        selectedAircraft?.id === aircraft.id
                          ? 'border-[#C9A962]'
                          : 'border-[#1F1F1F] hover:border-[#C9A962]/50'
                      }`}
                    >
                      <div className="flex gap-6">
                        <img
                          src={aircraft.image}
                          alt={aircraft.name}
                          className="w-40 h-28 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{aircraft.name}</h3>
                              <span className="text-[#C9A962] text-sm uppercase">{aircraft.category} jet</span>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-[#C9A962]">${aircraft.price.toLocaleString()}</p>
                              <p className="text-[#666666] text-sm">per leg</p>
                            </div>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <span className="text-[#A0A0A0]"><Users className="w-4 h-4 inline mr-1" /> {aircraft.passengers} pax</span>
                            <span className="text-[#A0A0A0]"><MapPin className="w-4 h-4 inline mr-1" /> {aircraft.range.toLocaleString()} mi</span>
                            <span className="text-[#A0A0A0]"><Plane className="w-4 h-4 inline mr-1" /> {aircraft.speed} mph</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {currentStep === 'extras' && (
              <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
                <h2 className="text-2xl font-semibold text-white mb-6">Enhance Your Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conciergeServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedServices.find((s) => s.id === service.id)
                          ? 'border-[#C9A962] bg-[#C9A962]/10'
                          : 'border-[#2A2A2A] bg-[#1F1F1F] hover:border-[#C9A962]/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{service.name}</h3>
                        {selectedServices.find((s) => s.id === service.id) && (
                          <Check className="w-5 h-5 text-[#C9A962]" />
                        )}
                      </div>
                      <p className="text-[#666666] text-sm mb-3">{service.description}</p>
                      <p className="text-[#C9A962] font-semibold">+${service.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'passengers' && (
              <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
                <h2 className="text-2xl font-semibold text-white mb-6">Passenger Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#A0A0A0] text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        value={passengerInfo.firstName}
                        onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A0A0A0] text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        value={passengerInfo.lastName}
                        onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={passengerInfo.email}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={passengerInfo.phone}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                      placeholder="+254 700 123 456"
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>
                  <p className="text-[#666666] text-sm">
                    Additional passenger details will be collected after booking confirmation.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
                  <h2 className="text-2xl font-semibold text-white mb-6">Complete Payment</h2>
                  
                  <div className="mb-6">
                    <label className="block text-[#A0A0A0] text-sm mb-3">Currency</label>
                    <div className="flex gap-4">
                      {(['USD', 'KES'] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                            currency === curr
                              ? 'bg-[#C9A962] text-[#0A0A0A]'
                              : 'bg-[#1F1F1F] text-[#A0A0A0] border border-[#2A2A2A]'
                          }`}
                        >
                          {curr === 'USD' ? 'USD ($)' : 'KES (KSh)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <PaymentSelector
                    amount={totals.total}
                    currency={currency}
                    email={passengerInfo.email}
                    onSuccess={handlePaymentSuccess}
                    onError={(error) => console.error('Payment error:', error)}
                    passengerInfo={passengerInfo}
                    tripDetails={{
                      origin: tripDetails.origin,
                      destination: tripDetails.destination,
                      departureDate: tripDetails.departureDate,
                    }}
                  />
                </div>
              </div>
            )}

            {currentStep !== 'payment' && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 border border-[#2A2A2A] text-[#A0A0A0] rounded-lg hover:border-[#C9A962] hover:text-[#C9A962] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#141414] rounded-2xl p-6 border border-[#1F1F1F] sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A962]" />
                  <div>
                    <p className="text-white text-sm">{tripDetails.origin || 'Origin'}</p>
                    <p className="text-[#666666] text-xs">to</p>
                    <p className="text-white text-sm">{tripDetails.destination || 'Destination'}</p>
                  </div>
                </div>
                
                {tripDetails.departureDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#C9A962]" />
                    <p className="text-white text-sm">{new Date(tripDetails.departureDate).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#C9A962]" />
                  <p className="text-white text-sm">{tripDetails.passengers} passengers</p>
                </div>

                {selectedAircraft && (
                  <div className="flex items-center gap-3">
                    <Plane className="w-4 h-4 text-[#C9A962]" />
                    <p className="text-white text-sm">{selectedAircraft.name}</p>
                  </div>
                )}
              </div>

              {selectedServices.length > 0 && (
                <div className="border-t border-[#2A2A2A] pt-4 mb-4">
                  <p className="text-[#A0A0A0] text-sm mb-2">Add-ons:</p>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between text-sm mb-1">
                      <span className="text-white">{service.name}</span>
                      <span className="text-[#C9A962]">+${service.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-[#2A2A2A] pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#A0A0A0]">Subtotal</span>
                  <span className="text-white">{currency === 'USD' ? '$' : 'KSh'}{totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#A0A0A0]">Taxes (16%)</span>
                  <span className="text-white">{currency === 'USD' ? '$' : 'KSh'}{totals.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#C9A962]">{currency === 'USD' ? '$' : 'KSh'}{totals.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
