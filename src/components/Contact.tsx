'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Message sent! We\'ll be in touch shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#C9A962] tracking-[0.3em] text-sm mb-4 uppercase">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-6">
              Let&apos;s Plan Your Journey
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-12 leading-relaxed">
              Whether you&apos;re planning a safari adventure, coastal escape, or business travel, our team is ready to craft your perfect itinerary.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Call Us</p>
                  <a href="tel:+254700123456" className="text-[#A0A0A0] hover:text-[#C9A962] transition-colors">
                    +254 700 123 456
                  </a>
                  <p className="text-[#666666] text-sm mt-1">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a href="mailto:flights@sethcharlesair.com" className="text-[#A0A0A0] hover:text-[#C9A962] transition-colors">
                    flights@sethcharlesair.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Office</p>
                  <p className="text-[#A0A0A0]">
                    Westlands Business Park<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C9A962]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Operating Hours</p>
                  <p className="text-[#A0A0A0]">
                    24 hours, 7 days a week<br />
                    <span className="text-[#C9A962]">Always on standby</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-[#1F1F1F] rounded-2xl p-8 border border-[#2A2A2A]" suppressHydrationWarning>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Send Us a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your travel plans..."
                    rows={4}
                    required
                    className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-4 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
