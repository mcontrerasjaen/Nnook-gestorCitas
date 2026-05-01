import React from 'react';
import { motion } from 'framer-motion';

export default function StepProgress({ currentStep }) {
  const steps = [
    { id: 1, label: "Cuenta" },
    { id: 2, label: "Fiscal" },
    { id: 3, label: "Estilo" }
  ];

 return (
  <div className="fixed top-0 left-0 w-full py-4 z-50 bg-[#050505]/60 backdrop-blur-sm">
    <div className="max-w-md mx-auto px-6">
      <div className="flex justify-between items-center relative h-10"> {/* Altura fija controlada */}
        
        {/* Línea de fondo */}
        <div className="absolute h-[1px] w-full bg-white/5 top-1/2 -translate-y-1/2 z-0" />
        
        {/* Línea de progreso activa */}
        <motion.div 
          className="absolute h-[1px] bg-[#D4AF37] top-1/2 -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ 
                backgroundColor: currentStep >= step.id ? "#D4AF37" : "#1A1A1A",
                scale: currentStep === step.id ? 1.1 : 1
              }}
              className="w-2 h-2 rounded-full border border-[#D4AF37]/20"
            />
            <span className={`text-[7px] uppercase tracking-[0.2em] mt-2 font-bold transition-colors duration-500 ${
              currentStep >= step.id ? "text-[#D4AF37]" : "text-gray-600"
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}