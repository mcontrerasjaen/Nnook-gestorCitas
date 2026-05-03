import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, X } from 'lucide-react';

export default function Login({ onLogin, onBack }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onLogin(formData.get('email'), formData.get('password'));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.05] blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative z-10"
      >
        <button onClick={onBack} className="absolute top-8 right-8 text-gray-600 hover:text-[#D4AF37] transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="text-black font-black text-xl italic">N</span>
          </div>
          <h2 className="text-3xl font-serif text-white mb-2">Bienvenido</h2>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Gestiona tu espacio de autor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input name="email" required type="email" placeholder="Email" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 text-white transition-all" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input name="password" required type="password" placeholder="Contraseña" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 text-white transition-all" />
          </div>

          <button type="submit" className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg uppercase tracking-widest text-xs mt-4">
            Entrar al Panel <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}