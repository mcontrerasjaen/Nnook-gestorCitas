import React, { useState, useEffect } from 'react';
import { Plus, Clock, Tag, Sparkles, Trash2, LayoutGrid } from 'lucide-react';

const SUGGESTIONS = {
    barber: [
        { nombre: 'Corte de Autor', duracion: 30, precio: 20, color: '#D4AF37' },
        { nombre: 'Barba Ritual', duracion: 20, precio: 15, color: '#A68B5B' },
        { nombre: 'Corte + Barba', duracion: 50, precio: 30, color: '#D4AF37' }
    ],
    nutricion: [
        { nombre: 'Evaluación Inicial', duracion: 60, precio: 50, color: '#4FD1C5' },
        { nombre: 'Plan Fuerza/Hipertrofia', duracion: 45, precio: 40, color: '#F6AD55' },
        { nombre: 'Seguimiento Quincenal', duracion: 30, precio: 25, color: '#4FD1C5' }
    ],
    yoga: [
        { nombre: 'Clase Privada', duracion: 60, precio: 45, color: '#8FBC8F' },
        { nombre: 'Sesión Meditación', duracion: 30, precio: 20, color: '#CBD5E0' }
    ],
    dental: [
        { nombre: 'Limpieza Bucal', duracion: 45, precio: 60, color: '#00BFFF' },
        { nombre: 'Revisión General', duracion: 30, precio: 0, color: '#4FD1C5' }
    ]
};

const API_URL = "https://humble-spoon-q75qxq4xj94gc647r-5000.app.github.dev";

export default function ServiceManagement({ salonType, currentBusinessId }) {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);

    const sugerencias = SUGGESTIONS[salonType] || SUGGESTIONS.barber;

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                // Usamos el ID de la empresa para traer solo sus servicios
                const res = await fetch(`${API_URL}/api/services?empresa_id=${currentBusinessId}`);
                const data = await res.json();
                setServicios(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al cargar servicios:", error);
            } finally {
                setLoading(false);
            }
        };
        if (currentBusinessId) fetchServicios();
    }, [currentBusinessId]);

    // 2. Guardar servicio (POST)
    const handleAddService = async (nuevoServicio) => {
        try {
            const res = await fetch(`${API_URL}/api/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...nuevoServicio,
                    empresa_id: currentBusinessId
                })
            });
            if (res.ok) {
                const data = await res.json();
                setServicios([data, ...servicios]);
            }
        } catch (error) {
            console.error("Error al añadir servicio:", error);
        }
    };

    const handleDelete = async (id) => {
        // Aquí podrías añadir un fetch DELETE a tu backend después
        setServicios(servicios.filter(s => s.id !== id));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-2">
            {/* LISTADO DE SERVICIOS */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-3xl font-serif text-white mb-2">Carta de Servicios</h2>
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Gestión de tarifas y tiempos</p>
                </div>

                <div className="grid gap-4">
                    {servicios.length === 0 && !loading ? (
                        <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-20 text-center">
                            <LayoutGrid className="mx-auto text-gray-800 mb-4" size={48} />
                            <p className="text-gray-600 font-medium">Tu catálogo está vacío</p>
                            <p className="text-gray-700 text-xs mt-1">Usa las sugerencias de la derecha para empezar</p>
                        </div>
                    ) : (
                        servicios.map((s) => (
                            <div key={s.id} className="bg-[#141414] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-1.5 h-12 rounded-full" style={{ backgroundColor: s.color || '#D4AF37' }} />
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-none mb-2">{s.nombre}</h3>
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase font-black tracking-widest"><Clock size={12} /> {s.duracion} MIN</span>
                                            <span className="flex items-center gap-1.5 text-[#D4AF37] text-[10px] uppercase font-black tracking-widest"><Tag size={12} /> {s.precio}€</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(s.id)} className="p-3 text-gray-700 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* PANEL DE SUGERENCIAS */}
            <div className="space-y-6">
                <div className="bg-[#111111] border border-[#D4AF37]/20 p-8 rounded-[2.5rem] sticky top-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="text-[#D4AF37]" size={20} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Sugerencias {salonType}</h3>
                    </div>

                    <div className="space-y-3">
                        {sugerencias.map((sug, i) => (
                            <button
                                key={i}
                                onClick={() => handleAddService(sug)}
                                className="w-full group bg-black/40 border border-white/5 p-4 rounded-xl text-left hover:border-[#D4AF37]/50 transition-all flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-[11px] text-white font-bold uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{sug.nombre}</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5">{sug.duracion} min • {sug.precio}€</div>
                                </div>
                                <Plus size={16} className="text-gray-700 group-hover:text-[#D4AF37] transition-all" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        <p className="text-[10px] text-gray-600 text-center italic leading-relaxed">
                            Estas opciones son estándar en tu sector para agilizar tu configuración.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}