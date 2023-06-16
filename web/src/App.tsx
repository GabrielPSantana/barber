import React from "react";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import NewPage from "./pages/New";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EveryBarber from "./pages/EveryBarber";
import BarberDatail from "./pages/BarberDetail";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/auth";
import Register from "./pages/Register";
import Routes from './routes'
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const theme = {
    primary: "#322153",
    secondary: "#6C63FF",
    backgound: "#F0F0F5",
    text: "#6C6C80",
    white: "#FFF",
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar/>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

//name//description/category//contact
export default App;
