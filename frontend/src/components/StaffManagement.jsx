import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, X, Trash2, Check } from 'lucide-react';

export default function StaffManagement({ empleados, onAdd, onDelete, theme }) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onAdd({
      nombre: formData.get('nombre'),
      especialidad: formData.get('especialidad'),
      color: formData.get('color')
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-white">Equipo Profesional</h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Gestiona los especialistas de tu centro</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: theme.color }}
          className="flex items-center gap-2 text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-tighter hover:scale-105 transition-all shadow-lg"
        >
          <UserPlus size={16} /> Añadir Especialista
        </button>
      </div>

      {/* LISTA DE EMPLEADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empleados.map((emp) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-white/5 p-6 rounded-[2rem] relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: emp.color }} />
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl font-serif text-white border border-white/10">
                {emp.nombre.charAt(0)}
              </div>
              <button 
                onClick={() => onDelete(emp.id)}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <h3 className="text-white font-bold">{emp.nombre}</h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{emp.especialidad}</p>
          </motion.div>
        ))}
      </div>

      {/* MODAL PARA AÑADIR */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <motion.form
              onSubmit={handleSubmit}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative bg-[#0F0F0F] border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-serif text-white mb-8">Nuevo Profesional</h3>
              <div className="space-y-6">
                <input name="nombre" required placeholder="Nombre completo" className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-[#D4AF37]/50 text-white" />
                <input name="especialidad" required placeholder="Especialidad (ej: Colorista)" className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-[#D4AF37]/50 text-white" />
                <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Color en Agenda</label>
                  <div className="flex gap-3">
                    {['#D4AF37', '#E6B8A2', '#4FD1C5', '#F5B6CD', '#A0AEC0'].map(color => (
                      <label key={color} className="cursor-pointer relative">
                        <input type="radio" name="color" value={color} required className="hidden peer" />
                        <div className="w-8 h-8 rounded-full border-2 border-transparent peer-checked:border-white transition-all" style={{ backgroundColor: color }} />
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" style={{ backgroundColor: theme.color }} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-black mt-4">
                  Guardar Profesional
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}