import { Calendar, FileText, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Inicio", onClick: () => navigate("/") },
    { icon: Search, label: "Búsqueda", onClick: () => navigate("/") },
    { icon: FileText, label: "Formularios", onClick: () => navigate("/forms") },
    { icon: Calendar, label: "Calendario", onClick: () => navigate("/") },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-16 lg:h-full lg:w-16 bg-purple-100 border-b lg:border-b-0 lg:border-r border-purple-200 flex lg:flex-col items-center justify-center lg:justify-start py-2 lg:py-6 px-4 lg:px-0 z-10">
      <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="w-20 h- p-0 hover:bg-purple-200 text-purple-700 hover:text-purple-900 transition-colors"
            title={item.label}
            onClick={item.onClick}
          >
            <item.icon size={20} />{" "}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
