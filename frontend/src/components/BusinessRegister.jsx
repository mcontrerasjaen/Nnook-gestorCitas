import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, Mail, Lock, User, Scissors, Sparkles,
    Crown, Wind, X, Camera, MessageCircle, Globe, ChevronDown, Eye, EyeOff
} from 'lucide-react';

export default function BusinessRegister({ onBack, onComplete }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });
    const [selectedCategory, setSelectedCategory] = useState('');

    const sectors = {
        belleza: {
            label: 'Belleza & Bienestar',
            icon: <Sparkles size={16} />,
            subsectores: [
                { id: 'barber', label: 'Barbería de Autor' },
                { id: 'hair', label: 'Hair Studio' },
                { id: 'beauty', label: 'Salón de Belleza' },
                { id: 'nails', label: 'Salón de Uñas' },
                { id: 'spa', label: 'Spa & Wellness' }
            ]
        },
        deporte: {
            label: 'Deporte & Nutricion',
            icon: <Wind size={16} />,
            subsectores: [
                { id: 'gym', label: 'Entrenamiento Personal' },
                { id: 'yoga', label: 'Estudio de Yoga/Pilates' },
                { id: 'fisioterapia', label: 'Fisioterapia' },
                { id: 'nutricion', label: 'Nutrición' }
            ]
        },
        salud: {
            label: 'Salud & Cuidado',
            icon: <Scissors size={16} />,
            subsectores: [
                { id: 'dental', label: 'Clínica Dental' },
                { id: 'psicologia', label: 'Psicología' },
                { id: 'estetica_medica', label: 'Medicina Estética' }
            ]
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onComplete({
            name: formData.get('salonName'),
            owner: formData.get('ownerName'),
            email: formData.get('email'),
            category: selectedCategory,
            sector: formData.get('sector')
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
                    <div className="max-w-xl mx-auto space-y-10">

                        {/* SECCIÓN 1: ADMINISTRADOR */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-black ml-1 block border-b border-[#D4AF37]/10 pb-2">
                                Identidad del Administrador
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input name="ownerName" required type="text" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Nombre y apellido" />
                            </div>
                        </div>

                        {/* SECCIÓN 2: DATOS DEL NEGOCIO Y EMAIL */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-black ml-1 block border-b border-[#D4AF37]/10 pb-2">
                                Datos del Negocio
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input name="salonName" required type="text" className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Nombre de la empresa" />
                            </div>

                            {/* Email en dos columnas para ahorrar espacio vertical */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input name="email" required type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Email corporativo" />
                                </div>
                                <div className="relative">
                                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${formData.confirmEmail && formData.email !== formData.confirmEmail ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                                    <input name="confirmEmail" required type="email" onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })} className={`w-full bg-black border rounded-2xl py-4 pl-12 pr-4 outline-none text-sm text-white transition-all ${formData.confirmEmail && formData.email !== formData.confirmEmail ? 'border-red-500/50' : 'border-white/5 focus:border-[#D4AF37]/40'}`} placeholder="Confirmar Email" />
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 3: SEGURIDAD */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-black ml-1 block border-b border-[#D4AF37]/10 pb-2">
                                Seguridad de la Cuenta
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input name="password" required type={showPassword ? "text" : "password"} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-[#D4AF37]/40 text-sm text-white transition-all" placeholder="Contraseña" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37] transition-colors">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                                    <input name="confirmPassword" required type={showPassword ? "text" : "password"} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className={`w-full bg-black border rounded-2xl py-4 pl-12 pr-4 outline-none text-sm text-white transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500/50' : 'border-white/5 focus:border-[#D4AF37]/40'}`} placeholder="Repetir Contraseña" />
                                </div>
                            </div>
                        </div>

                        {/* MOSTRAR ERRORES SOLO SI NO COINCIDEN */}
                        {(formData.confirmEmail && formData.email !== formData.confirmEmail) && (
                            <p className="text-[9px] text-red-500 uppercase tracking-widest text-center font-black animate-pulse">Los emails no coinciden</p>
                        )}
                        {(formData.confirmPassword && formData.password !== formData.confirmPassword) && (
                            <p className="text-[9px] text-red-500 uppercase tracking-widest text-center font-black animate-pulse">Las contraseñas no coinciden</p>
                        )}
                    </div>                
                
                {/* SECTOR */}
                <div className="space-y-4">
                    <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-black ml-1 text-center block">
                        Sector y Especialización
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Selector de Categoría Principal */}
                        <div className="relative">
                            <select
                                name="mainCategory"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                required
                                className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-[#D4AF37]/40 text-sm text-white appearance-none cursor-pointer transition-all"
                            >
                                <option value="">Categoría principal...</option>
                                {Object.keys(sectors).map(key => (
                                    <option key={key} value={key}>{sectors[key].label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        </div>

                        {/* Dropdown de Subsector Dinámico */}
                        <div className="relative">
                            <select
                                name="sector"
                                disabled={!selectedCategory}
                                required
                                className={`w-full bg-black border rounded-2xl py-4 px-6 outline-none text-sm appearance-none cursor-pointer transition-all ${selectedCategory ? 'border-[#D4AF37]/40 text-[#D4AF37]' : 'border-white/5 text-gray-600'
                                    }`}
                            >
                                <option value="">Especialidad...</option>
                                {selectedCategory && sectors[selectedCategory].subsectores.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.label}</option>
                                ))}
                            </select>
                            <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${selectedCategory ? 'text-[#D4AF37]' : 'text-gray-600'
                                }`} size={16} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full bg-[#D4AF37] text-[#050505] font-black py-5 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] uppercase tracking-widest text-xs">
                    Finalizar y Crear Espacio
                </button>
            </form>
        </motion.div>
        </section >
    );
}