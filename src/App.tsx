import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import SupportDashboard from "./pages/support/SupportDashboard";
import ClientPortal from "./pages/client/ClientPortal";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Redirect authenticated users to their dashboard
  if (user) {
    const userBasePath = user.role === 'client' ? '/portal-cliente' : `/${user.role}`;
    
    return (
      <Routes>
        <Route path="/" element={<Navigate to={userBasePath} replace />} />
        <Route path="/auth" element={<Navigate to={userBasePath} replace />} />
        
        {/* Staff Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
        </Route>
        
        <Route path="/broker" element={
          <ProtectedRoute allowedRoles={['broker']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<BrokerDashboard />} />
        </Route>
        
        <Route path="/support" element={
          <ProtectedRoute allowedRoles={['support']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SupportDashboard />} />
        </Route>
        
        {/* Client Routes */}
        <Route path="/portal-cliente" element={
          <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ClientPortal />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Routes for non-authenticated users
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
