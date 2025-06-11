import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu";
import "./App.css";
import Preview_Screen from "./Components/Preview_Screen";
import { ResumeProvider } from "./scripts/ResumeContext";
import Main_Layout from "./Components/Main_Layout";
import routes from "tempo-routes";

function App() {
  // Correct use of useRoutes inside the component
  const tempoRoutes = import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;

  return (
    <ResumeProvider>
      {/* Render tempo routes if enabled */}
      {tempoRoutes || (
        <Routes>
          <Route path="/" element={<Main_Layout />} />
          {/* Add more routes as needed */}
        </Routes>
      )}
    </ResumeProvider>
  );
}

export default App;
