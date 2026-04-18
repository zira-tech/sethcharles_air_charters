'use client';

import { Shield, Clock, Award, Heart, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Uncompromising Safety',
    description: 'Wyvern-certified operators, KCAA compliance, and rigorous maintenance protocols for your absolute peace of mind.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Your journey doesn\'t wait for business hours. Neither do we. Round-the-clock concierge at your service.',
  },
  {
    icon: Award,
    title: 'Elite Fleet',
    description: 'Meticulously maintained aircraft from industry leaders like Gulfstream, Bombardier, and Cessna.',
  },
  {
    icon: Users,
    title: 'Expert Crew',
    description: 'Seasoned pilots with thousands of African flight hours and dedicated cabin attendants.',
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Every detail curated to your preferences, from catering to ground arrangements.',
  },
  {
    icon: Globe,
    title: 'Local Expertise',
    description: 'Decades of experience navigating African airspace, customs, and regional requirements.',
  },
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '2,500+', label: 'Flights Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Concierge Support' },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
            Why Sethcharles
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            The Sethcharles Difference
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            More than a charter service—we&apos;re your trusted partner in crafting extraordinary journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-8 bg-[#1F1F1F] rounded-2xl border border-[#2A2A2A] hover:border-[#C9A962]/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-[#C9A962]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A962]/20 transition-colors">
                <feature.icon className="w-7 h-7 text-[#C9A962]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C989] bg-clip-text text-transparent font-['Playfair_Display'] mb-2">
                {stat.value}
              </p>
              <p className="text-[#A0A0A0] text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#1F1F1F] rounded-3xl p-8 md:p-12 border border-[#2A2A2A]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-white mb-6">
                Safety Is Non-Negotiable
              </h3>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Every aircraft in our network meets the highest international standards. We partner only with Wyvern-certified operators and maintain rigorous compliance with Kenya Civil Aviation Authority regulations.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-full">
                  <Shield className="w-4 h-4 text-[#C9A962]" />
                  <span className="text-white text-sm">Wyvern Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-full">
                  <span className="text-white text-sm">KCAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] rounded-full">
                  <span className="text-white text-sm">IS-BAO Registered</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80"
                alt="Private jet cockpit"
                className="rounded-2xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border border-[#C9A962]/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
