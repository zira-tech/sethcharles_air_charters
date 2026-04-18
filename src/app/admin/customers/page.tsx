'use client';

import { useState } from 'react';
import { Users, Search, Mail, Phone, Calendar, Plane, DollarSign, ChevronDown } from 'lucide-react';

const initialCustomers = [
  { id: '1', name: 'James Mitchell', email: 'james@email.com', phone: '+254 700 123 456', bookings: 8, totalSpent: 89500, lastBooking: '2026-04-10', memberSince: '2024-03-15', tier: 'gold' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+254 711 234 567', bookings: 5, totalSpent: 42000, lastBooking: '2026-04-11', memberSince: '2024-06-20', tier: 'silver' },
  { id: '3', name: 'Michael Chen', email: 'michael@email.com', phone: '+254 722 345 678', bookings: 12, totalSpent: 156000, lastBooking: '2026-04-08', memberSince: '2023-11-01', tier: 'platinum' },
  { id: '4', name: 'Emma Williams', email: 'emma@email.com', phone: '+254 733 456 789', bookings: 3, totalSpent: 28500, lastBooking: '2026-04-05', memberSince: '2025-01-10', tier: 'bronze' },
  { id: '5', name: 'David Brown', email: 'david@email.com', phone: '+254 744 567 890', bookings: 6, totalSpent: 52000, lastBooking: '2026-04-01', memberSince: '2024-08-05', tier: 'silver' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+254 755 678 901', bookings: 2, totalSpent: 15000, lastBooking: '2026-04-12', memberSince: '2025-02-20', tier: 'bronze' },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'platinum': return 'bg-[#E5E4E2]/20 text-[#E5E4E2] border-[#E5E4E2]';
    case 'gold': return 'bg-[#C9A962]/20 text-[#C9A962] border-[#C9A962]';
    case 'silver': return 'bg-[#C0C0C0]/20 text-[#C0C0C0] border-[#C0C0C0]';
    case 'bronze': return 'bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]';
    default: return 'bg-[#666666]/20 text-[#666666]';
  }
};

export default function CustomersManagement() {
  const [customers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || customer.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-[#1F1F1F] rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
          />
        </div>

        <div className="flex gap-3">
          {['all', 'platinum', 'gold', 'silver', 'bronze'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tierFilter === tier
                  ? 'bg-[#C9A962] text-[#0A0A0A]'
                  : 'bg-[#141414] text-[#A0A0A0] border border-[#1F1F1F] hover:border-[#C9A962]'
              }`}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-[#141414] rounded-xl border border-[#1F1F1F] p-6 hover:border-[#C9A962]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center text-[#0A0A0A] font-bold text-lg">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-semibold">{customer.name}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getTierColor(customer.tier)}`}>
                    {customer.tier}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
                <Mail className="w-4 h-4 text-[#666666]" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
                <Phone className="w-4 h-4 text-[#666666]" />
                {customer.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1F1F1F]">
              <div>
                <p className="text-[#666666] text-xs mb-1">Bookings</p>
                <p className="text-white font-semibold flex items-center gap-1">
                  <Plane className="w-4 h-4 text-[#C9A962]" />
                  {customer.bookings}
                </p>
              </div>
              <div>
                <p className="text-[#666666] text-xs mb-1">Total Spent</p>
                <p className="text-[#C9A962] font-semibold flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {customer.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1F1F1F]">
              <p className="text-[#666666] text-xs">
                Member since {new Date(customer.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[#666666] text-xs">
                Last booking: {new Date(customer.lastBooking).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] p-12 text-center">
          <Users className="w-12 h-12 text-[#666666] mx-auto mb-4" />
          <p className="text-[#A0A0A0]">No customers found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
