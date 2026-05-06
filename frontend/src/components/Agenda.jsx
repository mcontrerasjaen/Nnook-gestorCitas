import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import "react-day-picker/style.css";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const HORAS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

const formatearFechaSQL = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export default function Agenda({ empleados, citasReales, theme, onSuccess }) {
  const [activeTab, setActiveTab] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const currentTabId = activeTab || (empleados.length > 0 ? empleados[0].id : null);

  useEffect(() => {
    if (empleados.length > 0 && activeTab === null) {
      setActiveTab(empleados[0].id);
    }
  }, [empleados.length]);

  const isoFecha = format(fechaSeleccionada, 'yyyy-MM-dd');

  const cambiarDia = (dias) => {
    const nueva = new Date(fechaSeleccionada);
    nueva.setDate(nueva.getDate() + dias);
    setFechaSeleccionada(nueva);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta cita?")) return;
    try {
      const response = await fetch(`https://humble-spoon-q75qxq4xj94gc647r-5000.app.github.dev/api/appointments/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) onSuccess();
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  if (empleados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 border-2 border-dashed border-white/5 rounded-[3rem] m-8">
        <p className="font-serif text-2xl text-white mb-2">Tu agenda está lista</p>
        <p className="text-sm uppercase tracking-widest opacity-40">Añade especialistas en Equipo para empezar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">      
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#111111] p-6 rounded-[2.5rem] border border-white/5 gap-4">
        <div className="relative group">
          <div className="flex items-center gap-4 bg-black px-6 py-4 rounded-2xl border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all shadow-2xl">
            <CalendarIcon size={20} className="text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-[8px] uppercase text-gray-500 font-black tracking-[0.2em] mb-1">Fecha de Gestión</span>
              <input
                type="date"
                value={formatearFechaSQL(fechaSeleccionada)}
                onChange={(e) => {
                  const nueva = new Date(e.target.value);
                  if (!isNaN(nueva)) setFechaSeleccionada(nueva);
                }}
                className="bg-transparent border-none outline-none text-white font-serif text-lg cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => cambiarDia(-1)} className="p-4 bg-black rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 text-gray-400 hover:text-[#D4AF37] transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setFechaSeleccionada(new Date())} className="px-8 py-4 bg-black rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
            Hoy
          </button>
          <button onClick={() => cambiarDia(1)} className="p-4 bg-black rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 text-gray-400 hover:text-[#D4AF37] transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
     
      <div className="flex flex-col flex-1 bg-[#0F0F0F] rounded-[2.5rem] border border-white/5 overflow-hidden">       
        <div className="flex p-4 gap-2 overflow-x-auto no-scrollbar border-b border-white/5 bg-black/20">
          {empleados.map(emp => (
            <button
              key={emp.id}
              onClick={() => setActiveTab(emp.id)}
              className={`px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${currentTabId === emp.id
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-black text-gray-500 border-white/5 hover:border-white/20'
                }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{emp.nombre}</span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-1 overflow-hidden h-[600px]">         
          <div className="flex flex-1 overflow-hidden h-[600px]">            
            <div className="w-20 border-r border-white/5 bg-black/40 flex-shrink-0">
              <div className="overflow-y-auto h-full no-scrollbar">
                {HORAS.map(h => (
                  <div key={h} className="h-24 flex items-center justify-center border-b border-white/[0.02]">
                    <span className="text-[10px] font-black text-gray-600">{h}</span>
                  </div>
                ))}
              </div>
            </div>
       
            <div className="flex-1 overflow-x-auto bg-[#0A0A0A] no-scrollbar">
              <div
                className="flex divide-x divide-white/5"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${empleados.length}, 350px)`,
                  minWidth: 'max-content'
                }}
              >
                {empleados.map(emp => (
                  <div key={emp.id} className="relative min-h-full border-r border-white/5">

                    <div className="sticky top-0 z-20 bg-[#0F0F0F] p-3 border-b border-white/5 text-center">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: emp.color || '#D4AF37' }}>
                        {emp.nombre}
                      </span>
                    </div>

                    {HORAS.map((h) => {
                      const citasDeEstaHora = citasReales?.filter(cita =>
                        String(cita.empleado_id) === String(emp.id) &&
                        cita.hora_inicio.substring(0, 5) === h &&
                        cita.fecha === isoFecha
                      ) || [];

                      return (
                        <div key={h} className="h-24 border-b border-white/[0.02] hover:bg-white/[0.01] relative group">
                          {citasDeEstaHora.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="text-[7px] text-white/5 uppercase font-black">Disponible</span>
                            </div>
                          )}

                          {citasDeEstaHora.map((cita) => (
                            <motion.div
                              key={cita.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute inset-x-2 p-3 rounded-xl bg-[#161616] border-l-4 shadow-2xl z-10 group/item"
                              style={{
                                borderColor: emp.color || '#D4AF37',
                                top: '8px',
                                height: '80px'
                              }}
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-[10px] font-black text-white uppercase truncate">{cita.cliente_nombre}</p>
                                <button onClick={() => handleEliminar(cita.id)} className="text-red-500/30 hover:text-red-500 transition-colors">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                              <p className="text-[8px] text-gray-500 mt-1 uppercase truncate">{cita.servicio_nombre}</p>
                            </motion.div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}