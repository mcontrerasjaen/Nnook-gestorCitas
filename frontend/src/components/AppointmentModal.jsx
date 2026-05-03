import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Scissors, UserRound, ChevronDown } from 'lucide-react';

export default function AppointmentModal({ onClose, onSuccess, salonType, empleados, currentBusinessId }) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const appointmentData = {
      cliente_nombre: formData.get('cliente'),
      hora_inicio: formData.get('hora'),
      duracion: parseInt(formData.get('duracion') || 30),
      servicio_nombre: formData.get('servicio'),
      empleado_id: parseInt(formData.get('empleadoId')), // Convertimos a número para Postgres
      empresa_id: parseInt(currentBusinessId),           // Convertimos a número para Postgres
      fecha: new Date().toISOString().split('T')[0]
    };

    console.log("Enviando cita...", appointmentData);

    try {
      // CAMBIO CLAVE: Puerto 5000 (Backend) en lugar de 3001
      const response = await fetch('https://humble-spoon-q75qxq4xj94gc647r-5000.app.github.dev/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        if (onSuccess) await onSuccess();
        onClose();
        // Quitamos el alert para que la experiencia sea más fluida y profesional
        console.log("¡Cita reservada con éxito!");
      } else {
        const errorServer = await response.json();
        console.error("Error del servidor:", errorServer);
      }

    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-aura-dark border border-aura-gold/30 w-full max-w-md rounded-[2rem] p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-aura-gold transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-serif text-aura-gold mb-1">Nueva Cita</h2>
        <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest">Reserva de exclusividad</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Nombre del Cliente</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input name="cliente" required type="text" className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm text-white" placeholder="Ej. Julián García" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Hora</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input name="hora" required type="time" className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Duración</label>
              <select name="duracion" className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl py-4 px-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm appearance-none text-white cursor-pointer">
                <option value="30">30 min</option>
                <option value="60">1 hora</option>
                <option value="90">1.5 horas</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Servicio</label>
            <div className="relative">
              <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input name="servicio" required type="text" className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm text-white" placeholder="Ej. Corte Skin Fade" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Elegir Profesional</label>
            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <select
                name="empleadoId"
                required
                defaultValue=""
                className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/50 transition-all text-sm appearance-none cursor-pointer text-white"
              >
                <option value="" disabled>Selecciona un especialista...</option>

                {/* MAPEO DINÁMICO: Solo aparecerán los que el dueño haya creado */}
                {empleados.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombre} ({emp.especialidad})
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]/50">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#D4AF37] text-[#0F0F0F] font-bold py-5 rounded-2xl mt-4 hover:bg-[#D4AF37]/80 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
            Confirmar Reserva
          </button>
        </form>
      </motion.div>
    </div>
  );
}