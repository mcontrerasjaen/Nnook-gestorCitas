import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const EMPLEADOS = [
  { id: 1, nombre: 'Alex (Barber)', citas: [{ id: 101, cliente: 'Marc R.', hora: '09:00', duracion: 60, servicio: 'Corte + Barba' }] },
  { id: 2, nombre: 'Dani (Color)', citas: [{ id: 102, cliente: 'Sara P.', hora: '10:30', duracion: 90, servicio: 'Mechas Balayage' }] },
  { id: 3, nombre: 'Carla', citas: [] },
];

const HORAS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export default function Agenda({ citasReales, salonType, onSuccess }) {
  const [activeTab, setActiveTab] = useState(EMPLEADOS[0].id);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`https://humble-spoon-q75qxq4xj94gc647r-3001.app.github.dev/api/appointments/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-aura-dark/30 rounded-3xl border border-white/5 overflow-hidden">

      <div className="flex md:hidden border-b border-white/5 p-2 gap-2 overflow-x-auto no-scrollbar">
        {EMPLEADOS.map(emp => (
          <button
            key={emp.id}
            onClick={() => setActiveTab(emp.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeTab === emp.id ? 'bg-aura-gold text-aura-black' : 'bg-white/5 text-gray-400'
              }`}
          >
            {emp.nombre}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-auto bg-[#0F0F0F]">
        <div className="w-24 border-r border-[#D4AF37]/10 flex-shrink-0 bg-[#0F0F0F] sticky left-0 z-30">
          {HORAS.map((hora) => (
            <div key={hora} className="h-24 border-b border-white/5 flex flex-col items-center justify-center relative group">
              <div className="flex items-baseline">
                <span className="text-xl font-black text-white tracking-tighter shadow-sm">
                  {hora.split(':')}
                </span>
                <span className="text-[#D4AF37] font-black mx-0.5 text-lg">:</span>
                <span className="text-sm font-bold text-gray-500">
                  {hora.split(':')}
                </span>
              </div>
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mt-1">
                {parseInt(hora) < 12 ? 'AM' : 'PM'}
              </span>

              <div className="absolute right-0 w-[2px] h-3/4 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D4AF37]" />
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-x divide-white/5">
          {EMPLEADOS.map((emp) => (
            <div
              key={emp.id}
              className={`relative min-w-[250px] bg-[#0F0F0F] ${activeTab === emp.id ? 'block' : 'hidden md:block'}`}
            >
              <div className="hidden md:block sticky top-0 bg-[#0F0F0F]/80 backdrop-blur-md p-4 text-center border-b border-white/5 z-20">
                <span className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">
                  {emp.nombre}
                </span>
              </div>

              <div className="relative h-full">
                {HORAS.map((h) => (
                  <div key={h} className="h-24 border-b border-white/[0.02] select-none" />
                ))}

                {citasReales
                  .filter(cita => cita.cliente !== null)
                  .filter(cita => cita.salonType === salonType)
                  .filter(cita => Number(cita.empleadoId) === emp.id)
                  .map((cita) => (
                    <motion.div
                      key={cita.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        if (confirm(`¿Eliminar la reserva de ${cita.cliente}?`)) handleEliminar(cita.id);
                      }}
                      className="absolute left-3 right-3 p-3 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/20 shadow-2xl border-l-[6px] border-l-[#D4AF37] z-10 cursor-pointer transition-all duration-300 group hover:border-red-600 hover:border-l-red-600 hover:bg-red-950/40 flex flex-col"
                      style={{
                        top: `${(parseInt(cita.hora) - 9) * 96 + 10}px`,
                        height: `${(parseInt(cita.duracion) / 60) * 96 - 20}px`
                      }}
                    >                      
                      <div className="flex flex-col h-full group-hover:opacity-0 transition-opacity duration-200">
                        <div className="flex justify-between items-center mb-1 shrink-0">
                          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{cita.hora}</p>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                        </div>
                        <p className="text-xs font-black text-white truncate mb-2 shrink-0">{cita.cliente}</p>
                        <div className="flex-1 flex flex-col gap-1 overflow-hidden min-h-0">
                          {cita.bloques && cita.bloques.length > 0 ? (
                            cita.bloques.map((bloque, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between px-2 py-1 rounded-md border-l-2 text-[7px] font-black uppercase"
                                style={{ backgroundColor: `${bloque.color}15`, borderColor: bloque.color, color: bloque.color, flex: bloque.duracion }}
                              >
                                <span className="truncate">{bloque.tarea || bloque.name}</span>
                                <span className="opacity-60">{bloque.duracion}'</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-[9px] text-gray-500 font-bold truncate">{cita.servicio}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Trash2 size={20} className="text-red-500 mb-1 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Eliminar</span>
                      </div>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}