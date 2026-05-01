import React from 'react';
import { Camera, MessageCircle, Mail, MapPin, Globe } from 'lucide-react'; // Iconos universales

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: BRANDING */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center font-bold text-[#0F0F0F]">N</div>
              <span className="text-white font-serif text-2xl tracking-tighter">Nnook</span>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Elevando la gestión de los espacios más exclusivos. Donde el diseño se encuentra con la eficiencia.
            </p>
          </div>

          {/* COLUMNA 2: SECTORES */}
          <div>
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-8">Especialidades</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Belleza y bienestar</li>
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Deporte & Nutricion</li>
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Salud y Cuidado</li>
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Otros</li>
            </ul>
          </div>

          {/* COLUMNA 3: SOPORTE */}
          <div>
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-8">Nnook Club</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Soporte Exclusivo</li>
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Planes de Membresía</li>
              <li className="hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest">Historias de Éxito</li>
            </ul>
          </div>

          {/* COLUMNA 4: CONECTA (Iconos Corregidos) */}
          <div>
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-8">Conecta</h4>
            <div className="flex gap-6 mb-6">
              <Camera size={20} className="text-gray-500 hover:text-[#D4AF37] transition-all cursor-pointer" />
              <MessageCircle size={20} className="text-gray-500 hover:text-[#D4AF37] transition-all cursor-pointer" />
              <Globe size={20} className="text-gray-500 hover:text-[#D4AF37] transition-all cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
              <MapPin size={14} className="text-[#D4AF37]" />
              <span>Ibiza · Madrid · Dubai</span>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL: COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black">
          <p>© 2026 Nnook Management · All Rights Reserved</p>
          <div className="flex gap-8">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Terms of Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
}