import React, { createContext, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

//Create a context
const ResumeContext = createContext(null);

// Initialize Supabase client outside component to prevent multiple instances
const getSupabaseClient = () => {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL || "",
    import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  );
};

//Create a provider
const ResumeProvider = ({ children }) => {
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
  const [educationDetailsList, setEducationDetailsList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Memoize Supabase client to prevent re-creation on every render
  const supabase = useMemo(() => getSupabaseClient(), []);

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
        "supabase-functions-generate-profile-summary",
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
        "supabase-functions-generate-project-description",
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
        educationDetailsList,
        setEducationDetailsList,
        isGenerating,
        generateProfileSummary,
        generateProjectDescription,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

ResumeProvider.displayName = "ResumeProvider";

export { ResumeContext, ResumeProvider };
