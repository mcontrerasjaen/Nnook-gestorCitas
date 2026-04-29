import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, UserRound, Sparkles, Crown } from 'lucide-react';


const segments = [
  {
    id: 'barber',
    title: 'Classic Barber',
    icon: <Scissors className="w-8 h-8" />,
    desc: 'Cortes rectos, barbas y estilo urbano.',
    color: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]',
    accent: '#D4AF37'
  },
  {
    id: 'ladies',
    title: 'Lady Hair Studio',
    icon: <Crown className="w-8 h-8" />,
    desc: 'Especialistas en color y tendencias.',
    color: 'hover:shadow-[0_0_30px_rgba(255,182,193,0.2)]',
    accent: '#E6B8A2' 
  },
  {
    id: 'beauty',
    title: 'Beauty & Spa',
    icon: <Sparkles className="w-8 h-8" />,
    desc: 'Tratamientos, relax y estética facial.',
    color: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
    accent: '#F5F5DC'
  },
  {
    id: 'unisex',
    title: 'Concept Store',
    icon: <UserRound className="w-8 h-8" />,
    desc: 'El equilibrio para el salón moderno.',
    color: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]',
    accent: '#D4AF37'
  }
];

export default function SegmentSelector({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37] blur-[120px] rounded-full transition-all duration-700 ease-in-out"
          style={{ opacity: hovered ? 0.4 : 0.1 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mb-16"
      >
        <h2 className="text-app-gold font-serif text-5xl mb-4 tracking-tighter">Nnook Style's</h2>
        <p className="text-gray-400 text-lg uppercase tracking-[0.2em]">Selecciona tu espacio</p>
      </motion.div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
        {segments.map((s) => (
          <motion.div
            key={s.id}
            onHoverStart={() => setHovered(s.id)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -10 }}
            onClick={() => onSelect(s.title)}
            className={`cursor-pointer bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl transition-all duration-300 ${s.color} group`}
          >
            <div className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300">
              {s.icon}
            </div>
            <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#D4AF37] transition-colors">
              {s.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {s.desc}
            </p>
            <div className="mt-8 h-[2px] w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}