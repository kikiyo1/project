
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PencilRuler, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();

  const navLinks = [
    { to: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, text: 'Dashboard' },
    { to: '/admin/editor', icon: <PencilRuler className="w-5 h-5" />, text: 'Editor Halaman' },
    { to: '/admin/products', icon: <Package className="w-5 h-5" />, text: 'Produk' },
  ];

  return (
    <aside className="w-64 bg-slate-900/50 backdrop-blur-lg border-r border-slate-700/50 flex-shrink-0 hidden md:flex flex-col">
      <div className="flex-1 py-8">
        <nav className="px-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-slate-700/50 hover:text-white ${
                  isActive ? 'bg-slate-700 text-white shadow-inner' : ''
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-red-500/20 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
