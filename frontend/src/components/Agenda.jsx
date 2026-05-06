import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CustomCalendar from './CustomCalendar';

const HORAS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

const formatearFechaSQL = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export default function Agenda({ empleados, citasReales, onSuccess, actions }) {
  const [activeTab, setActiveTab] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [vista, setVista] = useState('dia');

  const currentTabId = activeTab || (empleados.length > 0 ? empleados[0].id : null);
  const isoFecha = format(fechaSeleccionada, 'yyyy-MM-dd');

  useEffect(() => {
    if (empleados.length > 0 && activeTab === null) {
      setActiveTab(empleados[0].id);
    }
  }, [empleados]);

  useEffect(() => {
    const fechaStr = formatearFechaSQL(fechaSeleccionada);
    if (onSuccess) onSuccess(fechaStr);
  }, [fechaSeleccionada]);

  const cambiarDia = (dias) => {
    const nueva = new Date(fechaSeleccionada);
    nueva.setDate(nueva.getDate() + dias);
    setFechaSeleccionada(nueva);
  };

  const obtenerDiasSemana = (fecha) => {
    const d = new Date(fecha);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const lunes = new Date(d.setDate(diff));
    return [...Array(7)].map((_, i) => {
      const dia = new Date(lunes);
      dia.setDate(lunes.getDate() + i);
      return dia;
    });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta cita?")) return;
    try {
      const response = await fetch(`https://github.dev{id}`, {
        method: 'DELETE'
      });
      if (response.ok) onSuccess();
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  const renderizarBloqueHoras = (emp, fecha) => {
    if (!emp) return null;
    return HORAS.map((h) => {
      const citasDeEstaHora = citasReales?.filter(cita =>
        String(cita.empleado_id) === String(emp.id) &&
        cita.hora_inicio.substring(0, 5) === h &&
        cita.fecha === fecha
      ) || [];

      return (
        <div key={`slot-${emp.id}-${fecha}-${h}`} className="h-24 border-b border-white/[0.02] hover:bg-white/[0.01] relative group">
          {citasDeEstaHora.length === 0 && (
            <div
              onClick={() => actions.openModalConDatos(h, emp.id)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-[#D4AF37]/5"
            >
              <span className="text-[7px] text-[#D4AF37] uppercase font-black">+ Reservar {h}</span>
            </div>
          )}
          {citasDeEstaHora.map((cita) => (
            <motion.div
              key={`cita-${cita.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-x-2 p-3 rounded-xl bg-[#161616] border-l-4 shadow-2xl z-10"
              style={{ borderColor: emp.color || '#D4AF37', top: '8px', height: '80px' }}
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
    });
  };

  if (empleados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 border-2 border-dashed border-white/5 rounded-[3rem] m-8 text-center p-8">
        <p className="font-serif text-2xl text-white mb-2">Tu agenda está lista</p>
        <p className="text-sm uppercase tracking-widest opacity-40">Añade especialistas en Equipo para empezar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      {/* CABECERA */}
      <div className="flex flex-col xl:flex-row items-center justify-between bg-[#111111] p-6 rounded-[2.5rem] border border-white/5 gap-6">
        <div className="relative group">
          <div
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-4 bg-black px-6 py-4 rounded-2xl border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all shadow-2xl cursor-pointer"
          >
            <CalendarIcon size={20} className="text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="text-[8px] uppercase text-gray-500 font-black tracking-[0.2em] mb-1">Fecha de Gestión</span>
              <span className="text-white font-serif text-lg capitalize">
                {format(fechaSeleccionada, "EEEE, d 'de' MMMM", { locale: es })}
              </span>
            </div>
          </div>

          <CustomCalendar
            fechaSeleccionada={formatearFechaSQL(fechaSeleccionada)}
            alCambiarFecha={(nuevaFecha) => setFechaSeleccionada(new Date(nuevaFecha + 'T00:00:00'))}
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
          />
        </div>

        <div className="flex bg-black p-1 rounded-xl border border-white/5">
          {['dia', 'semana', 'mes'].map((v) => (
            <button
              key={`btn-vista-${v}`}
              onClick={() => setVista(v)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${vista === v ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-500 hover:text-white'
                }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => cambiarDia(-1)} className="p-4 bg-black rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 text-gray-400 transition-all"><ChevronLeft size={20} /></button>
          <button onClick={() => setFechaSeleccionada(new Date())} className="px-8 py-4 bg-black rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-[#D4AF37]">Hoy</button>
          <button onClick={() => cambiarDia(1)} className="p-4 bg-black rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 text-gray-400 transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="flex flex-col flex-1 bg-[#0F0F0F] rounded-[2.5rem] border border-white/5 overflow-hidden">
        {/* TABS EMPLEADOS */}
        <div className="flex p-4 gap-2 overflow-x-auto no-scrollbar border-b border-white/5 bg-black/20">
          {empleados.map(emp => (
            <button
              key={`tab-${emp.id}`}
              onClick={() => setActiveTab(emp.id)}
              className={`px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${currentTabId === emp.id ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black text-gray-500 border-white/5 hover:border-white/20'
                }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{emp.nombre}</span>
            </button>
          ))}
        </div>

        {/* ÁREA DE CONTENIDO (HORAS + GRID) */}
        <div className="flex flex-1 overflow-hidden h-[600px]">
          {/* COLUMNA HORAS */}
          <div className="w-20 border-r border-white/5 bg-black/40 flex-shrink-0">
            <div className="overflow-y-auto h-full no-scrollbar">
              {HORAS.map(h => (
                <div key={`hora-label-${h}`} className="h-24 flex items-center justify-center border-b border-white/[0.02]">
                  <span className="text-[10px] font-black text-gray-600">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GRID DINÁMICO */}
          <div className="flex-1 overflow-x-auto bg-[#0A0A0A] no-scrollbar">
            <div
              className="flex divide-x divide-white/5"
              style={{
                display: 'grid',
                gridTemplateColumns: vista === 'dia' ? `repeat(${empleados.length}, 350px)` : `repeat(7, 280px)`,
                minWidth: 'max-content'
              }}
            >
              {/* VISTA DÍA */}
              {vista === 'dia' && empleados.map(emp => (
                <div key={`col-dia-${emp.id}`} className="relative min-h-full border-r border-white/5">
                  <div className="sticky top-0 z-20 bg-[#0F0F0F] p-3 border-b border-white/5 text-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: emp.color || '#D4AF37' }}>{emp.nombre}</span>
                  </div>
                  {renderizarBloqueHoras(emp, isoFecha)}
                </div>
              ))}

              {/* VISTA SEMANA */}
              {vista === 'semana' && obtenerDiasSemana(fechaSeleccionada).map(dia => {
                const fISO = formatearFechaSQL(dia);
                const empActivo = empleados.find(e => e.id === currentTabId) || empleados[0];
                return (
                  <div key={`col-sem-${fISO}`} className="relative min-h-full border-r border-white/5">
                    <div className="sticky top-0 z-20 bg-[#0F0F0F] p-3 border-b border-white/5 text-center">
                      <p className="text-[7px] text-gray-500 uppercase font-black">{format(dia, 'EEEE', { locale: es })}</p>
                      <p className="text-[10px] text-[#D4AF37] font-black">{format(dia, 'dd MMM')}</p>
                    </div>
                    {renderizarBloqueHoras(empActivo, fISO)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}