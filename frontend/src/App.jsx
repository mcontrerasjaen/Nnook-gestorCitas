import React, { useState, useEffect } from 'react';
import SegmentSelector from './components/SegmentSelector';
import DashboardLayout from './components/DashboardLayout';
import Agenda from './components/Agenda';
import AppointmentModal from './components/AppointmentModal';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/Footer';
import BusinessRegister from './components/BusinessRegister';
import BusinessOnboardingForm from './components/BusinessOnboardingForm';
import StepProgress from './components/StepProgress';

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

  const handleSelection = async (type) => {
    try {
      const response = await fetch('https://humble-spoon-q75qxq4xj94gc647r-3001.app.github.dev/api/setup-salon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      setSelectedType(type);
    } catch (error) {
      console.error("Error al configurar salón:", error);
      setSelectedType(type);
    }
  };

  return (
    <div className="min-h-screen bg-aura-black text-white">
      {(showRegister || showOnboarding || (!selectedType && !showLanding)) && (
        <StepProgress currentStep={showRegister ? 1 : showOnboarding ? 2 : 3} />
      )}

      {showLanding ? (
        <div className="flex flex-col">
          <Hero onStart={() => {
            setShowLanding(false);
            setShowRegister(true);
          }} />
          <Features />
          <Footer />
        </div>
      ) : showRegister ? (
        <BusinessRegister
          onBack={() => {
            setShowRegister(false);
            setShowLanding(true);
          }}
          onComplete={(data) => {
            setBusinessInfo(data);
            setShowRegister(false);
            setShowOnboarding(true);
          }}
        />
      ) : showOnboarding ? (
        <BusinessOnboardingForm
          onComplete={() => {
            setShowOnboarding(false);
          }}
        />
      ) : !selectedType ? (
        <SegmentSelector onSelect={handleSelection} />
      ) : (
        <DashboardLayout
          salonType={selectedType}
          onOpenModal={() => setIsModalOpen(true)}
        >
          <Agenda
            citasReales={citasReales}
            salonType={selectedType}
            onSuccess={cargarCitas}
          />
          {isModalOpen && (
            <AppointmentModal
              onClose={() => setIsModalOpen(false)}
              onSuccess={cargarCitas}
              salonType={selectedType}
            />
          )}
        </DashboardLayout>
      )}
    </div>
  );
}

export default App;