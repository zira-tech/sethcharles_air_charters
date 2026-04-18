'use client';

import { useState, useEffect } from 'react';
import { Plane, Users, MapPin, ArrowRight, ChevronRight, X, Wifi, Wine, Utensils, Bed, ShowerHead } from 'lucide-react';

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
  status: string;
}

const featureIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Champagne': <Wine className="w-4 h-4" />,
  'Catering': <Utensils className="w-4 h-4" />,
  'Bed': <Bed className="w-4 h-4" />,
  'Shower': <ShowerHead className="w-4 h-4" />,
};

const categories = [
  { id: 'all', label: 'All Aircraft' },
  { id: 'light', label: 'Light Jet' },
  { id: 'midsize', label: 'Midsize Jet' },
  { id: 'heavy', label: 'Heavy Jet' },
];

export default function Fleet() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [filteredFleet, setFilteredFleet] = useState<Aircraft[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAircraft();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredFleet(aircraft);
    } else {
      setFilteredFleet(aircraft.filter((a) => a.category === selectedCategory));
    }
  }, [selectedCategory, aircraft]);

  const fetchAircraft = async () => {
    try {
      const res = await fetch('/api/aircraft');
      const data = await res.json();
      setAircraft(data);
      setFilteredFleet(data);
    } catch (error) {
      console.error('Failed to fetch aircraft:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseFeatures = (features: string): string[] => {
    if (!features) return [];
    return features.split(',').map((f) => f.trim());
  };

  return (
    <section id="fleet" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
            Our Fleet
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Aircraft for Every Journey
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            From intimate light jets to spacious heavy aircraft, our fleet offers unmatched comfort and performance
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#C9A962] text-[#0A0A0A]'
                  : 'bg-[#1F1F1F] text-[#A0A0A0] hover:text-[#C9A962] border border-[#2A2A2A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map((plane) => (
              <div
                key={plane.id}
                className="group bg-[#1F1F1F] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#C9A962]/50 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={plane.image || '/placeholder-jet.jpg'}
                    alt={plane.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = '/placeholder-jet.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#C9A962]/20 text-[#C9A962] text-xs rounded-full uppercase tracking-wider">
                      {plane.category} jet
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 font-['Playfair_Display']">
                    {plane.name}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Users className="w-5 h-5 text-[#C9A962] mx-auto mb-1" />
                      <p className="text-white text-lg font-semibold">{plane.passengers}</p>
                      <p className="text-[#666666] text-xs">Pax</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-5 h-5 text-[#C9A962] mx-auto mb-1" />
                      <p className="text-white text-lg font-semibold">{plane.range.toLocaleString()}</p>
                      <p className="text-[#666666] text-xs">Miles</p>
                    </div>
                    <div className="text-center">
                      <Plane className="w-5 h-5 text-[#C9A962] mx-auto mb-1" />
                      <p className="text-white text-lg font-semibold">{plane.speed}</p>
                      <p className="text-[#666666] text-xs">MPH</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {parseFeatures(plane.features).slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-[#141414] text-[#A0A0A0] text-xs rounded-full flex items-center gap-1"
                      >
                        {featureIcons[feature] || null}
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                    <div>
                      <p className="text-[#666666] text-xs">From</p>
                      <p className="text-[#C9A962] text-xl font-bold">
                        ${plane.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedAircraft(plane)}
                      className="flex items-center gap-2 text-[#C9A962] hover:text-[#E5C989] transition-colors text-sm font-medium"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#C9A962] text-[#C9A962] font-medium rounded-lg hover:bg-[#C9A962] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Need a Different Aircraft?
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {selectedAircraft && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#2A2A2A]">
            <div className="relative h-72">
              <img
                src={selectedAircraft.image || '/placeholder-jet.jpg'}
                alt={selectedAircraft.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/placeholder-jet.jpg'; }}
              />
              <button
                onClick={() => setSelectedAircraft(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#0A0A0A]/80 rounded-full flex items-center justify-center text-white hover:bg-[#C9A962] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-[#C9A962] text-[#0A0A0A] text-sm rounded-full uppercase tracking-wider font-medium">
                  {selectedAircraft.category} Jet
                </span>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold font-['Playfair_Display'] text-white mb-6">
                {selectedAircraft.name}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#1F1F1F] rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedAircraft.passengers}</p>
                  <p className="text-[#666666] text-sm">Passengers</p>
                </div>
                <div className="bg-[#1F1F1F] rounded-xl p-4 text-center">
                  <MapPin className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedAircraft.range.toLocaleString()}</p>
                  <p className="text-[#666666] text-sm">Range (mi)</p>
                </div>
                <div className="bg-[#1F1F1F] rounded-xl p-4 text-center">
                  <Plane className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{selectedAircraft.speed}</p>
                  <p className="text-[#666666] text-sm">MPH</p>
                </div>
                <div className="bg-[#1F1F1F] rounded-xl p-4 text-center">
                  <span className="text-2xl">🧳</span>
                  <p className="text-2xl font-bold text-white">{selectedAircraft.baggage}</p>
                  <p className="text-[#666666] text-sm">Bags</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Features & Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {parseFeatures(selectedAircraft.features).map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-full text-[#A0A0A0] flex items-center gap-2"
                    >
                      {featureIcons[feature] || null}
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#2A2A2A]">
                <div>
                  <p className="text-[#666666] text-sm">Starting from</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C989] bg-clip-text text-transparent">
                    ${selectedAircraft.price.toLocaleString()}
                  </p>
                  <p className="text-[#666666] text-sm">per leg</p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="/book"
                    className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
                  >
                    Book This Aircraft
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
