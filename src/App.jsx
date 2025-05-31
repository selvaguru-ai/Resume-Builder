import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/Menu";
import "./App.css";
import Preview_Screen from "./Components/Preview_Screen";
import { ResumeContext, ResumeProvider } from "./scripts/ResumeContext";
import Main_Layout from "./Components/Main_Layout";

function App() {
  return (
    <ResumeProvider>
      <Main_Layout />
    </ResumeProvider>
  );
}

export default App;
