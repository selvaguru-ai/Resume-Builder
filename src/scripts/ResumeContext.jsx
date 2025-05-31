import React, { Children, createContext, useContext, useState } from "react";

//Create a context
export const ResumeContext = createContext();

//Create a provider
export const ResumeProvider = ({ children }) => {
  const [formData, setformData] = useState({
    introduction: {
      fullName: "",
      linkedin: "",
      email: "",
      phone: "",
    },
    profileSummary: "",
  });

  const [experiences, setExperiences] = useState([]);

  return (
    <ResumeContext.Provider
      value={{ formData, setformData, experiences, setExperiences }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
