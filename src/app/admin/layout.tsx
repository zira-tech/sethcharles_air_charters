'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  LayoutDashboard, Plane, Route, BookOpen, Users, Settings, 
  LogOut, Menu, X, User
} from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/fleet', icon: Plane, label: 'Fleet' },
  { href: '/admin/routes', icon: Route, label: 'Routes' },
  { href: '/admin/bookings', icon: BookOpen, label: 'Bookings' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#141414] border-r border-[#1F1F1F] flex flex-col transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4 border-b border-[#1F1F1F]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold">S</span>
            </div>
            {isSidebarOpen && (
              <div>
                <span className="text-white font-semibold block">Sethcharles</span>
                <span className="text-[#666666] text-xs">Admin Panel</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#C9A962]/10 text-[#C9A962]'
                    : 'text-[#A0A0A0] hover:bg-[#1F1F1F] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1F1F1F] space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-[#A0A0A0] hover:bg-[#1F1F1F] rounded-lg transition-all"
          >
            <User className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Back to Site</span>}
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#C9A962] rounded-full flex items-center justify-center shadow-lg"
        >
          {isSidebarOpen ? (
            <X className="w-4 h-4 text-[#0A0A0A]" />
          ) : (
            <Menu className="w-4 h-4 text-[#0A0A0A]" />
          )}
        </button>
      </aside>

      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="bg-[#141414] border-b border-[#1F1F1F] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {navItems.find(item => item.href === pathname)?.label || 'Admin'}
            </h1>
            <p className="text-[#666666] text-sm">Manage your private jet charter business</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-[#1F1F1F] rounded-lg hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C989] flex items-center justify-center">
                  <span className="text-[#0A0A0A] font-bold text-sm">A</span>
                </div>
                <span className="text-white text-sm hidden sm:block">{session?.user?.name || 'Admin'}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg shadow-xl py-2">
                  <div className="px-4 py-2 border-b border-[#2A2A2A]">
                    <p className="text-white text-sm font-medium">{session?.user?.name || 'Admin'}</p>
                    <p className="text-[#666666] text-xs">{session?.user?.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
