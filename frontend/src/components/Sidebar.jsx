import { Calendar, Users, Settings, Scissors, LayoutDashboard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Resumen', id: 'overview' },
  { icon: <Calendar size={20} />, label: 'Agenda', id: 'calendar' },
  { icon: <Users size={20} />, label: 'Clientes', id: 'clients' },
  { icon: <Scissors size={20} />, label: 'Servicios', id: 'services' },
  { icon: <Settings size={20} />, label: 'Configuración', id: 'settings' },
];

export default function Sidebar() {
  return (
    <>

      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1A1A1A] border-t border-[#D4AF37]/30 flex justify-around items-center z-50 md:hidden px-4">
        {menuItems.slice(0, 4).map((item) => (
          <button key={item.id} className="text-[#D4AF37]/60 hover:text-[#D4AF37] flex flex-col items-center transition-colors">
            {item.icon}
            <span className="text-[10px] uppercase mt-1 font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <aside className="hidden md:flex w-64 h-screen bg-[#0F0F0F] border-r border-[#D4AF37]/20 flex-col p-6 sticky top-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-9 h-9 bg-[#D4AF37] rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <span className="text-[#0F0F0F] font-black text-xl italic">N</span>
          </div>
          <h1 className="text-[#D4AF37] font-serif text-3xl tracking-tighter truncate">Nnook</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#D4AF37]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer transition-all group"
            >
              <span className="group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                {item.icon}
              </span>
              <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}