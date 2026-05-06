import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import AppointmentModal from './components/AppointmentModal';
import StepProgress from './components/StepProgress';
import { Scissors, Sparkles, Wind, Crown, ShieldCheck, Zap, Apple, User } from 'lucide-react';

const API_URL = "https://humble-spoon-q75qxq4xj94gc647r-5000.app.github.dev";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citasReales, setCitasReales] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [businessInfo, setBusinessInfo] = useState({ name: '', owner: '', email: '', sector: '' });
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const [fechaAgenda, setFechaAgenda] = useState(new Date().toISOString().split('T')[0]);

  const cargarCitas = async () => {

    if (!currentBusinessId) return;

    try {
      const res = await fetch(`${API_URL}/api/appointments?empresa_id=${currentBusinessId}`);
      const data = await res.json();

      setCitasReales([...data]);

      console.log("📅 Citas sincronizadas para la empresa:", currentBusinessId);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === "success") {
        setBusinessInfo({
          name: data.business.nombre_salon,
          email: data.business.email
        });
        setCurrentBusinessId(data.business.id);
        setSelectedType(data.business.sector);
        setShowLanding(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowOnboarding(false);

        console.log("✅ Sesión iniciada para:", data.business.nombre_salon);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error login:", error);
    }
  };

  const handleSelection = async (selection) => {
    const subSectorId = selection.specialty.id;
    const categoryId = selection.category.id;

    try {
      const response = await fetch(`${API_URL}/api/home`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessInfo.name,
          email: businessInfo.email,
          type: subSectorId,
          mainCategory: categoryId
        })
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentBusinessId(result.id);
        setBusinessInfo(prev => ({
          ...prev,
          sector: subSectorId,
          category: categoryId
        }));

        setSelectedType(subSectorId);
      }
    } catch (error) {
      console.error("Error al configurar el home:", error);
      setSelectedType(subSectorId);
    }
  };

  const handleAddStaff = async (newStaff) => {
    try {
      const response = await fetch(`${API_URL}/api/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newStaff,
          empresa_id: currentBusinessId
        })
      });

      if (response.ok) {
        const savedStaff = await response.json()
        setEmpleados(prev => [...prev, savedStaff]);
        console.log("✅ Empleado guardado en la base de datos:", savedStaff.nombre);
      }
    } catch (error) {
      console.error("❌ Error al guardar empleado:", error);
    }
  };
  
  useEffect(() => {
    const cargarTodo = async () => {
      if (!currentBusinessId) return;

      try {
        console.log("🔄 Sincronizando Nnook...");
        const [resStaff, resCitas] = await Promise.all([
          fetch(`${API_URL}/api/staff?empresa_id=${currentBusinessId}`),
          fetch(`${API_URL}/api/appointments?empresa_id=${currentBusinessId}`)
        ]);

        const staff = await resStaff.json();
        const citas = await resCitas.json();

        setEmpleados(Array.isArray(staff) ? staff : []);
        setCitasReales(Array.isArray(citas) ? citas : []);
      } catch (e) {
        console.error("Error sincronizando:", e);
      }
    };

    cargarTodo();

  }, [currentBusinessId])

  const actions = {
    actualizarFechaAgenda: (nuevaFecha) => setFechaAgenda(nuevaFecha),
    startRegister: () => {
      setSelectedType(null);
      setShowLanding(false);
      setShowLogin(false);
      setShowRegister(true);
    },
    startLogin: () => {
      setSelectedType(null);
      setShowLanding(false);
      setShowRegister(false);
      setShowOnboarding(false);
      setShowLogin(true);
      console.log("Navegando al Login...");
    },
    backToLanding: () => {
      setSelectedType(null);
      setShowRegister(false);
      setShowLogin(false);
      setShowLanding(true);
    },
    completeRegister: (data) => {
      setBusinessInfo(data);
      setShowRegister(false);
      setShowOnboarding(true);
    },
    completeOnboarding: () => setShowOnboarding(false),
    handleSelection,
    handleLogin,
    openModal: () => setIsModalOpen(true),
    cargarCitas,
    handleAddStaff,
    handleDeleteStaff: (id) => setEmpleados(empleados.filter(e => e.id !== id)),
    logout: () => {
      setCurrentBusinessId(null);
      setBusinessInfo({ name: '', owner: '', email: '', sector: '' });
      setSelectedType(null);
      setShowLanding(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowOnboarding(false);
      setEmpleados([]);
      setCitasReales([]);
      console.log("👋 Sesión cerrada y estados reseteados");
    },
    deleteBusiness: async (id) => {
      const confirmacion = window.confirm(
        "⚠️ ¿ESTÁS SEGURO? Esta acción es irreversible. Se eliminarán permanentemente tus empleados, servicios y todas tus citas agendadas."
      );

      if (confirmacion) {
        try {
          const response = await fetch(`${API_URL}/api/business/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            console.log("🗑️ Empresa eliminada de la base de datos");
            actions.logout();
            alert("Tu cuenta y todos sus datos han sido eliminados correctamente.");
          } else {
            alert("No se pudo eliminar la cuenta. Por favor, contacta con soporte.");
          }
        } catch (error) {
          console.error("❌ Error al eliminar la empresa:", error);
        }
      }
    }
  };

  const UI_CONFIG = {
    barber: { icon: <Scissors size={20} />, label: 'Barbería de Autor', color: '#D4AF37' },
    hair: { icon: <Crown size={20} />, label: 'Hair Studio', color: '#E6B8A2' },
    beauty: { icon: <Sparkles size={20} />, label: 'Salón de Belleza', color: '#FFB6C1' },
    nails: { icon: <Sparkles size={20} />, label: 'Salón de Uñas', color: '#C0C0C0' },
    spa: { icon: <Wind size={20} />, label: 'Spa & Wellness', color: '#F5F5DC' },
    gym: { icon: <Zap size={20} />, label: 'Entrenamiento Personal', color: '#FF4500' },
    yoga: { icon: <Wind size={20} />, label: 'Estudio Yoga/Pilates', color: '#8FBC8F' },
    fisioterapia: { icon: <ShieldCheck size={20} />, label: 'Fisioterapia', color: '#4FD1C5' },
    nutricion: { icon: <Apple size={20} />, label: 'Nutrición', color: '#9ACD32' },
    dental: { icon: <ShieldCheck size={20} />, label: 'Clínica Dental', color: '#00BFFF' },
    psicologia: { icon: <User size={20} />, label: 'Psicología', color: '#6A5ACD' },
    estetica_medica: { icon: <Sparkles size={20} />, label: 'Medicina Estética', color: '#D4AF37' }
  };

  return (
    <Router>
      <div className="min-h-screen bg-aura-black text-white">
        {(showRegister || showOnboarding || (!selectedType && !showLanding && !showLogin)) && (
          <StepProgress currentStep={showRegister ? 1 : showOnboarding ? 2 : 3} />
        )}
        <AppRoutes
          showLanding={showLanding}
          showLogin={showLogin}
          showRegister={showRegister}
          showOnboarding={showOnboarding}
          selectedType={selectedType}
          businessInfo={businessInfo}
          empleados={empleados}
          citasReales={citasReales}
          actions={actions}
          UI_CONFIG={UI_CONFIG}
          currentBusinessId={currentBusinessId}
        />

        {isModalOpen && (
          <AppointmentModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={cargarCitas}
            empleados={empleados}
            currentBusinessId={currentBusinessId}
            fechaSeleccionada={fechaAgenda}
          />
        )}
      </div>
    </Router >
  );
}

export default App;