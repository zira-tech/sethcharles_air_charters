'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Calendar, Users, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  code: string;
  city: string;
}

interface QuoteResult {
  aircraft: { id: string; name: string; category: string; image: string };
  route: { origin: Location; destination: Location; flightTime: string };
  subtotal: number;
  taxes: number;
  total: number;
  currency: string;
}

export default function QuoteWidget() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quotes, setQuotes] = useState<QuoteResult[]>([]);
  const [formData, setFormData] = useState({
    origin: 'NBO',
    originName: 'Nairobi (Jomo Kenyatta)',
    destination: 'MRA',
    destinationName: 'Masai Mara (Keekorok)',
    date: '',
    passengers: '2',
    tripType: 'one-way',
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const selectOrigin = (loc: Location) => {
    setFormData({ ...formData, origin: loc.code, originName: loc.name });
    setShowOriginDropdown(false);
  };

  const selectDestination = (loc: Location) => {
    setFormData({ ...formData, destination: loc.code, destinationName: loc.name });
    setShowDestDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResults(false);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          date: formData.date,
          passengers: formData.passengers,
          tripType: formData.tripType,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setQuotes(data.quotes);
        setShowResults(true);
      } else {
        alert(data.error || 'Failed to generate quote');
      }
    } catch (error) {
      console.error('Quote error:', error);
      alert('Failed to generate quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bookQuote = (quote: QuoteResult) => {
    sessionStorage.setItem('selectedQuote', JSON.stringify({
      ...quote,
      origin: formData.origin,
      originName: formData.originName,
      destination: formData.destination,
      destinationName: formData.destinationName,
      date: formData.date,
      passengers: formData.passengers,
      tripType: formData.tripType,
    }));
    router.push('/book');
  };

  return (
    <section id="quote" className="py-24 bg-[#0A0A0A] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-[#0A0A0A]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
            Instant Quote
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Begin Your Journey
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Receive a personalized quote for your private charter within hours
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="relative">
                  <label className="block text-[#A0A0A0] text-sm mb-2">From</label>
                  <button
                    type="button"
                    onClick={() => { setShowOriginDropdown(!showOriginDropdown); setShowDestDropdown(false); }}
                    className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-left text-white hover:border-[#C9A962] focus:outline-none focus:border-[#C9A962] transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">{formData.originName}</span>
                    <span className="text-[#C9A962] text-sm ml-2">{formData.origin}</span>
                  </button>
                  {showOriginDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg shadow-xl max-h-64 overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => selectOrigin(loc)}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-[#2A2A2A] transition-colors ${
                            formData.origin === loc.code ? 'bg-[#C9A962]/10 text-[#C9A962]' : 'text-white'
                          }`}
                        >
                          <span className="font-semibold mr-2">{loc.code}</span>
                          <span className="text-[#A0A0A0]">{loc.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-[#A0A0A0] text-sm mb-2">To</label>
                  <button
                    type="button"
                    onClick={() => { setShowDestDropdown(!showDestDropdown); setShowOriginDropdown(false); }}
                    className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 px-4 text-left text-white hover:border-[#C9A962] focus:outline-none focus:border-[#C9A962] transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">{formData.destinationName}</span>
                    <span className="text-[#C9A962] text-sm ml-2">{formData.destination}</span>
                  </button>
                  {showDestDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg shadow-xl max-h-64 overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => selectDestination(loc)}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-[#2A2A2A] transition-colors ${
                            formData.destination === loc.code ? 'bg-[#C9A962]/10 text-[#C9A962]' : 'text-white'
                          }`}
                        >
                          <span className="font-semibold mr-2">{loc.code}</span>
                          <span className="text-[#A0A0A0]">{loc.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A962] transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A962] transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-[#666666]" />
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    className="bg-transparent text-[#A0A0A0] text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="one-way" className="bg-[#1F1F1F]">One Way</option>
                    <option value="return" className="bg-[#1F1F1F]">Return</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.date}
                className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Calculating Quote...
                  </>
                ) : (
                  <>
                    Get Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {showResults && quotes.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2 text-[#22C55E]">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{quotes.length} options available</span>
              </div>
              
              {quotes.map((quote, index) => (
                <div key={index} className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F] hover:border-[#C9A962]/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={quote.aircraft.image || '/placeholder-jet.jpg'}
                        alt={quote.aircraft.name}
                        className="w-20 h-14 object-cover rounded-lg"
                        onError={(e) => { e.currentTarget.src = '/placeholder-jet.jpg'; }}
                      />
                      <div>
                        <p className="text-white font-semibold">{quote.aircraft.name}</p>
                        <p className="text-[#666666] text-sm">
                          {quote.route.origin.code} → {quote.route.destination.code} • {quote.route.flightTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[#C9A962] text-2xl font-bold">${quote.total.toLocaleString()}</p>
                        <p className="text-[#666666] text-sm">incl. taxes</p>
                      </div>
                      <button
                        onClick={() => bookQuote(quote)}
                        className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all whitespace-nowrap"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
