import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewPage from './pages/New'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EveryBarber from './pages/EveryBarber'
import BarberDatail from './pages/BarberDetail';

function App() {

  const theme = {
    primary: "#322153",
    secondary: "#6C63FF",
    backgound: "#F0F0F5",
    text: "#6C6C80",
    white: "#FFF"
  }

  return (
   <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/new" element={<NewPage />}></Route>
        <Route path="/everybarber" element={<EveryBarber/>}></Route>
        <Route path="/barberdetail" element={<BarberDatail/>}></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
   </ThemeProvider>
  );
}

export default App;
