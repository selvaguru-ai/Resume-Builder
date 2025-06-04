import React, { useState } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu";
import "./App.css";
import Preview_Screen from "./Components/Preview_Screen";
import { ResumeContext, ResumeProvider } from "./scripts/ResumeContext";
import Main_Layout from "./Components/Main_Layout";
import routes from "tempo-routes";

function App() {
  return (
    <ResumeProvider>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Main_Layout />} />
        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </ResumeProvider>
  );
}

export default App;
