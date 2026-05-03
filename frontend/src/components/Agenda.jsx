import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Clock } from 'lucide-react';

const HORAS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export default function Agenda({ empleados, citasReales, theme, onSuccess, salonType }) {
  console.log("🔍 Agenda renderizando con:", empleados.length, "empleados");
  const [activeTab, setActiveTab] = useState(null);

  const currentTabId = activeTab || (empleados.length > 0 ? empleados[0].id : null);

  useEffect(() => {
    if (empleados.length > 0 && activeTab === null) {
      setActiveTab(empleados[0].id);
    }
  }, [empleados.length]);

  const handleEliminar = async (id) => {
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
    <div className="flex flex-col h-full bg-[#0F0F0F] rounded-[2.5rem] border border-white/5 overflow-hidden">
      {/* Selector para móvil */}
      {empleados.length > 1 && (
        <div className="flex md:hidden border-b border-white/5 p-4 gap-3 overflow-x-auto bg-black/40">
          {empleados.map(emp => (
            <button
              key={emp.id}
              onClick={() => setActiveTab(emp.id)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${(activeTab === emp.id || (!activeTab && empleados[0].id === emp.id))
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-white/5 text-gray-500'
                }`}
            >
              {emp.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-1 overflow-auto">
        {/* Columna fija de Horas */}
        <div className="w-24 border-r border-white/5 flex-shrink-0 bg-[#0A0A0A] sticky left-0 z-30">
          {HORAS.map((hora) => (
            <div key={hora} className="h-24 border-b border-white/[0.02] flex flex-col items-center justify-center text-white font-bold bg-[#0A0A0A]">
              <span className="text-lg tracking-tighter">{hora}</span>
              <span className="text-[8px] text-[#D4AF37] font-black tracking-widest uppercase opacity-60">
                {parseInt(hora) < 12 ? 'AM' : 'PM'}
              </span>
            </div>
          ))}
        </div>

        {/* CONTENEDOR DE COLUMNAS */}
        <div
          className="flex-1 grid divide-x divide-white/5"
          style={{
            gridTemplateColumns: `repeat(${empleados.length}, minmax(280px, 1fr))`,
            minWidth: '100%'
          }}
        >
          {empleados.map((emp) => (
            <div
              key={emp.id}
             
              className={`relative bg-[#0F0F0F] min-h-full ${currentTabId === emp.id ? 'block' : 'hidden md:block'
                }`}
            >
              {/* Cabecera del Empleado */}
              <div className="sticky top-0 bg-[#0F0F0F]/95 backdrop-blur-md p-5 text-center border-b border-white/5 z-20">
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-2 shadow-[0_0_10px]"
                  style={{ backgroundColor: emp.color, boxShadow: `0 0 10px ${emp.color}` }}
                />
                <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] block truncate">{emp.nombre}</span>
                <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">{emp.especialidad}</span>
              </div>

              {/* Rejilla de Horas y Citas Integradas */}
              <div className="relative">
                {HORAS.map((horaFila) => (
                  <div key={horaFila} className="h-24 border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors relative">

                    {/* Pintar citas que coincidan con ESTA hora y ESTE empleado */}
                    {citasReales && citasReales
                      .filter(cita => {
                        const horaCita = cita.hora_inicio ? cita.hora_inicio.substring(0, 5) : "";
                        const esMismoEmpleado = String(cita.empleado_id) === String(emp.id);
                        return esMismoEmpleado && horaCita === horaFila;
                      })
                      .map((cita) => (
                        <motion.div
                          key={cita.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-x-2 p-4 rounded-2xl bg-[#1A1A1A] border-l-[6px] shadow-2xl z-10 group"
                          style={{ borderColor: emp.color, top: '8px', height: '80px' }}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-gray-500 uppercase">{cita.hora_inicio.substring(0, 5)}</span>
                            <button onClick={() => handleEliminar(cita.id)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity">
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <p className="text-xs font-black text-white uppercase truncate">{cita.cliente_nombre || cita.cliente}</p>
                        </motion.div>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}