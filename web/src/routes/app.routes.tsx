import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EveryBarber from "../pages/EveryBarber";
import NewPage from '../pages/New'
import BarberDatail from '../pages/BarberDetail'

const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/new" element={<NewPage />}/>
    <Route path="/everybarber" element={<EveryBarber/>}/>
    <Route path="/barberdetail/:id" element={<BarberDatail/>}/>
  </Routes>
  );
};

export default AppRoutes;