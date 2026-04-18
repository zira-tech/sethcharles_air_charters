'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Plane, Calendar, MapPin } from 'lucide-react';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? 'Login functionality coming soon!' : 'Registration functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-['Playfair_Display'] text-white mb-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-[#A0A0A0]">
            {isLogin
              ? 'Sign in to access your bookings and preferences'
              : 'Join Sethcharles Air Charters for exclusive benefits and faster booking'}
          </p>
        </div>

        <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-12 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#A0A0A0]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-12 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#2A2A2A] bg-[#1F1F1F] accent-[#C9A962]" />
                  <span className="text-[#A0A0A0] text-sm">Remember me</span>
                </label>
                <a href="#" className="text-[#C9A962] text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#A0A0A0]">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9A962] hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
          <h3 className="text-white font-semibold mb-4">Member Benefits</h3>
          <ul className="space-y-3">
            {[
              'Faster booking with saved preferences',
              'Exclusive member-only pricing',
              'Priority access to fleet availability',
              'Dedicated concierge support',
              'Travel history and receipts',
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
