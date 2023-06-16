import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EveryBarber from "../pages/EveryBarber";

const AuthRotes = () => {
  return (
    <Routes>
      <Route path="/" element={<EveryBarber />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRotes;
