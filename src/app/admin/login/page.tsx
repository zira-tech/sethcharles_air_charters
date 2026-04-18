'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-xl">L</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-['Playfair_Display'] text-white mb-2">
            Admin Login
          </h1>
          <p className="text-[#A0A0A0]">
            Sign in to access the Sethcharles admin panel
          </p>
        </div>

        <div className="bg-[#141414] rounded-2xl p-8 border border-[#1F1F1F]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-[#EF4444]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sethcharlesair.com"
                  required
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-4 pl-12 pr-12 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#A0A0A0] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2A2A2A] text-center">
            <p className="text-[#666666] text-sm">
              Default credentials: admin@sethcharlesair.com / sethcharles2024
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#A0A0A0] hover:text-[#C9A962] text-sm transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
