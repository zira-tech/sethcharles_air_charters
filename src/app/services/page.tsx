'use client';

import { Plane, Crown, Package, Building2, ArrowRight, Check, Clock, Shield, Globe, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    id: 'private',
    icon: Plane,
    title: 'Private Charter',
    subtitle: 'On-Demand Private Jet Flights',
    description: 'Experience the ultimate flexibility with our on-demand private jet charter service. Fly anywhere, anytime, with no scheduled departures or crowded terminals.',
    features: [
      'Flexible scheduling',
      'Any destination worldwide',
      'No hidden fees',
      'Professional crew',
      'Luxury cabin amenities',
      'Point-to-point travel',
    ],
    cta: 'Get a Quote',
    link: '/book',
    color: 'from-[#C9A962] to-[#E5C989]',
  },
  {
    id: 'vip',
    icon: Crown,
    title: 'VIP Services',
    subtitle: 'Executive & Luxury Travel',
    description: 'Elevate your travel experience with our VIP charter service. From personal concierge to luxury amenities, every detail is crafted for the discerning traveler.',
    features: [
      'Dedicated concierge',
      'Gourmet catering',
      'Luxury ground transportation',
      'Private terminal access',
      'Customized flight experience',
      'Privacy & discretion',
    ],
    cta: 'Request Concierge',
    link: '/services/vip',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate & Group',
    subtitle: 'Business & Team Travel',
    description: 'Streamline your organization\'s travel with our corporate charter solutions. Perfect for executive teams, conferences, team-building retreats, and group movements.',
    features: [
      'Group discounts',
      'Multiple itinerary support',
      'Corporate account management',
      'Team coordination',
      'Event logistics',
      'Flexible payment terms',
    ],
    cta: 'Corporate Account',
    link: '/services/corporate',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'cargo',
    icon: Package,
    title: 'Cargo Services',
    subtitle: 'Freight & Logistics',
    description: 'Reliable time-critical cargo solutions across Africa and beyond. From urgent medical supplies to outsize equipment, we deliver with precision.',
    features: [
      'Time-critical delivery',
      'Outsize cargo handling',
      'Temperature-sensitive freight',
      'Secure transportation',
      'Real-time tracking',
      '24/7 operations',
    ],
    cta: 'Request Cargo Quote',
    link: '/services/cargo',
    color: 'from-emerald-600 to-emerald-800',
  },
];

const benefits = [
  { icon: Shield, title: 'IS-BAO Certified', description: 'Highest safety standards in the industry' },
  { icon: Clock, title: '24/7 Operations', description: 'Round-the-clock support for all your needs' },
  { icon: Globe, title: 'Global Network', description: 'Access to 5,000+ aircraft worldwide' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-24 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
                Our Services
              </p>
              <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-6">
                Comprehensive Aviation Solutions
              </h1>
              <p className="text-[#A0A0A0] text-lg max-w-3xl mx-auto">
                From private leisure flights to critical cargo logistics, we deliver premium aviation services tailored to your needs across Africa and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] hover:border-[#C9A962]/30 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-[#C9A962] text-xs tracking-wider uppercase mb-2">{service.subtitle}</p>
                  <h2 className="text-2xl font-bold text-white mb-3 font-['Playfair_Display']">{service.title}</h2>
                  <p className="text-[#A0A0A0] text-sm mb-6">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C9A962]" />
                        <span className="text-[#666] text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={service.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}
                  >
                    {service.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-[#1F1F1F]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1F1F1F] flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#C9A962]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-[#666] text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}