'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80',
    title: 'Masai Mara',
    subtitle: 'From the sky, witness nature\'s greatest spectacle',
  },
  {
    image: 'https://images.unsplash.com/photo-1580050898934-3b7498806b3c?w=1920&q=80',
    title: 'Kenyan Coast',
    subtitle: 'Crystal waters meet ancient Swahili culture',
  },
  {
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80',
    title: 'Mount Kenya',
    subtitle: 'Africa\'s second-highest peak awaits',
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#C9A962] tracking-[0.4em] text-sm mb-6 uppercase"
          >
            Premium Private Jet Charter
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-['Playfair_Display']"
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
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#A0A0A0] mb-12 font-['Cormorant_Garamond'] italic"
          >
            From the savanna to the sea, without compromise
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
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
      </div>

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
