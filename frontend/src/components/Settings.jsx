import React from 'react';
import { Trash2, AlertTriangle, ShieldOff } from 'lucide-react';

export default function Settings({ businessInfo, onDeleteBusiness, currentBusinessId }) {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-3xl font-serif text-white mb-2">Ajustes</h2>
        <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">Configuración de tu cuenta de autor</p>
      </div>

      <div className="space-y-6">
        {/* INFO DEL NEGOCIO (Solo lectura por ahora) */}
        <div className="bg-[#141414] p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest mb-6">Información General</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 text-[10px] uppercase font-bold mb-1">Nombre del Salón</p>
              <p className="text-white font-medium">{businessInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px] uppercase font-bold mb-1">Email de contacto</p>
              <p className="text-white font-medium">{businessInfo.email}</p>
            </div>
          </div>
        </div>

        {/* ZONA DE PELIGRO */}
        <div className="mt-12 p-1 border border-red-500/20 rounded-[2.5rem] bg-red-500/[0.02]">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <AlertTriangle size={20} />
              <h3 className="font-black text-[10px] uppercase tracking-widest">Zona de Peligro</h3>
            </div>
            
            <p className="text-gray-500 text-xs mb-8 leading-relaxed max-w-xl">
              Al dar de baja la empresa, se eliminarán permanentemente todos los datos: especialistas, 
              servicios configurados e historial de citas. Esta acción no se puede deshacer.
            </p>

            <button
              onClick={() => onDeleteBusiness(currentBusinessId)}
              className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
            >
              <Trash2 size={16} className="group-hover:animate-bounce" />
              Dar de baja mi empresa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}