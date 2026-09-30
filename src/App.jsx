import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateTicketPage from "./pages/CreateTicketPage";
import AgentDashboard from "./pages/AgentDashboard";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[var(--bg-void,#07080e)] text-[var(--text-primary,#f1f5f9)] overflow-x-hidden selection:bg-[var(--cyan-vibrant,#00f0ff)] selection:text-black">
          {/* Subtle animated background that runs BEHIND the entire website */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="bg-glow-orb-cyan" />
            <div className="bg-glow-orb-purple" />
            <div className="bg-glow-orb-orange" />
            <div className="cyber-ambient-grid" />
          </div>

          {/* Main content layer positioned safely above the background */}
          <div className="relative z-10 min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/request" element={<CreateTicketPage />} />
              <Route path="/support" element={<AgentDashboard />} />
              <Route path="/agent" element={<AgentDashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;