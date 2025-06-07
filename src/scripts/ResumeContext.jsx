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
  // Load initial data from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [formData, setformData] = useState(() =>
    loadFromStorage("resumeFormData", {
      introduction: {
        fullName: "",
        linkedin: "",
        email: "",
        phone: "",
      },
      profileSummary: "",
    }),
  );

  const [experiences, setExperiences] = useState(() =>
    loadFromStorage("resumeExperiences", []),
  );
  const [educationDetailsList, setEducationDetailsList] = useState(() =>
    loadFromStorage("resumeEducationDetails", []),
  );
  const [skillList, setSkillList] = useState(() =>
    loadFromStorage("resumeSkillList", []),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(() =>
    loadFromStorage("resumeSelectedLayout", "classic"),
  );
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Memoize Supabase client to prevent re-creation on every render
  const supabase = useMemo(() => getSupabaseClient(), []);

  // Save to localStorage whenever data changes
  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Enhanced setters that also save to localStorage
  const setFormDataWithStorage = (newFormData) => {
    if (typeof newFormData === "function") {
      setformData((prev) => {
        const updated = newFormData(prev);
        saveToStorage("resumeFormData", updated);
        return updated;
      });
    } else {
      setformData(newFormData);
      saveToStorage("resumeFormData", newFormData);
    }
  };

  const setExperiencesWithStorage = (newExperiences) => {
    if (typeof newExperiences === "function") {
      setExperiences((prev) => {
        const updated = newExperiences(prev);
        saveToStorage("resumeExperiences", updated);
        return updated;
      });
    } else {
      setExperiences(newExperiences);
      saveToStorage("resumeExperiences", newExperiences);
    }
  };

  const setEducationDetailsListWithStorage = (newEducationDetailsList) => {
    if (typeof newEducationDetailsList === "function") {
      setEducationDetailsList((prev) => {
        const updated = newEducationDetailsList(prev);
        saveToStorage("resumeEducationDetails", updated);
        return updated;
      });
    } else {
      setEducationDetailsList(newEducationDetailsList);
      saveToStorage("resumeEducationDetails", newEducationDetailsList);
    }
  };

  const setSkillListWithStorage = (newSkillList) => {
    if (typeof newSkillList === "function") {
      setSkillList((prev) => {
        const updated = newSkillList(prev);
        saveToStorage("resumeSkillList", updated);
        return updated;
      });
    } else {
      setSkillList(newSkillList);
      saveToStorage("resumeSkillList", newSkillList);
    }
  };

  const setSelectedLayoutWithStorage = (newLayout) => {
    setSelectedLayout(newLayout);
    saveToStorage("resumeSelectedLayout", newLayout);
  };

  // Clear all resume data from localStorage and reset state
  const clearResumeData = () => {
    try {
      localStorage.removeItem("resumeFormData");
      localStorage.removeItem("resumeExperiences");
      localStorage.removeItem("resumeEducationDetails");
      localStorage.removeItem("resumeSkillList");
      localStorage.removeItem("resumeSelectedLayout");

      // Reset all state to default values
      setformData({
        introduction: {
          fullName: "",
          linkedin: "",
          email: "",
          phone: "",
        },
        profileSummary: "",
      });
      setExperiences([]);
      setEducationDetailsList([]);
      setSkillList([]);
      setSelectedLayout("classic");
    } catch (error) {
      console.error("Error clearing resume data:", error);
    }
  };

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
        setFormDataWithStorage((prev) => ({
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
        setformData: setFormDataWithStorage,
        experiences,
        setExperiences: setExperiencesWithStorage,
        educationDetailsList,
        setEducationDetailsList: setEducationDetailsListWithStorage,
        skillList,
        setSkillList: setSkillListWithStorage,
        isGenerating,
        generateProfileSummary,
        generateProjectDescription,
        selectedLayout,
        setSelectedLayout: setSelectedLayoutWithStorage,
        user,
        setUser,
        isAuthenticating,
        setIsAuthenticating,
        supabase,
        clearResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

ResumeProvider.displayName = "ResumeProvider";

export { ResumeContext, ResumeProvider };
