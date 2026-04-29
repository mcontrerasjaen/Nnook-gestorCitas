import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      title: "Gestión Intuitiva",
      desc: "Organiza tu agenda con una fluidez táctil. Diseñada para minimizar los clics y maximizar tu tiempo.",
      icon: <Calendar className="text-[#D4AF37]" size={32} />
    },
    {
      title: "Experiencia Premium",
      desc: "Tus clientes recibirán confirmaciones y recordatorios con la elegancia que tu marca representa.",
      icon: <Star className="text-[#D4AF37]" size={32} />
    },
    {
      title: "Control de Equipo",
      desc: "Asigna servicios, gestiona horarios y analiza el rendimiento de tus profesionales en tiempo real.",
      icon: <Users className="text-[#D4AF37]" size={32} />
    }
  ];

  return (
    <section id="info" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Sutil resplandor de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-8 p-4 w-fit rounded-2xl bg-[#D4AF37]/5 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}