'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A962]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F] hover:border-[#C9A962]/30 transition-all duration-500"
            >
              <Quote className="w-10 h-10 text-[#C9A962]/20 mb-6" />

              <p className="text-[#A0A0A0] leading-relaxed mb-8 text-lg font-['Cormorant_Garamond'] italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center text-[#0A0A0A] font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-[#666666] text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[#666666]">
            <span className="w-12 h-px bg-[#2A2A2A]" />
            <span className="text-sm tracking-wider uppercase">Trusted by discerning travelers worldwide</span>
            <span className="w-12 h-px bg-[#2A2A2A]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
