import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-56">
        <Header />
        <main className="min-h-[calc(100vh-3.5rem)] pb-16 lg:min-h-[calc(100vh-4rem)] lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
