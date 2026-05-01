import React from 'react';
import { motion } from 'framer-motion';
import {
    Building2, Mail, Lock, User, Scissors, Sparkles,
    Crown, Wind, X, Camera, MessageCircle, Globe
} from 'lucide-react';

export default function BusinessRegister({ onBack, onComplete }) {
    const sectors = [
        { id: 'barber', label: 'Barbería', icon: <Scissors size={16} /> },
        { id: 'hair', label: 'Hair Studio', icon: <Crown size={16} /> },
        { id: 'beauty', label: 'Salon Belleza', icon: <Sparkles size={16} /> },
        { id: 'spa', label: 'Spa & Wellness', icon: <Wind size={16} /> }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onComplete({
            name: formData.get('salonName'),
            owner: formData.get('ownerName'),
            email: formData.get('email')
        });
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#050505] p-6 py-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <button onClick={onBack} className="absolute top-8 right-8 text-gray-500 hover:text-[#D4AF37] transition-colors z-20">
                    <X size={24} />
                </button>

                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-serif text-white mb-2">Crear Cuenta</h2>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold">Uniendo tu visión con nuestra tecnología</p>
                </div>

                {/* --- NUEVA SECCIÓN: SOCIAL LOGIN --- */}
                <div className="mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <button type="button" className="flex items-center justify-center gap-3 bg-black border border-white/5 py-4 rounded-2xl hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                            <Globe size={16} className="text-gray-600 group-hover:text-[#D4AF37] transition-all" />
                            <span className="text-[9px] uppercase tracking-widest font-black text-gray-500 group-hover:text-white">Google</span>
                        </button>

                        <button type="button" className="flex items-center justify-center gap-3 bg-black border border-white/5 py-4 rounded-2xl hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                            <Camera size={16} className="text-gray-600 group-hover:text-[#D4AF37] transition-all" />
                            <span className="text-[9px] uppercase tracking-widest font-black text-gray-500 group-hover:text-white">Instagram</span>
                        </button>

                        <button type="button" className="flex items-center justify-center gap-3 bg-black border border-white/5 py-4 rounded-2xl hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                            <MessageCircle size={16} className="text-gray-600 group-hover:text-[#D4AF37] transition-all" />
                            <span className="text-[9px] uppercase tracking-widest font-black text-gray-500 group-hover:text-white">Facebook</span>
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-full h-[1px] bg-white/5"></div>
                        <span className="relative bg-[#0A0A0A] px-6 text-[8px] uppercase tracking-[0.4em] text-gray-600 font-black">
                            O registro manual
                        </span>
                    </div>
                </div>
                {/* --- FIN SOCIAL LOGIN --- */}

                <form className="space-y-8" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onComplete({
                        name: formData.get('salonName'),
                        owner: formData.get('ownerName'),
                        email: formData.get('email')
                    });
                }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* ADMINISTRADOR */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black ml-1">Administrador</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input name="ownerName" required type="text" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Nombre completo" />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input name="email" required type="email" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Email corporativo" />
                            </div>
                        </div>

                        {/* ESTABLECIMIENTO */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black ml-1">Establecimiento</label>                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />

                                <input name="salonName" required type="text" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Nombre del salón" />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input name="password" required type="password" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Contraseña de acceso" />
                            </div>
                        </div>
                    </div>

                    {/* SECTOR */}
                    <div className="space-y-4">
                        <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black ml-1 text-center block">Selecciona tu Sector</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {sectors.map(sector => (
                                <label key={sector.id} className="cursor-pointer group">                                   
                                    <input
                                        type="radio"
                                        name="sector"
                                        value={sector.id}
                                        className="hidden peer"
                                        required
                                    />
                                    <div className="flex flex-col items-center justify-center p-4 bg-black border border-white/5 rounded-2xl peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37]/5 group-hover:bg-white/5 transition-all text-center">
                                        <span className="text-[#D4AF37] mb-2">{sector.icon}</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{sector.label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#D4AF37] text-[#050505] font-black py-5 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] uppercase tracking-widest text-xs">
                        Finalizar y Crear Espacio
                    </button>
                </form>
            </motion.div>
        </section>
    );
}