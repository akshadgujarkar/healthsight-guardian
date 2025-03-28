
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import DiseaseInfoPage from "./pages/DiseaseInfoPage";
import PreventionTipsPage from "./pages/PreventionTipsPage";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

const App = () => {
  // Force dark theme
  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="/disease-info" element={<DiseaseInfoPage />} />
            <Route path="/prevention-tips" element={<PreventionTipsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
