// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AllRoutes from "./routes/AllRoutes";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
// import 'antd/dist/antd.css';  // Import Ant Design styles

const App = () => {
  return (
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  );
};

export default App;
