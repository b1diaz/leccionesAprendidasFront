import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import LessonDetailPage from "./pages/LessonDetailPage";
import InstructionsPage from "./pages/InstructionsPage";
import NotFound from "./pages/NotFound";
import { FilterProvider } from "./contexts/FilterContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FilterProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/lesson/:id" element={<LessonDetailPage />} />
            <Route path="/instrucciones" element={<InstructionsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
