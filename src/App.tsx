
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Landing from "./pages/Landing";
import SaasLanding from "./pages/SaasLanding";
import Onboarding from "./pages/Onboarding";
import OnboardingSuccess from "./pages/OnboardingSuccess";
import Login from "./pages/auth/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Broker Pages
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import BrokerClients from "./pages/broker/BrokerClients";
import BrokerSales from "./pages/broker/BrokerSales";
import BrokerQuotes from "./pages/broker/BrokerQuotes";

// Support Pages
import SupportDashboard from "./pages/support/SupportDashboard";
import SupportTickets from "./pages/support/SupportTickets";
import SupportClients from "./pages/support/SupportClients";
import SupportKnowledge from "./pages/support/SupportKnowledge";

// Client Pages
import ClientPortal from "./pages/client/ClientPortal";
import ClientPolicies from "./pages/client/ClientPolicies";
import ClientDocuments from "./pages/client/ClientDocuments";
import ClientContact from "./pages/client/ClientContact";

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
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Broker Routes */}
        <Route path="/broker" element={
          <ProtectedRoute allowedRoles={['broker']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<BrokerDashboard />} />
          <Route path="clients" element={<BrokerClients />} />
          <Route path="sales" element={<BrokerSales />} />
          <Route path="quotes" element={<BrokerQuotes />} />
        </Route>
        
        {/* Support Routes */}
        <Route path="/support" element={
          <ProtectedRoute allowedRoles={['support']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SupportDashboard />} />
          <Route path="tickets" element={<SupportTickets />} />
          <Route path="clients" element={<SupportClients />} />
          <Route path="knowledge" element={<SupportKnowledge />} />
        </Route>
        
        {/* Client Routes */}
        <Route path="/portal-cliente" element={
          <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ClientPortal />} />
          <Route path="policies" element={<ClientPolicies />} />
          <Route path="documents" element={<ClientDocuments />} />
          <Route path="contact" element={<ClientContact />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Routes for non-authenticated users
  return (
    <Routes>
      <Route path="/" element={<SaasLanding />} />
      <Route path="/saas" element={<SaasLanding />} />
      <Route path="/sistema" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />
      <Route path="/auth" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="efika-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
