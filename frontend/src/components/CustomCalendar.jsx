import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CustomCalendar({ fechaSeleccionada, alCambiarFecha, isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div key="calendar-wrapper"> {/* Añadimos una key al contenedor principal */}
                    {/* Capa de fondo con key única */}
                    <div
                        key="calendar-overlay"
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        key="calendar-modal" // Clave única para el cuadro de diálogo
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute left-0 mt-2 z-50 bg-[#111] border border-[#D4AF37]/30 p-6 rounded-[2rem] shadow-2xl min-w-[280px]"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest">Elegir Fecha</span>
                            <button onClick={onClose} className="text-gray-500 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>

                        <input
                            type="date"
                            value={fechaSeleccionada}
                            onChange={(e) => {
                                alCambiarFecha(e.target.value);
                                onClose();
                            }}
                            className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#D4AF37] [color-scheme:dark]"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}