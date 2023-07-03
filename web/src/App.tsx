import React from "react";
import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";
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
          <Navbar />
          <Routes />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        limit={2}
        theme="light"
        autoClose={3000}
        style={{ marginTop: "20px" }}
        position="top-right"
        newestOnTop
        closeOnClick
      />
    </ThemeProvider>
  );
}

//name//description/category//contact
export default App;
