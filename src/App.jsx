import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ParticleBackground from "./components/ParticleBackground";

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
        <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--orange-vibrant)] selection:text-black">
          {/* Living Animated Background running continuously behind entire website */}
          <ParticleBackground />

          {/* Main content layer safely elevated above background */}
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