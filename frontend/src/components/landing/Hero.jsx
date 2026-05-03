import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const empresas = [
  { name: 'Gentleman Barber', zona: 'Madrid', img: 'https://unsplash.com' },
  { name: 'Aura Wellness', zona: 'Barcelona', img: 'https://unsplash.com' },
  { name: 'Studio 54 Hair', zona: 'Valencia', img: 'https://unsplash.com' },
  { name: 'Zen Yoga', zona: 'Sevilla', img: 'https://unsplash.com' },
  { name: 'Luxury Nails', zona: 'Marbella', img: 'https://unsplash.com' }
];

export default function Hero({ onStart, onLoginClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* --- NAVBAR FIJO --- */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-[#050505]/40 backdrop-blur-xl">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="text-black font-black text-2xl italic">N</span>
          </div>
          <span className="text-white font-serif text-2xl tracking-tighter hidden md:block">Nnook</span>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <button onClick={onLoginClick} className="text-gray-400 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] transition-all">
            Acceso Clientes
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onStart}
            className="px-8 py-3 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all"
          >
            Registrar mi Empresa
          </motion.button>
        </div>
      </nav>

      {/* --- EFECTO AURA --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 z-10 text-center pt-24">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-serif mb-8 tracking-tighter leading-tight">
          <span className="text-white font-black">Nnook,</span> <br />
          <span className="bg-gradient-to-b from-[#F5E1A4] via-[#D4AF37] to-[#8A6D3B] bg-clip-text text-transparent italic">tu espacio de reservas.</span>
        </motion.h1>

        {/* --- BUSCADOR --- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl mx-auto bg-[#111111]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-1 mb-16">
          <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 border-b md:border-b-0 md:border-r border-white/5">
            <Search size={18} className="text-[#D4AF37]" />
            <input type="text" placeholder="¿Qué buscas?" className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-800" />
          </div>
          <div className="flex-1 w-full flex items-center gap-4 px-8 py-4">
            <MapPin size={18} className="text-[#D4AF37]" />
            <input type="text" placeholder="¿Dónde?" className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-800" />
          </div>
          <button className="w-full md:w-auto bg-[#D4AF37] text-black px-12 py-5 rounded-2xl md:rounded-full font-black uppercase tracking-tighter text-xs hover:scale-105 transition-all">
            Buscar
          </button>
        </motion.div>

        {/* --- CARRUSEL --- */}
        <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] overflow-hidden py-4">
          <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] mb-8">Únete a la comunidad Nnook</p>
          <div className="flex relative">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-8 whitespace-nowrap">
              {[...empresas, ...empresas].map((emp, i) => (
                <div key={i} className="inline-block w-64 md:w-80 group cursor-pointer">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#111111]">
                    <img src={emp.img} alt={emp.name} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-left">
                      <p className="text-white text-xs font-bold uppercase truncate">{emp.name}</p>
                      <p className="text-[#D4AF37] text-[8px] font-black uppercase tracking-widest">{emp.zona}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          </div>
        </div>
      </div>

      {/* --- EXPLORAR --- */}
      <motion.a href="#info" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group z-20">
        <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.6em] font-black group-hover:text-white transition-all">EXPLORAR</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 group-hover:border-[#D4AF37] transition-all">
          <ChevronDown size={20} className="text-[#D4AF37]" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20" />
        </motion.div>
      </motion.a>
    </section>
  );
}