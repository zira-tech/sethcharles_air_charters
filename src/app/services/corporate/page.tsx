'use client';

import { Building2, ArrowRight, Check, Users, Calendar, CreditCard, Briefcase, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: Users,
    title: 'Team Coordination',
    description: 'Seamless coordination for groups of all sizes, from executive teams to large delegations.',
  },
  {
    icon: Calendar,
    title: 'Flexible Itineraries',
    description: 'Multi-city routing and complex schedules handled with precision.',
  },
  {
    icon: CreditCard,
    title: 'Corporate Accounts',
    description: 'Simplified billing with monthly statements and flexible payment terms.',
  },
  {
    icon: Briefcase,
    title: 'Event Logistics',
    description: 'Complete support for conferences, retreats, and corporate events.',
  },
];

const benefits = [
  'Volume discounts for regular travel',
  'Dedicated account manager',
  'Online booking portal',
  'Travel policy compliance',
  'Detailed reporting',
  'Priority support',
];

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our corporate team will contact you to set up your account.');
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
              <p className="text-blue-400 tracking-[0.3em] text-sm mb-4 uppercase">
                Business Travel
              </p>
              <h1 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] text-white mb-6">
                Corporate & Group
              </h1>
              <p className="text-[#A0A0A0] text-lg max-w-3xl mx-auto">
                Streamline your organization's travel with premium charter solutions. Perfect for executive teams, conferences, and group movements.
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
                  className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#A0A0A0]">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Corporate Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
                <h3 className="text-xl font-bold text-white mb-6">Open Corporate Account</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Contact Person"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Business Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({...formData, employees: e.target.value})}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Number of Travelers</option>
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-20">11-20</option>
                      <option value="20+">20+</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your travel needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg text-white placeholder-[#666] focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    Open Corporate Account <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}