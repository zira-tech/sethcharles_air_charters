import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="19" stroke="#C9A962" strokeWidth="2" />
                <path
                  d="M8 20L20 10L32 20L20 30L8 20Z"
                  stroke="#C9A962"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M20 14L26 20L20 26L14 20L20 14Z" fill="#C9A962" />
              </svg>
              <div>
                <span className="text-xl font-bold tracking-wider text-white font-['Playfair_Display']">
                  SETHCHARLES
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-[#C9A962] uppercase">
                  Air Charters Ltd
                </span>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
              Your Africa. Your Way. Premium private jet charter across Kenya,
              East Africa, and beyond.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:border-[#C9A962] hover:text-[#C9A962] transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:border-[#C9A962] hover:text-[#C9A962] transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:border-[#C9A962] hover:text-[#C9A962] transition-colors"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {['Fleet', 'Routes', 'About Us', 'Safety', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#A0A0A0] hover:text-[#C9A962] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Popular Routes</h4>
            <ul className="space-y-3">
              <li className="text-[#A0A0A0] text-sm">Nairobi → Masai Mara</li>
              <li className="text-[#A0A0A0] text-sm">Nairobi → Mombasa</li>
              <li className="text-[#A0A0A0] text-sm">Nairobi → Amboseli</li>
              <li className="text-[#A0A0A0] text-sm">Nairobi → Lamu</li>
              <li className="text-[#A0A0A0] text-sm">Nairobi → Zanzibar</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                <span className="text-[#A0A0A0] text-sm">
                  Westlands Business Park<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
                <a
                  href="tel:+254700123456"
                  className="text-[#A0A0A0] text-sm hover:text-[#C9A962] transition-colors"
                >
                  +254 700 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
                <a
                  href="mailto:flights@sethcharlesair.com"
                  className="text-[#A0A0A0] text-sm hover:text-[#C9A962] transition-colors"
                >
                  flights@sethcharlesair.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1F1F1F]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p className="text-[#666666] text-sm">
                © {new Date().getFullYear()} Sethcharles Air Charters Ltd. All rights reserved.
              </p>
              <span className="text-[#666666] text-sm hidden md:inline">•</span>
              <p className="text-[#666666] text-sm">
                Designed by{' '}
                <a 
                  href="https://zira-tech.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#C9A962] hover:text-[#E5C989] transition-colors"
                >
                  Zira Technologies
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-[#666666] hover:text-[#A0A0A0] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#666666] hover:text-[#A0A0A0] text-sm transition-colors">
                Terms of Service
              </Link>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
