import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
           
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4AF37] blur-[150px] rounded-full pointer-events-none"
      />
      
      <div className="container mx-auto px-6 z-10 text-center">        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-10"
        >
          <span className="px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            The New Standard of Excellence
          </span>
        </motion.div>
        
        <motion.h1
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter leading-tight"
>
  <span className="text-white font-black tracking-tighter">Nnook,</span> <br />
  <span className="bg-gradient-to-b from-[#F5E1A4] via-[#D4AF37] to-[#8A6D3B] bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
    tu espacio de reservas.
  </span>
</motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-14 font-light tracking-wide italic"
        >
          "Donde la alta peluquería y el bienestar encuentran su máxima expresión tecnológica."
        </motion.p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(212,175,55,0.4)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onStart}    
    className="relative px-12 py-5 bg-[#D4AF37] text-[#050505] font-black uppercase tracking-tighter text-sm rounded-full overflow-hidden transition-all group"
  >
    <span className="relative z-10">Registrar mi Empresa</span>
    
    <motion.div
      initial={{ left: '-100%' }}
      animate={{ left: '200%' }}
      transition={{ 
        repeat: Infinity, 
        duration: 3, 
        ease: "easeInOut",
        repeatDelay: 1 
      }}
      className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] z-0"
    />

    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
  </motion.button>
  
  <motion.button
    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    className="group flex items-center gap-3 px-10 py-5 text-white border border-[#D4AF37]/40 rounded-full font-bold uppercase tracking-tighter text-sm transition-all"
  >
    Ver Demo Exclusiva
    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-[#D4AF37]" />
  </motion.button>
</div>
      </div>
      
        <a href="#info" className="cursor-pointer group">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[9px] text-[#D4AF37] group-hover:text-white uppercase tracking-[0.5em] font-bold transition-colors">
            Discover
          </span>
          <ChevronDown size={20} className="text-[#D4AF37] group-hover:text-white transition-colors" />
        </motion.div>
      </a>

      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent ml-[5%] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent mr-[5%] pointer-events-none" />
    </section>
  );
}