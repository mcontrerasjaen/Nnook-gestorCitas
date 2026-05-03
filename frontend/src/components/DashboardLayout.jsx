import Sidebar from './Sidebar';

export default function DashboardLayout({ 
  children, 
  salonType, 
  businessName, 
  theme,        
  activeSection, 
  setActiveSection, 
  onOpenModal, 
  onLogout 
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-white">
          
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        theme={theme} 
        onLogout={onLogout}
      />
      
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">   
                
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex flex-col">          
            <span 
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"
              style={{ color: theme.color }} 
            >
              {theme.label} System
            </span>
            <h2 className="text-lg md:text-xl font-serif font-semibold capitalize truncate max-w-[200px] md:max-w-none tracking-tight">
              {businessName || salonType} 
            </h2>
          </div>          
                   
          <button 
            onClick={onOpenModal}
            style={{ 
              backgroundColor: theme.color,
              boxShadow: `0 0 20px ${theme.color}44` 
            }}
            className="text-[#0F0F0F] p-2 md:px-8 md:py-2.5 rounded-full font-black text-sm uppercase tracking-tighter hover:scale-105 transition-all active:scale-95"
          >
            <span className="hidden md:inline">+ Nueva Reserva</span>
            <span className="md:hidden text-xl font-bold">+</span>
          </button>
        </header>        
        
        <section className="p-4 md:p-8 flex-1 bg-[#0F0F0F]">
          <div className="h-full w-full">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}