import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Crown, Sparkles, UserRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

// Categorías y Especialidades
const CATEGORIES = [
  { id: 'belleza', title: 'Belleza y Bienestar', icon: <Sparkles /> },
  { id: 'deporte', title: 'Deporte y Salud', icon: <UserRound /> }
];

const SPECIALTIES = {
  belleza: [
    { id: 'barber', title: 'Classic Barber', icon: <Scissors />, desc: 'Cortes rectos y estilo urbano.', accent: '#D4AF37' },
    { id: 'ladies', title: 'Lady Hair Studio', icon: <Crown />, desc: 'Color y tendencias.', accent: '#E6B8A2' },
    { id: 'beauty', title: 'Beauty & Spa', icon: <Sparkles />, desc: 'Tratamientos y relax.', accent: '#F5F5DC' }
  ],
  deporte: [
    { id: 'gym', title: 'Fitness Studio', icon: <UserRound />, desc: 'Entrenamiento personal.', accent: '#FF4500' }
  ]
};

export default function SegmentSelector({ onSelect }) {
  const [step, setStep] = useState(1); 
  const [selection, setSelection] = useState({ category: null, specialty: null });  
  const selectCategory = (cat) => {
    setSelection({ ...selection, category: cat });
    setStep(2);
  };
 
  const selectSpecialty = (spec) => {
    setSelection({ ...selection, specialty: spec });
    setStep(3);
  };

  return (
    <section className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-6 relative overflow-hidden">     
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full transition-all duration-1000"
          style={{ backgroundColor: selection.specialty?.accent || '#D4AF37' }}
        />
      </div>

      <AnimatePresence mode="wait">        
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="z-10 w-full max-w-4xl text-center">
            <h2 className="text-[#D4AF37] font-serif text-5xl mb-12">¿En qué sector te mueves?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CATEGORIES.map(cat => (
                <div key={cat.id} onClick={() => selectCategory(cat)} className="cursor-pointer bg-[#1A1A1A] border border-white/5 p-12 rounded-3xl hover:border-[#D4AF37]/40 transition-all group">
                  <div className="text-[#D4AF37] mb-4 flex justify-center scale-150">{cat.icon}</div>
                  <h3 className="text-2xl text-white font-bold">{cat.title}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        )}
       
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="z-10 w-full max-w-6xl text-center">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 mx-auto uppercase text-xs tracking-widest">
              <ArrowLeft size={16} /> Volver a categorías
            </button>
            <h2 className="text-[#D4AF37] font-serif text-5xl mb-12">Define tu especialidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SPECIALTIES[selection.category.id].map(s => (
                <div key={s.id} onClick={() => selectSpecialty(s)} className="cursor-pointer bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] group transition-all text-left">
                  <div className="text-[#D4AF37] mb-6">{s.icon}</div>
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#D4AF37]">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 w-full max-w-md">
            <div className="bg-[#141414] border border-[#D4AF37]/30 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selection.specialty.accent }} />

              <div className="flex justify-center mb-8">
                <div className="p-5 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] scale-150">
                  {selection.specialty.icon}
                </div>
              </div>

              <h2 className="text-white text-3xl font-serif mb-2">Identidad Nnook</h2>
              <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <CheckCircle2 size={12} /> Espacio Confirmado
              </div>

              <div className="space-y-4 mb-10 text-left bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Categoría</span>
                  <span className="text-white text-sm font-medium">{selection.category.title}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Especialidad</span>
                  <span className="text-white text-sm font-medium">{selection.specialty.title}</span>
                </div>
              </div>

              <div className="space-y-6 mt-10">

                <button
                  onClick={() => onSelect(selection)}
                  className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] active:scale-0.95 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                >
                  Confirmar y Configurar Dashboard
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#D4AF37] border border-white/5 hover:border-[#D4AF37]/20 rounded-xl transition-all"
                >
                  ← Volver y cambiar especialidad
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}