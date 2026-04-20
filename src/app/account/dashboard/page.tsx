'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Calendar, MapPin, Plane, Clock, ChevronRight, Settings, CreditCard, Bell, LogOut } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    reference: 'SETH-X7K9M2',
    route: 'Nairobi to Masai Mara',
    date: '2026-04-25',
    status: 'upcoming',
    aircraft: 'Gulfstream G280',
  },
  {
    id: '2',
    reference: 'SETH-P3N8L5',
    route: 'Nairobi to Mombasa',
    date: '2026-03-15',
    status: 'completed',
    aircraft: 'Citation XLS+',
  },
  {
    id: '3',
    reference: 'SETH-H4R2W9',
    route: 'Nairobi to Amboseli',
    date: '2026-02-08',
    status: 'completed',
    aircraft: 'Learjet 75',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-[#C9A962]/20 text-[#C9A962]';
      case 'completed':
        return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'cancelled':
        return 'bg-[#EF4444]/20 text-[#EF4444]';
      default:
        return 'bg-[#666666]/20 text-[#666666]';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <div className="bg-[#141414] rounded-2xl p-6 border border-[#1F1F1F]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#2A2A2A]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center text-[#0A0A0A] font-bold text-xl">
                  JD
                </div>
                <div>
                  <p className="text-white font-semibold">John Doe</p>
                  <p className="text-[#666666] text-sm">Gold Member</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'bookings', icon: Calendar, label: 'My Bookings' },
                  { id: 'preferences', icon: Settings, label: 'Preferences' },
                  { id: 'payments', icon: CreditCard, label: 'Payment Methods' },
                  { id: 'notifications', icon: Bell, label: 'Notifications' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#C9A962]/10 text-[#C9A962]'
                        : 'text-[#A0A0A0] hover:bg-[#1F1F1F]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold font-['Playfair_Display'] text-white">
                {activeTab === 'bookings' && 'My Bookings'}
                {activeTab === 'preferences' && 'Preferences'}
                {activeTab === 'payments' && 'Payment Methods'}
                {activeTab === 'notifications' && 'Notifications'}
              </h1>
              <Link
                href="/book"
                className="px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
              >
                New Booking
              </Link>
            </div>

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] overflow-hidden">
                  <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                    <h3 className="text-white font-semibold">Upcoming & Past Trips</h3>
                    <div className="flex gap-2">
                      {['All', 'Upcoming', 'Completed'].map((filter) => (
                        <button
                          key={filter}
                          className="px-4 py-2 text-sm rounded-lg bg-[#1F1F1F] text-[#A0A0A0] hover:text-[#C9A962] transition-colors"
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="p-6 border-b border-[#2A2A2A] last:border-b-0 hover:bg-[#1F1F1F]/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                            <Plane className="w-6 h-6 text-[#C9A962]" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{booking.route}</p>
                            <p className="text-[#666666] text-sm">{booking.aircraft}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-[#A0A0A0]">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-[#A0A0A0]">
                            <Clock className="w-4 h-4" />
                            14:00
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#666666] text-sm font-mono">{booking.reference}</span>
                          <button className="flex items-center gap-1 text-[#C9A962] text-sm hover:underline">
                            Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-[#C9A962]/20 to-[#E5C989]/10 rounded-xl p-6 border border-[#C9A962]/20">
                    <p className="text-[#666666] text-sm mb-2">Total Flights</p>
                    <p className="text-4xl font-bold text-white mb-1">12</p>
                    <p className="text-[#C9A962] text-sm">All time</p>
                  </div>
                  <div className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
                    <p className="text-[#666666] text-sm mb-2">Favorite Route</p>
                    <p className="text-xl font-semibold text-white mb-1">NBO → MRA</p>
                    <p className="text-[#A0A0A0] text-sm">6 trips</p>
                  </div>
                  <div className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
                    <p className="text-[#666666] text-sm mb-2">Member Since</p>
                    <p className="text-xl font-semibold text-white mb-1">March 2024</p>
                    <p className="text-[#A0A0A0] text-sm">Gold tier</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
                <h3 className="text-white font-semibold mb-6">Travel Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Preferred Aircraft Category</label>
                    <select className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]">
                      <option>No preference</option>
                      <option>Light Jet</option>
                      <option>Midsize Jet</option>
                      <option>Heavy Jet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Default Currency</label>
                    <select className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]">
                      <option>USD</option>
                      <option>KES</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Dietary Requirements</label>
                    <input
                      type="text"
                      placeholder="e.g., Vegetarian, Gluten-free"
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] text-sm mb-2">Special Assistance</label>
                    <input
                      type="text"
                      placeholder="Any accessibility needs"
                      className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
                    />
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E5C989] text-[#0A0A0A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all">
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
                <h3 className="text-white font-semibold mb-6">Saved Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1F1F1F] rounded-lg border border-[#2A2A2A]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-[#00A86B] rounded flex items-center justify-center text-white text-xs font-bold">M-PESA</div>
                      <div>
                        <p className="text-white">Safaricom ****5678</p>
                        <p className="text-[#666666] text-sm">Primary</p>
                      </div>
                    </div>
                    <button className="text-[#C9A962] text-sm hover:underline">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#1F1F1F] rounded-lg border border-[#2A2A2A]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-[#1F1F1F] border border-[#2A2A2A] rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#A0A0A0]" />
                      </div>
                      <div>
                        <p className="text-white">Visa ending in 4242</p>
                        <p className="text-[#666666] text-sm">Expires 12/27</p>
                      </div>
                    </div>
                    <button className="text-[#C9A962] text-sm hover:underline">Edit</button>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 border border-[#2A2A2A] text-[#A0A0A0] rounded-lg hover:border-[#C9A962] hover:text-[#C9A962] transition-colors">
                  + Add Payment Method
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
                <h3 className="text-white font-semibold mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Booking confirmations', enabled: true },
                    { label: 'Flight reminders (24h before)', enabled: true },
                    { label: 'Special offers and promotions', enabled: false },
                    { label: 'Weather alerts for your routes', enabled: true },
                    { label: 'Newsletter updates', enabled: false },
                  ].map((notification) => (
                    <div key={notification.label} className="flex items-center justify-between py-3 border-b border-[#2A2A2A] last:border-b-0">
                      <span className="text-white">{notification.label}</span>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notification.enabled ? 'bg-[#C9A962]' : 'bg-[#2A2A2A]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            notification.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
