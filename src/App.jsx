import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateTicketPage from "./pages/CreateTicketPage";
import AgentDashboard from "./pages/AgentDashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/customer" element={<CustomerDashboard />} />

        <Route 
          path="/customer/request" 
          element={<CreateTicketPage />} 
        />

        <Route 
          path="/support" 
          element={<AgentDashboard />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;