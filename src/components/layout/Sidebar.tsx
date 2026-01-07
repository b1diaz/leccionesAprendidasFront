import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, LucideIcon, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/Images/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: { icon: LucideIcon; label: string; path: string; defaultActive?: boolean }[] = [
    { icon: Home, label: "Inicio", path: "/home" },
    { icon: Search, label: "Buscar", path: "/", defaultActive: true },
    { icon: BookOpen, label: "Instrucciones", path: "/instrucciones" },
  ];

  const isActive = (path: string, defaultActive?: boolean) => {
    // Si es la ruta de búsqueda (/), está activa si estamos en / o en /lesson/*
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/lesson/");
    }
    // Para otras rutas, verificar coincidencia exacta
    return location.pathname === path;
  };

  return (
    <aside className="w-20 bg-card flex flex-col items-center py-6 shadow-elevation-3 relative z-30">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden bg-transparent px-[5px]">
          <img 
            src={logoImage} 
            alt="Logo de la aplicación" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-base font-medium" style={{ color: '#2094f3' }}>
          mnemo
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full items-center">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg transition-all ${
              isActive(item.path, item.defaultActive)
                ? "bg-primary text-primary-foreground shadow-elevation-1"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            title={item.label}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-auto mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
          <User className="h-6 w-6 text-primary" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
