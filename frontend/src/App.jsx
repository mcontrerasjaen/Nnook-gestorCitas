import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SegmentSelector from './components/SegmentSelector';
import DashboardLayout from './components/DashboardLayout';
import Agenda from './components/Agenda';
import AppointmentModal from './components/AppointmentModal';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/Footer';
import BusinessRegister from './components/BusinessRegister';
import BusinessOnboardingForm from './components/BusinessOnboardingForm';
import StaffManagement from './components/StaffManagement';
import StepProgress from './components/StepProgress';
import {
  Scissors,
  Sparkles,
  Wind,
  Crown,
  ShieldCheck, Zap,
  Apple,
  User
} from 'lucide-react';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citasReales, setCitasReales] = useState([]);

  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    owner: '',
    email: '',
    sector: ''
  });

  const cargarCitas = async () => {
    console.log("🔄 Actualizando agenda de Nnook...");
    try {
      const res = await fetch('https://humble-spoon-q75qxq4xj94gc647r-3001.app.github.dev/api/appointments');
      const data = await res.json();
      setCitasReales(data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    if (selectedType) {
      cargarCitas();
    }
  }, [selectedType]);

  const handleSelection = async (subSectorId) => {
    console.log(`Configurando espacio para: ${subSectorId}`);

    try {
      const response = await fetch('https://humble-spoon-q75qxq4xj94gc647r-3001.app.github.dev/api/setup-salon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: subSectorId,
          businessName: businessInfo.name,
          email: businessInfo.email,
          owner: businessInfo.owner
        })
      });

      if (response.ok) {
        setSelectedType(subSectorId);
      } else {
        setSelectedType(subSectorId);
      }
    } catch (error) {
      console.error("Error al configurar salón:", error);
      setSelectedType(subSectorId);
    }
  };

  const UI_CONFIG = {
    // --- SECTOR BELLEZA ---
    barber: {
      icon: <Scissors size={20} />,
      label: 'Barbería de Autor',
      color: '#D4AF37'
    },
    hair: {
      icon: <Crown size={20} />,
      label: 'Hair Studio',
      color: '#E6B8A2'
    },
    beauty: {
      icon: <Sparkles size={20} />,
      label: 'Salón de Belleza',
      color: '#FFB6C1'
    },
    nails: {
      icon: <Sparkles size={20} />,
      label: 'Salón de Uñas',
      color: '#C0C0C0'
    },
    spa: {
      icon: <Wind size={20} />,
      label: 'Spa & Wellness',
      color: '#F5F5DC'
    },

    // --- SECTOR DEPORTE ---
    gym: {
      icon: <Zap size={20} />,
      label: 'Entrenamiento Personal',
      color: '#FF4500'
    },
    yoga: {
      icon: <Wind size={20} />,
      label: 'Estudio Yoga/Pilates',
      color: '#8FBC8F'
    },
    fisioterapia: {
      icon: <ShieldCheck size={20} />,
      label: 'Fisioterapia',
      color: '#4FD1C5'
    },
    nutricion: {
      icon: <Apple size={20} />,
      label: 'Nutrición',
      color: '#9ACD32'
    },

    // --- SECTOR SALUD ---
    dental: {
      icon: <ShieldCheck size={20} />,
      label: 'Clínica Dental',
      color: '#00BFFF'
    },
    psicologia: {
      icon: <User size={20} />,
      label: 'Psicología',
      color: '#6A5ACD'
    },
    estetica_medica: {
      icon: <Sparkles size={20} />,
      label: 'Medicina Estética',
      color: '#D4AF37'
    }
  };

  const [empleados, setEmpleados] = useState([]);

  const añadirEmpleado = (nuevoEmpleado) => {
    setEmpleados([...empleados, { ...nuevoEmpleado, id: Date.now(), citas: [] }]);
  };

  const [activeSection, setActiveSection] = useState('calendar'); // 'calendar' o 'staff'

  const handleAddStaff = (newStaff) => {
    const staffWithId = { ...newStaff, id: Date.now(), citas: [] };
    setEmpleados([...empleados, staffWithId]);
  };

  const handleDeleteStaff = (id) => {
    setEmpleados(empleados.filter(e => e.id !== id));
  };

  return (
  <Router>
    <div className="min-h-screen bg-aura-black text-white">
      {/* Progreso del registro */}
      {(showRegister || showOnboarding || (!selectedType && !showLanding)) && (
        <StepProgress currentStep={showRegister ? 1 : showOnboarding ? 2 : 3} />
      )}

      <Routes>
        {/* FLUJO DE BIENVENIDA Y REGISTRO */}
        <Route path="/" element={
          showLanding ? (
            <div className="flex flex-col">
              <Hero onStart={() => { setShowLanding(false); setShowRegister(true); }} />
              <Features />
              <Footer />
            </div>
          ) : showRegister ? (
            <BusinessRegister 
              onBack={() => { setShowRegister(false); setShowLanding(true); }} 
              onComplete={(data) => { setBusinessInfo(data); setShowRegister(false); setShowOnboarding(true); }} 
            />
          ) : showOnboarding ? (
            <BusinessOnboardingForm onComplete={() => setShowOnboarding(false)} />
          ) : !selectedType ? (
            <SegmentSelector onSelect={handleSelection} />
          ) : (
            <Navigate to="/dashboard/calendar" />
          )
        } />

        {/* DASHBOARD CON RUTAS HIJAS */}
        <Route path="/dashboard/*" element={
          selectedType ? (
            <DashboardLayout
              salonType={selectedType}
              businessName={businessInfo.salonName}
              theme={UI_CONFIG[selectedType] || UI_CONFIG.barber}
              onOpenModal={() => setIsModalOpen(true)}
            >
              <Routes>
                <Route path="calendar" element={
                  <Agenda 
                    empleados={empleados} 
                    citasReales={citasReales} 
                    theme={UI_CONFIG[selectedType] || UI_CONFIG.barber} 
                    onSuccess={cargarCitas} 
                  />
                } />
                <Route path="staff" element={
                  <StaffManagement 
                    empleados={empleados} 
                    onAdd={handleAddStaff} 
                    onDelete={handleDeleteStaff} 
                    theme={UI_CONFIG[selectedType] || UI_CONFIG.barber} 
                  />
                } />
                <Route path="*" element={<Navigate to="calendar" />} />
              </Routes>
            </DashboardLayout>
          ) : <Navigate to="/" />
        } />
      </Routes>

      {/* Modal global de citas */}
      {isModalOpen && (
        <AppointmentModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={cargarCitas}
          salonType={selectedType}
          empleados={empleados} 
        />
      )}
    </div>
  </Router>
);
}

export default App;