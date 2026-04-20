'use client';

import { Plane, Users, DollarSign, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  { 
    label: 'Total Bookings', 
    value: '47', 
    change: '+12%', 
    positive: true,
    icon: Plane,
    color: '#C9A962'
  },
  { 
    label: 'Revenue (USD)', 
    value: '$892,450', 
    change: '+18%', 
    positive: true,
    icon: DollarSign,
    color: '#22C55E'
  },
  { 
    label: 'Active Customers', 
    value: '156', 
    change: '+8%', 
    positive: true,
    icon: Users,
    color: '#3B82F6'
  },
  { 
    label: 'Avg Flight Price', 
    value: '$8,240', 
    change: '-3%', 
    positive: false,
    icon: TrendingUp,
    color: '#A855F7'
  },
];

const recentBookings = [
  { id: 'SETH-X7K9M2', customer: 'James Mitchell', route: 'NBO → MRA', date: '2026-04-25', amount: '$12,500', status: 'Confirmed' },
  { id: 'SETH-P3N8L5', customer: 'Sarah Johnson', route: 'NBO → MBA', date: '2026-04-24', amount: '$8,200', status: 'Pending' },
  { id: 'SETH-H4R2W9', customer: 'Michael Chen', route: 'NBO → ASO', date: '2026-04-23', amount: '$9,800', status: 'Confirmed' },
  { id: 'SETH-K8M3N1', customer: 'Emma Williams', route: 'NBO → LAU', date: '2026-04-22', amount: '$15,200', status: 'Completed' },
  { id: 'SETH-Q2P5L8', customer: 'David Brown', route: 'NBO → JNB', date: '2026-04-21', amount: '$28,500', status: 'Confirmed' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-[#22C55E]/20 text-[#22C55E]';
    case 'Pending': return 'bg-[#C9A962]/20 text-[#C9A962]';
    case 'Completed': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
    case 'Cancelled': return 'bg-[#EF4444]/20 text-[#EF4444]';
    default: return 'bg-[#666666]/20 text-[#666666]';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#141414] rounded-xl p-6 border border-[#1F1F1F]">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[#666666] text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] rounded-xl border border-[#1F1F1F]">
          <div className="p-6 border-b border-[#1F1F1F]">
            <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[#666666] text-sm border-b border-[#1F1F1F]">
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Route</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#1F1F1F] hover:bg-[#1F1F1F]/50 transition-colors">
                    <td className="px-6 py-4 text-[#C9A962] font-mono text-sm">{booking.id}</td>
                    <td className="px-6 py-4 text-white">{booking.customer}</td>
                    <td className="px-6 py-4 text-[#A0A0A0]">{booking.route}</td>
                    <td className="px-6 py-4 text-white font-semibold">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl border border-[#1F1F1F]">
          <div className="p-6 border-b border-[#1F1F1F]">
            <h2 className="text-lg font-semibold text-white">Popular Routes</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { route: 'Nairobi → Masai Mara', flights: 24, revenue: '$298,500' },
              { route: 'Nairobi → Mombasa', flights: 18, revenue: '$156,200' },
              { route: 'Nairobi → Amboseli', flights: 15, revenue: '$142,800' },
              { route: 'Nairobi → Lamu', flights: 12, revenue: '$189,600' },
              { route: 'Nairobi → Johannesburg', flights: 8, revenue: '$225,000' },
            ].map((route, index) => (
              <div key={route.route} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#666666] font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-white font-medium">{route.route}</p>
                    <p className="text-[#666666] text-sm">{route.flights} flights</p>
                  </div>
                </div>
                <p className="text-[#C9A962] font-semibold">{route.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#141414] rounded-xl border border-[#1F1F1F]">
        <div className="p-6 border-b border-[#1F1F1F]">
          <h2 className="text-lg font-semibold text-white">Fleet Utilization</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { aircraft: 'Gulfstream G280', available: 12, booked: 8 },
            { aircraft: 'Citation XLS+', available: 8, booked: 5 },
            { aircraft: 'Learjet 75', available: 6, booked: 4 },
          ].map((fleet) => (
            <div key={fleet.aircraft} className="bg-[#1F1F1F] rounded-lg p-4">
              <p className="text-white font-medium mb-4">{fleet.aircraft}</p>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 h-2 bg-[#22C55E]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#22C55E] rounded-full"
                    style={{ width: `${(fleet.booked / (fleet.available + fleet.booked)) * 100}%` }}
                  />
                </div>
                <span className="text-[#22C55E] text-sm font-medium">{Math.round((fleet.booked / (fleet.available + fleet.booked)) * 100)}%</span>
              </div>
              <div className="flex justify-between text-xs text-[#666666]">
                <span>{fleet.booked} booked</span>
                <span>{fleet.available} available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
