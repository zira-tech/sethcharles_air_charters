'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Plane, Crown, Package, Building2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
    title: 'Private Charter',
    subtitle: 'On-demand flights, any destination',
  },
  {
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    title: 'VIP Services',
    subtitle: 'Executive travel with concierge-level service',
  },
  {
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80',
    title: 'Corporate & Group',
    subtitle: 'Team travel, events & executive retreats',
  },
  {
    image: 'https://images.unsplash.com/photo-1559087867-ce58ebbb6771?w=1920&q=80',
    title: 'Cargo Services',
    subtitle: 'Time-critical freight & logistics',
  },
];

const services = [
  {
    icon: Plane,
    title: 'Private Charter',
    description: 'On-demand flights with flexible scheduling to any destination',
    cta: 'Get a Quote',
    link: '/book',
    color: 'from-[#C9A962] to-[#E5C989]',
  },
  {
    icon: Crown,
    title: 'VIP Services',
    description: 'Executive travel with concierge-level service and luxury amenities',
    cta: 'Request Concierge',
    link: '/services/vip',
    color: 'from-purple-600 to-purple-800',
  },
  {
    icon: Building2,
    title: 'Corporate & Group',
    description: 'Team travel, corporate events, and executive retreats',
    cta: 'Corporate Account',
    link: '/services/corporate',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: Package,
    title: 'Cargo',
    description: 'Time-critical freight and outsize cargo logistics',
    cta: 'Request Cargo Quote',
    link: '/services/cargo',
    color: 'from-emerald-600 to-emerald-800',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToQuote = () => {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 pt-16">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#C9A962] tracking-[0.4em] text-sm mb-4 uppercase"
          >
            Premium Aviation Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-['Playfair_Display']"
          >
            <span className="text-white">Your Africa.</span>
            <br />
            <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C989] bg-clip-text text-transparent">
              Your Way.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-[#A0A0A0] mb-8 font-['Cormorant_Garamond'] italic"
          >
            Private Jet Charter • VIP Services • Corporate & Group • Cargo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToQuote}
              className="px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded hover:shadow-xl hover:shadow-[#C9A962]/30 transition-all duration-300 transform hover:scale-105"
            >
              Get a Quote
            </button>
            <a
              href="#fleet"
              className="px-8 py-4 border border-[#C9A962]/50 text-white font-medium rounded hover:bg-[#C9A962]/10 transition-all duration-300"
            >
              View Fleet
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full"
        >
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.link}
              className="group bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#1F1F1F] hover:border-[#C9A962]/50 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`}>
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#C9A962] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#666] text-xs mb-3 line-clamp-2">
                {service.description}
              </p>
              <span className="text-[#C9A962] text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                {service.cta} <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToQuote}
          className="animate-bounce text-[#C9A962] hover:text-[#E5C989] transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </motion.div>

      <div className="absolute bottom-12 left-8 z-20 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#C9A962] text-sm tracking-wider uppercase mb-1">
              {slides[currentSlide].title}
            </p>
            <p className="text-white/60 text-sm">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 right-8 z-20 hidden lg:flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-[#C9A962] w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
