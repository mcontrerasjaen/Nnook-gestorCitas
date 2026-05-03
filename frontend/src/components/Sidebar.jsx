import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { Calendar, Users, Settings, Scissors, LayoutDashboard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ theme, onLogout }) {
  
  const menuItems = [
    { icon: <Calendar size={20} />, label: 'Agenda', id: 'calendar' },
    { icon: <Users size={20} />, label: 'Equipo', id: 'staff' },
    { icon: <Scissors size={20} />, label: 'Servicios', id: 'services' },
    { icon: <LayoutDashboard size={20} />, label: 'Métricas', id: 'overview' },
    { icon: <Settings size={20} />, label: 'Ajustes', id: 'settings' },
  ];

  const accentColor = theme?.color || '#D4AF37';

  return (
    <>      
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1A1A1A] border-t border-white/10 flex justify-around items-center z-50 md:hidden px-4">
        {menuItems.slice(0, 4).map((item) => (
          <NavLink 
            key={item.id} 
            to={`/dashboard/${item.id}`}
            className="flex flex-col items-center transition-colors"
            style={({ isActive }) => ({
              color: isActive ? accentColor : 'rgba(255,255,255,0.4)'
            })}
          >
            {item.icon}
            <span className="text-[8px] uppercase mt-1 font-bold tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <aside className="hidden md:flex w-64 h-screen bg-[#0F0F0F] border-r border-white/5 flex-col p-6 sticky top-0">
        <div className="flex items-center gap-3 mb-12">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-lg"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}66` }}
          >
            <span className="text-[#0F0F0F] font-black text-xl italic">N</span>
          </div>
          <h1 className="text-white font-serif text-3xl tracking-tighter truncate">Nnook</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/dashboard/${item.id}`}
              className={({ isActive }) => `
                w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group
                ${isActive ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'}
              `}
            >              
              {({ isActive }) => (
                <>
                  <span 
                    className="transition-all"
                    style={{ color: isActive ? accentColor : '' }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="ml-auto w-1 h-4 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-600 hover:text-red-500 transition-colors group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-widest">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}