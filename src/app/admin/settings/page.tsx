'use client';

import { useState, useEffect } from 'react';
import { Settings, Globe, CreditCard, Bell, Mail, Shield, DollarSign, Percent, Clock, Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [settings, setSettings] = useState({
    company_name: 'Sethcharles Air Charters Ltd',
    tagline: 'Your Africa. Your Way.',
    contact_email: 'flights@sethcharlesair.com',
    phone: '+254 700 123 456',
    address: 'Westlands Business Park, Nairobi, Kenya',
    currency: 'USD',
    tax_rate: '16',
    minimum_notice_hours: '4',
    return_discount: '20',
    kes_rate: '155',
    eur_rate: '0.92',
    gbp_rate: '0.79',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to load settings');
      setSettings((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
    } catch (error) {
      console.error('Failed to save setting:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await saveSetting(key, value);
      }
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save some settings' });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#C9A962] animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'currency', label: 'Currency Rates', icon: DollarSign },
    { id: 'locations', label: 'Locations', icon: Globe },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C9A962] text-[#0A0A0A]'
                : 'bg-[#141414] text-[#A0A0A0] border border-[#1F1F1F] hover:border-[#C9A962]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#141414] rounded-xl border border-[#1F1F1F] p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">General Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.company_name}
                  onChange={(e) => updateSetting('company_name', e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => updateSetting('tagline', e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => updateSetting('phone', e.target.value)}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => updateSetting('address', e.target.value)}
                rows={3}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962] resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Pricing Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Default Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => updateSetting('currency', e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="KES">KES (KSh)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.tax_rate}
                  onChange={(e) => updateSetting('tax_rate', e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Minimum Booking Notice (hours)</label>
              <input
                type="number"
                value={settings.minimum_notice_hours}
                onChange={(e) => updateSetting('minimum_notice_hours', e.target.value)}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A0A0A0] text-sm mb-2">Return Trip Discount (%)</label>
                <input
                  type="number"
                  value={settings.return_discount}
                  onChange={(e) => updateSetting('return_discount', e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'currency' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Currency Exchange Rates</h3>
            <p className="text-[#A0A0A0] text-sm mb-4">
              Set your preferred exchange rates. 1 USD equals:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🇰🇪</span>
                  <div>
                    <p className="text-white font-semibold">Kenya Shilling</p>
                    <p className="text-[#666666] text-sm">KES</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">1 USD = KES</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.kes_rate}
                    onChange={(e) => updateSetting('kes_rate', e.target.value)}
                    className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>

              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🇪🇺</span>
                  <div>
                    <p className="text-white font-semibold">Euro</p>
                    <p className="text-[#666666] text-sm">EUR</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">1 USD = EUR</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.eur_rate}
                    onChange={(e) => updateSetting('eur_rate', e.target.value)}
                    className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>

              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#2A2A2A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <p className="text-white font-semibold">British Pound</p>
                    <p className="text-[#666666] text-sm">GBP</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[#A0A0A0] text-sm mb-2">1 USD = GBP</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.gbp_rate}
                    onChange={(e) => updateSetting('gbp_rate', e.target.value)}
                    className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1F1F1F] rounded-xl p-4 border border-[#2A2A2A]">
              <p className="text-[#A0A0A0] text-sm">
                <strong className="text-[#C9A962]">Tip:</strong> These rates are used for currency conversion in quotes and bookings. Update regularly to reflect current market rates.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Rates
              </button>
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Base Locations</h3>
            
            <div className="bg-[#1F1F1F] rounded-lg p-4 mb-6">
              <p className="text-white font-medium mb-2">Primary Hub</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  defaultValue="Nairobi"
                  placeholder="City"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
                <input
                  type="text"
                  defaultValue="NBO"
                  placeholder="Code"
                  maxLength={3}
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white uppercase focus:outline-none focus:border-[#C9A962]"
                />
                <input
                  type="text"
                  defaultValue="Jomo Kenyatta International Airport"
                  placeholder="Airport Name"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Payment Gateways</h3>
            
            <div className="bg-[#1F1F1F] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">M-Pesa (Safaricom)</p>
                  <p className="text-[#666666] text-sm">Kenya mobile payments</p>
                </div>
                <span className="px-3 py-1 bg-[#22C55E]/20 text-[#22C55E] text-sm rounded-full">Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Consumer Key"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
                <input
                  type="password"
                  placeholder="Consumer Secret"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div className="bg-[#1F1F1F] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">Paystack</p>
                  <p className="text-[#666666] text-sm">Card & international payments</p>
                </div>
                <span className="px-3 py-1 bg-[#22C55E]/20 text-[#22C55E] text-sm rounded-full">Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Public Key"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
                <input
                  type="password"
                  placeholder="Secret Key"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#C9A962]"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Email Notifications</h3>
            
            <div className="space-y-4">
              {[
                { label: 'New booking confirmation', key: 'notify_booking', enabled: true },
                { label: 'Payment received', key: 'notify_payment', enabled: true },
                { label: 'Booking reminder (24h before)', key: 'notify_reminder', enabled: true },
                { label: 'Marketing newsletters', key: 'notify_marketing', enabled: false },
                { label: 'Special offers & promotions', key: 'notify_promotions', enabled: false },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-[#1F1F1F]">
                  <span className="text-white">{setting.label}</span>
                  <button
                    onClick={() => updateSetting(setting.key, setting.enabled ? 'false' : 'true')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-[#C9A962]' : 'bg-[#2A2A2A]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
            
            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Admin Email</label>
              <input
                type="email"
                defaultValue="admin@sethcharlesair.com"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div>
              <label className="block text-[#A0A0A0] text-sm mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A962]"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#E5C989] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
