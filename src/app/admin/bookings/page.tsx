'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search, Eye, X, CheckCircle, XCircle, Clock, MapPin, Users, DollarSign, Phone, PhoneCall, Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  reference: string;
  type: string;
  tripType: string;
  date: string | null;
  passengers: number | null;
  subtotal: number | null;
  taxes: number | null;
  total: number | null;
  currency: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  createdAt: string;
  user: { name: string; email: string; phone: string } | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactName: string | null;
  tripDetails: string | null;
  aircraft: { name: string; image: string } | null;
  route: {
    flightTime: string;
    origin: { code: string; city: string };
    destination: { code: string; city: string };
  } | null;
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.contactName || booking.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.contactEmail || booking.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesType = typeFilter === 'all' || booking.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const callbackRequests = filteredBookings.filter(b => b.type === 'callback');
  const regularBookings = filteredBookings.filter(b => b.type !== 'callback');

  const formatAmount = (amount: number | null, currency: string) => {
    if (!amount) return '-';
    if (currency === 'KES') return `KES ${amount.toLocaleString()}`;
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'pending': return 'bg-[#C9A962]/20 text-[#C9A962]';
      case 'completed': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
      case 'cancelled': return 'bg-[#EF4444]/20 text-[#EF4444]';
      case 'callback_requested': return 'bg-[#A855F7]/20 text-[#A855F7]';
      case 'contacted': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
      default: return 'bg-[#666666]/20 text-[#666666]';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'pending': return 'bg-[#C9A962]/20 text-[#C9A962]';
      case 'failed': return 'bg-[#EF4444]/20 text-[#EF4444]';
      case 'refunded': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
      case 'awaiting_contact': return 'bg-[#A855F7]/20 text-[#A855F7]';
      default: return 'bg-[#666666]/20 text-[#666666]';
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchBookings();
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Search by reference, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-[#1F1F1F] rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-[#141414] text-[#A0A0A0] border border-[#1F1F1F] rounded-lg text-sm focus:outline-none focus:border-[#C9A962]"
          >
            <option value="all">All Types</option>
            <option value="booking">Bookings</option>
            <option value="callback">Callback Requests</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#141414] text-[#A0A0A0] border border-[#1F1F1F] rounded-lg text-sm focus:outline-none focus:border-[#C9A962]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="callback_requested">Callback Requested</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <>
          {callbackRequests.length > 0 && typeFilter !== 'booking' && (
            <div className="bg-[#A855F7]/10 rounded-xl border border-[#A855F7]/30 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#A855F7]/30">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#A855F7]" />
                  <h3 className="text-white font-semibold">Callback Requests ({callbackRequests.length})</h3>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#A855F7]/70 text-sm">
                    <th className="px-6 py-3 font-medium">Reference</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Contact</th>
                    <th className="px-6 py-3 font-medium">Trip Details</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {callbackRequests.map((booking) => (
                    <tr key={booking.id} className="border-t border-[#A855F7]/30 hover:bg-[#A855F7]/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-[#A855F7] font-mono font-medium">{booking.reference}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{booking.contactName || booking.user?.name || 'Guest'}</p>
                        <p className="text-[#666666] text-sm">{formatDate(booking.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#A0A0A0] text-sm">{booking.contactEmail || booking.user?.email}</p>
                        <p className="text-[#A0A0A0] text-sm">{booking.contactPhone || booking.user?.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        {booking.tripDetails ? (
                          <p className="text-[#A0A0A0] text-sm">{booking.tripDetails}</p>
                        ) : (
                          <span className="text-[#666666] text-sm">Not specified</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={`tel:${booking.contactPhone || booking.user?.phone}`}
                            className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F1F1F]">
              <h3 className="text-white font-semibold">Bookings ({regularBookings.length})</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-[#666666] text-sm border-b border-[#1F1F1F]">
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Route</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {regularBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#1F1F1F] hover:bg-[#1F1F1F]/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[#C9A962] font-mono font-medium">{booking.reference}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{booking.user?.name || 'Guest'}</p>
                        <p className="text-[#666666] text-sm">{booking.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#A0A0A0]">
                      {booking.route ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {booking.route.origin.code} → {booking.route.destination.code}
                        </div>
                      ) : (
                        <span className="text-[#666666]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#A0A0A0]">
                      {booking.date ? (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(booking.date)}
                        </div>
                      ) : (
                        <span className="text-[#666666]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">{formatAmount(booking.total, booking.currency)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <p className="text-[#A0A0A0]">No bookings found</p>
              </div>
            )}
          </div>
        </>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-2xl border border-[#1F1F1F] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedBooking.type === 'callback' ? 'Callback Request' : 'Booking Details'}
                </h2>
                <p className="text-[#C9A962] font-mono">{selectedBooking.reference}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-[#666666] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Customer</p>
                  <p className="text-white font-medium">{selectedBooking.contactName || selectedBooking.user?.name || 'Guest'}</p>
                  <p className="text-[#A0A0A0] text-sm">{selectedBooking.contactEmail || selectedBooking.user?.email}</p>
                  <p className="text-[#A0A0A0] text-sm flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {selectedBooking.contactPhone || selectedBooking.user?.phone || 'Not provided'}
                  </p>
                </div>
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Flight Details</p>
                  {selectedBooking.route ? (
                    <>
                      <p className="text-white font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C9A962]" />
                        {selectedBooking.route.origin.code} → {selectedBooking.route.destination.code}
                      </p>
                      <p className="text-[#A0A0A0] text-sm">{selectedBooking.aircraft?.name || 'Not selected'}</p>
                      <p className="text-[#A0A0A0] text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedBooking.passengers || 0} passengers
                      </p>
                    </>
                  ) : (
                    <p className="text-[#666666]">Not specified</p>
                  )}
                </div>
              </div>

              {selectedBooking.tripDetails && (
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Trip Details</p>
                  <p className="text-white">{selectedBooking.tripDetails}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Flight Date</p>
                  <p className="text-white">{formatDate(selectedBooking.date)}</p>
                </div>
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-[#C9A962]">{formatAmount(selectedBooking.total, selectedBooking.currency)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Booking Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-[#1F1F1F] rounded-lg p-4">
                  <p className="text-[#666666] text-sm mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPaymentColor(selectedBooking.paymentStatus)}`}>
                    {selectedBooking.paymentStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {selectedBooking.type === 'callback' && (
                <div className="flex flex-col gap-3">
                  <p className="text-[#666666] text-sm">Actions:</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'contacted')}
                      disabled={updating}
                      className="flex-1 py-3 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#3B82F6]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <PhoneCall className="w-5 h-5" />}
                      Mark as Contacted
                    </button>
                    <a
                      href={`tel:${selectedBooking.contactPhone || selectedBooking.user?.phone}`}
                      className="flex-1 py-3 bg-[#22C55E] text-white font-semibold rounded-lg hover:bg-[#22C55E]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                    disabled={updating}
                    className="py-3 bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30 font-semibold rounded-lg hover:bg-[#EF4444]/30 transition-colors disabled:opacity-50"
                  >
                    Dismiss Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
