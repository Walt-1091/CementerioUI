import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import SearchNiches from "./pages/SearchNiches";
import AddNiche from "./pages/AddNiche";
import AvailableNiches from "./pages/AvailableNiches";
import NicheDetails from "./pages/NicheDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Páginas de autenticación (SIN header) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* App (CON header global) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/niches/search" element={<SearchNiches />} />
        <Route path="/niches/add" element={<AddNiche />} />
        <Route path="/niches/available" element={<AvailableNiches />} />
        <Route path="/niches/:id" element={<NicheDetails />} />
        <Route path="/Niche/Details" element={<NicheDetails />} />
      </Route>
    </Routes>
  );
}
