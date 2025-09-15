import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/components/LoginPage";
import AdminLoginPage from "@/components/AdminLoginPage";
import EventPage from "@/components/EventPage";
import AdminDashboard from "@/pages/AdminDashboard";
import { apiRequest } from "@/lib/queryClient";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAdminSession, setIsCheckingAdminSession] = useState(true);

  // Check admin session status on app load
  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        const data = await response.json();
        setIsAdminAuthenticated(data.isAdmin || false);
      } catch (error) {
        console.log("Failed to check admin session:", error);
        setIsAdminAuthenticated(false);
      } finally {
        setIsCheckingAdminSession(false);
      }
    };
    
    checkAdminSession();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("User authenticated successfully");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false); // Clear admin auth when main user logs out
    console.log("User logged out");
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    console.log("Admin authenticated successfully");
  };

  const handleAdminLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout");
      setIsAdminAuthenticated(false);
      console.log("Admin logged out");
    } catch (error) {
      console.error("Admin logout failed:", error);
      // Clear local state even if server request fails
      setIsAdminAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Switch>
      <Route path="/" component={() => <EventPage onLogout={handleLogout} />} />
      <Route path="/event" component={() => <EventPage onLogout={handleLogout} />} />
      <Route path="/admin-login" component={() => <AdminLoginPage onAdminLogin={handleAdminLogin} />} />
      <Route path="/admin" component={() => 
        isAdminAuthenticated 
          ? <AdminDashboard onAdminLogout={handleAdminLogout} />
          : <AdminLoginPage onAdminLogin={handleAdminLogin} />
      } />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;