import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EveryBarber from "../pages/EveryBarber";
import BarberDetail from "../pages/BarberDetail";
import Home from "../pages/Home";

const AuthRotes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/everybarber" element={<EveryBarber />} />
      <Route path="/barberdetail/:id" element={<BarberDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRotes;
