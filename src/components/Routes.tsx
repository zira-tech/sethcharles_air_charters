'use client';

import { useState, useEffect } from 'react';
import { Plane, ArrowRight, Clock, MapPin } from 'lucide-react';

interface RouteData {
  id: string;
  flightTime: string;
  price: number;
  status: string;
  origin: { code: string; name: string; city: string };
  destination: { code: string; name: string; city: string };
}

export default function Routes() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch('/api/routes');
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="routes" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <path
            d="M200 50L50 200L200 350L350 200L200 50Z"
            stroke="#C9A962"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="200" cy="200" r="100" stroke="#C9A962" strokeWidth="2" />
          <circle cx="200" cy="200" r="150" stroke="#C9A962" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
            Destinations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Popular Routes
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Seamless access to Kenya&apos;s most extraordinary destinations and beyond
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div
                key={route.id}
                className="group relative bg-[#141414] rounded-2xl p-6 border border-[#1F1F1F] hover:border-[#C9A962]/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A962]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#1F1F1F] text-[#C9A962] text-sm font-semibold rounded">
                        {route.origin.code}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-gradient-to-r from-[#C9A962] to-transparent" />
                        <Plane className="w-4 h-4 text-[#C9A962]" />
                        <div className="w-8 h-px bg-gradient-to-l from-[#C9A962] to-transparent" />
                      </div>
                      <span className="px-3 py-1 bg-[#1F1F1F] text-[#C9A962] text-sm font-semibold rounded">
                        {route.destination.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#666666] text-sm">
                      <Clock className="w-4 h-4" />
                      {route.flightTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {route.origin.city} to {route.destination.city}
                  </h3>
                  <p className="text-[#A0A0A0] text-sm mb-4">
                    {route.destination.name}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                    <p className="text-[#C9A962] font-semibold">from ${route.price.toLocaleString()}</p>
                    <a
                      href="/book"
                      className="inline-flex items-center gap-2 text-[#C9A962] hover:text-[#E5C989] transition-colors text-sm font-medium group/link"
                    >
                      Book Route
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-[#141414] via-[#1F1F1F] to-[#141414] rounded-2xl p-8 border border-[#2A2A2A]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-[#C9A962]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Don&apos;t See Your Route?
                </h3>
                <p className="text-[#A0A0A0]">
                  We fly anywhere in Africa and beyond. Contact us for custom routing.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all duration-300 whitespace-nowrap"
            >
              Request Custom Route
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
