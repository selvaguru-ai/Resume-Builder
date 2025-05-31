import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu";
import "./App.css";
import Preview_Screen from "./Components/Preview_Screen";
import { ResumeContext, ResumeProvider } from "./scripts/ResumeContext";
import Main_Layout from "./Components/Main_Layout";
import { useRoutes, BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";

function AppRoutes() {
  const tempoRoutes = import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;
  return (
    <>
      {tempoRoutes}
      <Routes>
        <Route path="*" element={<Main_Layout />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
