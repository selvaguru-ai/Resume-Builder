import React, { Children, createContext, useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || "",
    import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  );

  // Generate profile summary using AI via Supabase Edge Function
  const generateProfileSummary = async () => {
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      alert(
        "Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the project environment variables. Go to project settings to add them.",
      );
      return;
    }

    setIsGenerating(true);
    try {
      const { fullName } = formData.introduction;
      const existingSummary = formData.profileSummary;

      const { data, error } = await supabase.functions.invoke(
        "generate-profile-summary",
        {
          body: {
            fullName: fullName || "Professional",
            existingSummary: existingSummary || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      if (data && data.summary) {
        setformData((prev) => ({
          ...prev,
          profileSummary: data.summary,
        }));
      }
    } catch (error) {
      console.error("Error generating profile summary:", error);
      alert(
        "Error generating profile summary. Please make sure Supabase is properly configured and the Edge Function is deployed.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate project description using AI via Supabase Edge Function
  const generateProjectDescription = async (
    jobTitle,
    companyName,
    existingDescription,
  ) => {
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      alert(
        "Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the project environment variables. Go to project settings to add them.",
      );
      return null;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-project-description",
        {
          body: {
            jobTitle: jobTitle || "Professional",
            companyName: companyName || "Company",
            existingDescription: existingDescription || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      if (data && data.description) {
        return data.description;
      }
      return null;
    } catch (error) {
      console.error("Error generating project description:", error);
      alert(
        "Error generating project description. Please make sure Supabase is properly configured and the Edge Function is deployed.",
      );
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        formData,
        setformData,
        experiences,
        setExperiences,
        isGenerating,
        generateProfileSummary,
        generateProjectDescription,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
