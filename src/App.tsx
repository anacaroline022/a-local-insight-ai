
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrevisaoEvasao from "./pages/PrevisaoEvasao";
import AulasTematicasRetro from "./pages/AulasTematicasRetro";
import NotFound from "./pages/NotFound";
import DesignIntuitivo from "./pages/DesignIntuitivo";
import PlanilhaFaturamento from "./pages/PlanilhaFaturamento";

// Create a client
const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-medium">Carregando...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/previsao-evasao" 
        element={
          <ProtectedRoute>
            <PrevisaoEvasao />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/aulas-tematicas" 
        element={
          <ProtectedRoute>
            <AulasTematicasRetro />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/design-intuitivo" 
        element={
          <ProtectedRoute>
            <DesignIntuitivo />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/planilha-faturamento" 
        element={
          <ProtectedRoute>
            <PlanilhaFaturamento />
          </ProtectedRoute>
        } 
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
