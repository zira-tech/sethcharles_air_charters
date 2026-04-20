'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Plane, Crown, Package, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#fleet', label: 'Fleet' },
    { href: '/#routes', label: 'Routes' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  const services = [
    { href: '/book', label: 'Private Charter', icon: Plane, desc: 'On-demand flights' },
    { href: '/services/vip', label: 'VIP Services', icon: Crown, desc: 'Executive travel' },
    { href: '/services/corporate', label: 'Corporate & Group', icon: Building2, desc: 'Team travel' },
    { href: '/services/cargo', label: 'Cargo', icon: Package, desc: 'Freight & logistics' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#C9A962]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="19"
                  stroke="#C9A962"
                  strokeWidth="2"
                />
                <path
                  d="M8 20L20 10L32 20L20 30L8 20Z"
                  stroke="#C9A962"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 14L26 20L20 26L14 20L20 14Z"
                  fill="#C9A962"
                />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white font-['Playfair_Display']">
                SETHCHARLES
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-[#C9A962] uppercase">
                Air Charters Ltd
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-[#A0A0A0] hover:text-[#C9A962] transition-colors duration-300 tracking-wide py-4">
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl shadow-2xl overflow-hidden min-w-[280px]">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#141414] transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] flex items-center justify-center group-hover:bg-[#C9A962]/20">
                          <service.icon className="w-5 h-5 text-[#C9A962]" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{service.label}</p>
                          <p className="text-[#666] text-xs">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.filter(l => l.label !== 'Services').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#A0A0A0] hover:text-[#C9A962] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+254700123456"
              className="flex items-center gap-2 text-[#C9A962] hover:text-[#E5C989] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+254 700 123 456</span>
            </a>
            <Link
              href="/account"
              className="px-4 py-2 border border-[#C9A962]/50 text-[#C9A962] text-sm font-medium rounded hover:bg-[#C9A962]/10 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/book"
              className="px-6 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] text-sm font-semibold rounded hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-lg border-t border-[#C9A962]/10">
          <div className="px-4 py-6 space-y-4">
            <div className="pb-2">
              <p className="text-[#C9A962] text-xs tracking-wider uppercase mb-2">Services</p>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-[#A0A0A0] hover:text-[#C9A962]"
                >
                  <service.icon className="w-4 h-4" />
                  {service.label}
                </Link>
              ))}
            </div>
            
            {navLinks.filter(l => l.label !== 'Services').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[#A0A0A0] hover:text-[#C9A962] py-2 text-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1F1F1F]">
              <a
                href="tel:+254700123456"
                className="flex items-center gap-2 text-[#C9A962] py-2"
              >
                <Phone className="w-5 h-5" />
                +254 700 123 456
              </a>
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 w-full text-center px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
