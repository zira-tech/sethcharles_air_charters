'use client';

import { useState, useEffect } from 'react';
import { Route, Edit2, Trash2, Plus, Search, Clock, MapPin, DollarSign, X } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  code: string;
  city: string;
}

interface RouteData {
  id: string;
  flightTime: string;
  price: number;
  status: string;
  originId: string;
  destinationId: string;
  origin: Location;
  destination: Location;
}

export default function RoutesManagement() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [routesRes, locationsRes] = await Promise.all([
        fetch('/api/routes'),
        fetch('/api/locations'),
      ]);
      const routesData = await routesRes.json();
      const locationsData = await locationsRes.json();
      setRoutes(routesData);
      setLocations(locationsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoutes = routes.filter((route) =>
    route.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.origin.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.destination.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (route: RouteData) => {
    setEditingRoute(route);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    
    try {
      await fetch(`/api/routes?id=${id}`, { method: 'DELETE' });
      setRoutes(routes.filter((r) => r.id !== id));
    } catch (error) {
      alert('Failed to delete route');
    }
  };

  const handleSave = async (data: Partial<RouteData>) => {
    try {
      if (editingRoute) {
        const res = await fetch('/api/routes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, id: editingRoute.id }),
        });
        const updated = await res.json();
        setRoutes(routes.map((r) => (r.id === updated.id ? updated : r)));
      } else {
        const res = await fetch('/api/routes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        setRoutes([created, ...routes]);
      }
      setShowModal(false);
      setEditingRoute(null);
    } catch (error) {
      alert('Failed to save route');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'inactive': return 'bg-[#666666]/20 text-[#666666]';
      case 'seasonal': return 'bg-[#C9A962]/20 text-[#C9A962]';
      default: return 'bg-[#666666]/20 text-[#666666]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-[#1F1F1F] rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
          />
        </div>

        <button
          onClick={() => { setEditingRoute(null); setShowModal(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Route
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="bg-[#141414] rounded-xl border border-[#1F1F1F] p-6 hover:border-[#C9A962]/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(route)} className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(route.id)} className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-2 bg-[#C9A962]/10 rounded-lg">
                  <span className="text-[#C9A962] font-bold">{route.origin.code}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                <Route className="w-5 h-5 text-[#C9A962]" />
                <div className="flex-1 h-px bg-gradient-to-l from-[#C9A962] to-[#C9A962]/30" />
                <div className="px-3 py-2 bg-[#C9A962]/10 rounded-lg">
                  <span className="text-[#C9A962] font-bold">{route.destination.code}</span>
                </div>
              </div>

              <p className="text-white font-medium mb-2">{route.origin.city} → {route.destination.city}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A0A0A0] flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {route.flightTime}
                </span>
                <span className="text-[#C9A962] font-semibold">from ${route.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredRoutes.length === 0 && !loading && (
        <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] p-12 text-center">
          <Route className="w-12 h-12 text-[#666666] mx-auto mb-4" />
          <p className="text-[#A0A0A0]">No routes found</p>
        </div>
      )}

      {showModal && (
        <RouteModal
          route={editingRoute}
          locations={locations}
          onClose={() => { setShowModal(false); setEditingRoute(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function RouteModal({ route, locations, onClose, onSave }: { route: RouteData | null; locations: Location[]; onClose: () => void; onSave: (data: Partial<RouteData>) => void }) {
  const [formData, setFormData] = useState({
    originId: route?.originId || (locations[0]?.id || ''),
    destinationId: route?.destinationId || (locations[1]?.id || ''),
    flightTime: route?.flightTime || '1h 00m',
    price: route?.price || 5000,
    status: route?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-[#1F1F1F]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {route ? 'Edit Route' : 'Add New Route'}
          </h2>
          <button onClick={onClose} className="text-[#666666] hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Origin</label>
              <select
                value={formData.originId}
                onChange={(e) => setFormData({ ...formData, originId: e.target.value })}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.code} - {loc.city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Destination</label>
              <select
                value={formData.destinationId}
                onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.code} - {loc.city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Flight Time</label>
              <input
                type="text"
                value={formData.flightTime}
                onChange={(e) => setFormData({ ...formData, flightTime: e.target.value })}
                placeholder="e.g., 1h 30m"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Base Price (USD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A0A0A0] text-sm mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#2A2A2A] text-[#A0A0A0] rounded-lg hover:border-[#C9A962] transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors">
              {route ? 'Update' : 'Add'} Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
