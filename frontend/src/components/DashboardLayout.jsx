import Sidebar from './Sidebar';

export default function DashboardLayout({ children, salonType, onOpenModal }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-white">
     
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">   
                
        <header className="h-20 border-b border-[#D4AF37]/10 flex items-center justify-between px-4 md:px-8 bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex flex-col">          
            <span className="text-[10px] md:text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-bold">
              Management System
            </span>
            <h2 className="text-lg md:text-xl font-serif font-semibold capitalize truncate max-w-[200px] md:max-w-none tracking-tight">
              {salonType}
            </h2>
          </div>          
                   
          <button 
            onClick={onOpenModal}
            className="bg-[#D4AF37] text-[#0F0F0F] p-2 md:px-8 md:py-2.5 rounded-full font-black text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95"
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