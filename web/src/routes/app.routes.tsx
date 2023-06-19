import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EveryBarber from "../pages/EveryBarber";
import NewPage from "../pages/New";
import BarberDatail from "../pages/BarberDetail";
import Dashboard from "../pages/Dashboard";
import EditStore from "../pages/EditStore/Index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/everybarber" element={<EveryBarber />} />
      <Route path="/barberdetail/:id" element={<BarberDatail />} />
      <Route path="/store/edit/:id" element={<EditStore />} />
    </Routes>
  );
};

export default AppRoutes;
