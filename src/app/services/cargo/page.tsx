'use client';

import { Package, ArrowRight, Check, Clock, Shield, Truck, Box, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: Clock,
    title: 'Time-Critical Delivery',
    description: 'AOG (Aircraft on Ground) and urgent shipments with priority handling.',
  },
  {
    icon: Box,
    title: 'Outsize Cargo',
    description: 'Specialized handling for oversized and heavy cargo requiring custom solutions.',
  },
  {
    icon: Truck,
    title: 'End-to-End Logistics',
    description: 'Complete door-to-door service including customs and ground handling.',
  },
  {
    icon: Plane,
    title: 'Specialized Aircraft',
    description: 'Access to cargo-configured aircraft from light jets to heavy freighters.',
  },
];

const cargoTypes = [
  'AOG (Aircraft on Ground) Parts',
  'Medical Supplies & Pharmaceuticals',
  'Oil & Gas Equipment',
  'Automotive Parts',
  'Humanitarian Aid',
  'Temperature-Sensitive Freight',
  'High-Value Commodities',
  'Project Cargo',
];

export default function CargoPage() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    cargoType: '',
    weight: '',
    origin: '',
    destination: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our cargo team will provide a quote within 24 hours.');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative py-24 bg-[#0A0A0A]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-emerald-400 tracking-[0.3em] text-sm mb-4 uppercase">
                Logistics Solutions
              </p>
              <h1 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] text-white mb-6">
                Cargo Services
              </h1>
              <p className="text-[#A0A0A0] text-lg max-w-3xl mx-auto">
                Reliable time-critical cargo solutions across Africa and beyond. From urgent medical supplies to outsize equipment, we deliver with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#A0A0A0]">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Cargo We Handle</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cargoTypes.map((type) => (
                  <div
                    key={type}
                    className="bg-[#141414] rounded-xl p-4 border border-[#1F1F1F] text-center"
                  >
                    <Package className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <span className="text-white/80 text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
              <h3 className="text-xl font-bold text-white mb-6">Request Cargo Quote</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Contact Person"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <select
                    value={formData.cargoType}
                    onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Cargo Type</option>
                    {cargoTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Estimated Weight (kg)"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Additional details about your cargo..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    Request Cargo Quote <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}