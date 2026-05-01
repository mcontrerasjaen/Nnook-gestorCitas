import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, FileText, MapPin, User, CreditCard, ArrowRight } from 'lucide-react';

export default function BusinessOnboardingForm({ onComplete }) {
  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center p-6 py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[3rem] p-10 shadow-2xl"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-white mb-2 text-center">Configuración Fiscal y Facturación</h2>
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold text-center">Completa el perfil de tu empresa para activar la plataforma</p>
        </div>

        <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* BLOQUE 1: DATOS FISCALES */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4 border-b border-[#D4AF37]/10 pb-2">
                <FileText className="text-[#D4AF37]" size={20} />
                <span className="text-white text-sm uppercase tracking-widest font-bold">Datos de Empresa</span>
              </div>
              
              <div className="space-y-4">
                <input required placeholder="Razón Social (Nombre Legal)" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
                <input required placeholder="CIF / NIF" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-600" size={16} />
                  <input required placeholder="Dirección Fiscal Completa" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
                </div>
              </div>
            </div>

            {/* BLOQUE 2: ADMINISTRADOR */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4 border-b border-[#D4AF37]/10 pb-2">
                <User className="text-[#D4AF37]" size={20} />
                <span className="text-white text-sm uppercase tracking-widest font-bold">Administrador</span>
              </div>
              
              <div className="space-y-4">
                <input required placeholder="Nombre del Administrador" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
                <input required placeholder="DNI / NIE" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
                <input required placeholder="Dirección del Administrador" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-[#D4AF37]/50 text-sm" />
              </div>
            </div>
          </div>

          {/* BLOQUE 3: PAGO Y SUBSCRIPCIÓN */}
          <div className="bg-[#D4AF37]/5 p-8 rounded-3xl border border-[#D4AF37]/20">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="text-[#D4AF37]" size={20} />
              <span className="text-white text-sm uppercase tracking-widest font-bold">Método de Pago y Domiciliación</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 text-gray-600" size={16} />
                <input required placeholder="Número de Cuenta (IBAN)" className="w-full bg-black border border-[#D4AF37]/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#D4AF37] text-sm text-[#D4AF37] font-mono" />
              </div>
              <div className="flex items-center text-gray-500 text-[10px] leading-tight px-2">
                <p>Al introducir tus datos, autorizas a Nnook a realizar el cargo mensual de la suscripción seleccionada.</p>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] uppercase tracking-widest text-xs">
            Confirmar y Activar mi Espacio <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}