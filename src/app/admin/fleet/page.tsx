'use client';

import { useState, useEffect } from 'react';
import { Plane, Edit2, Trash2, Plus, Search, Users, MapPin, X } from 'lucide-react';

interface Aircraft {
  id: string;
  name: string;
  category: string;
  passengers: number;
  range: number;
  speed: number;
  baggage: number;
  price: number;
  image: string;
  features: string;
  status: string;
}

export default function FleetManagement() {
  const [fleet, setFleet] = useState<Aircraft[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState<Aircraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      const res = await fetch('/api/aircraft');
      const data = await res.json();
      setFleet(data);
    } catch (error) {
      console.error('Failed to fetch fleet:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFleet = fleet.filter((aircraft) => {
    const matchesSearch = aircraft.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || aircraft.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (aircraft: Aircraft) => {
    setEditingAircraft(aircraft);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this aircraft?')) return;
    
    try {
      await fetch(`/api/aircraft?id=${id}`, { method: 'DELETE' });
      setFleet(fleet.filter((a) => a.id !== id));
    } catch (error) {
      alert('Failed to delete aircraft');
    }
  };

  const handleSave = async (data: Partial<Aircraft>) => {
    try {
      if (editingAircraft) {
        const res = await fetch('/api/aircraft', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, id: editingAircraft.id }),
        });
        const updated = await res.json();
        setFleet(fleet.map((a) => (a.id === updated.id ? updated : a)));
      } else {
        const res = await fetch('/api/aircraft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        setFleet([created, ...fleet]);
      }
      setShowModal(false);
      setEditingAircraft(null);
    } catch (error) {
      alert('Failed to save aircraft');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'light': return 'bg-[#3B82F6]/20 text-[#3B82F6]';
      case 'midsize': return 'bg-[#C9A962]/20 text-[#C9A962]';
      case 'heavy': return 'bg-[#A855F7]/20 text-[#A855F7]';
      default: return 'bg-[#666666]/20 text-[#666666]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'maintenance': return 'bg-[#EF4444]/20 text-[#EF4444]';
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
            placeholder="Search aircraft..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-[#1F1F1F] rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#C9A962]"
          />
        </div>

        <div className="flex gap-3">
          {['all', 'light', 'midsize', 'heavy'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#C9A962] text-[#0A0A0A]'
                  : 'bg-[#141414] text-[#A0A0A0] border border-[#1F1F1F] hover:border-[#C9A962]'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setEditingAircraft(null); setShowModal(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Aircraft
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#666666] text-sm border-b border-[#1F1F1F]">
                <th className="px-6 py-4 font-medium">Aircraft</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Passengers</th>
                <th className="px-6 py-4 font-medium">Range</th>
                <th className="px-6 py-4 font-medium">Base Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map((aircraft) => (
                <tr key={aircraft.id} className="border-b border-[#1F1F1F] hover:bg-[#1F1F1F]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={aircraft.image} alt={aircraft.name} className="w-12 h-8 object-cover rounded" />
                      <span className="text-white font-medium">{aircraft.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(aircraft.category)}`}>
                      {aircraft.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A0A0A0]">
                    <Users className="w-4 h-4 inline mr-1" />
                    {aircraft.passengers}
                  </td>
                  <td className="px-6 py-4 text-[#A0A0A0]">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {aircraft.range.toLocaleString()} mi
                  </td>
                  <td className="px-6 py-4 text-[#C9A962] font-semibold">
                    ${aircraft.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(aircraft.status)}`}>
                      {aircraft.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(aircraft)} className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(aircraft.id)} className="w-8 h-8 rounded-lg bg-[#1F1F1F] flex items-center justify-center text-[#A0A0A0] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFleet.length === 0 && (
            <div className="p-12 text-center">
              <Plane className="w-12 h-12 text-[#666666] mx-auto mb-4" />
              <p className="text-[#A0A0A0]">No aircraft found</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <AircraftModal
          aircraft={editingAircraft}
          onClose={() => { setShowModal(false); setEditingAircraft(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function AircraftModal({ aircraft, onClose, onSave }: { aircraft: Aircraft | null; onClose: () => void; onSave: (data: Partial<Aircraft>) => void }) {
  const [formData, setFormData] = useState({
    name: aircraft?.name || '',
    category: aircraft?.category || 'light',
    passengers: aircraft?.passengers || 4,
    range: aircraft?.range || 2000,
    speed: aircraft?.speed || 500,
    baggage: aircraft?.baggage || 4,
    price: aircraft?.price || 5000,
    image: aircraft?.image || '',
    features: aircraft?.features || '',
    status: aircraft?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-lg border border-[#1F1F1F] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {aircraft ? 'Edit Aircraft' : 'Add New Aircraft'}
          </h2>
          <button onClick={onClose} className="text-[#666666] hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#A0A0A0] text-sm mb-2">Aircraft Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              >
                <option value="light">Light Jet</option>
                <option value="midsize">Midsize Jet</option>
                <option value="heavy">Heavy Jet</option>
              </select>
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Passengers</label>
              <input type="number" value={formData.passengers} onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })} className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Range (mi)</label>
              <input type="number" value={formData.range} onChange={(e) => setFormData({ ...formData, range: parseInt(e.target.value) })} className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Speed (mph)</label>
              <input type="number" value={formData.speed} onChange={(e) => setFormData({ ...formData, speed: parseInt(e.target.value) })} className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Baggage</label>
              <input type="number" value={formData.baggage} onChange={(e) => setFormData({ ...formData, baggage: parseInt(e.target.value) })} className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
            </div>
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Base Price (USD)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
            </div>
          </div>

          <div>
            <label className="block text-[#A0A0A0] text-sm mb-2">Image URL</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
          </div>

          <div>
            <label className="block text-[#A0A0A0] text-sm mb-2">Features (comma-separated)</label>
            <input type="text" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="WiFi, Catering, Bed" className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]" />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#2A2A2A] text-[#A0A0A0] rounded-lg hover:border-[#C9A962] transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors">
              {aircraft ? 'Update' : 'Add'} Aircraft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
