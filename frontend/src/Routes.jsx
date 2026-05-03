import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes (asegúrate de que todos estén importados)
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/Footer';
import BusinessRegister from './components/BusinessRegister';
import BusinessOnboardingForm from './components/BusinessOnboardingForm';
import SegmentSelector from './components/SegmentSelector';
import DashboardLayout from './components/DashboardLayout';
import Agenda from './components/Agenda';
import StaffManagement from './components/StaffManagement';
import ServiceManagement from './components/ServiceManagement';
import Login from './components/Login';
import Settings from './components/Settings';

export default function AppRoutes({
  showLanding,
  showLogin,
  showRegister,
  showOnboarding,
  selectedType,
  businessInfo,
  empleados,
  citasReales,
  actions,
  UI_CONFIG,
  currentBusinessId
}) {
  return (
    <Routes>
      <Route path="/" element={
        selectedType ? (
          <Navigate to="/dashboard/agenda" replace />
        ) : showLogin ? (
          <Login onLogin={actions.handleLogin} onBack={actions.backToLanding} />
        ) : showLanding ? (
          <div className="flex flex-col">
            <Hero onStart={actions.startRegister} onLoginClick={actions.startLogin} />
            <Features />
            <Footer />
          </div>
        ) : showRegister ? (
          <BusinessRegister onBack={actions.backToLanding} onComplete={actions.completeRegister} />
        ) : showOnboarding ? (
          <BusinessOnboardingForm onComplete={actions.completeOnboarding} />
        ) : (
          <SegmentSelector onSelect={actions.handleSelection} />
        )
      } />

      <Route path="/dashboard/*" element={
        selectedType ? (
          <DashboardLayout
            salonType={selectedType}
            businessName={businessInfo.name || businessInfo.salonName}
            theme={UI_CONFIG[selectedType] || UI_CONFIG.barber}
            onOpenModal={actions.openModal}
            onLogout={actions.logout}
          >
            <Routes>
              <Route index element={
                <Agenda
                  empleados={empleados}
                  citasReales={citasReales}
                  theme={UI_CONFIG[selectedType] || UI_CONFIG.barber}
                  onSuccess={actions.cargarCitas}
                />
              } />

              <Route path="agenda" element={
                <Agenda
                  empleados={empleados}
                  citasReales={citasReales}
                  theme={UI_CONFIG[selectedType] || UI_CONFIG.barber}
                  onSuccess={actions.cargarCitas}
                />
              } />

              <Route path="staff" element={
                <StaffManagement
                  empleados={empleados}
                  onAdd={actions.handleAddStaff}
                  onDelete={actions.handleDeleteStaff}
                  theme={UI_CONFIG[selectedType] || UI_CONFIG.barber}
                />
              } />

              <Route path="services" element={
                <ServiceManagement
                  salonType={selectedType}
                  currentBusinessId={currentBusinessId}
                />
              } />
              <Route path="settings" element={
                <Settings
                  businessInfo={businessInfo}
                  onDeleteBusiness={actions.deleteBusiness}
                  currentBusinessId={currentBusinessId}
                />
              } />

            </Routes>
          </DashboardLayout>
        ) : <Navigate to="/" replace />
      } />
    </Routes>
  );
}