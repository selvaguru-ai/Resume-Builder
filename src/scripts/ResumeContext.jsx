import React, { Children, createContext, useContext, useState } from "react";
import OpenAI from "openai";

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

  // Initialize OpenAI client
  const openai = import.meta.env.VITE_OPENAI_API_KEY
    ? new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      })
    : null;

  // Generate profile summary using AI
  const generateProfileSummary = async () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY || !openai) {
      alert(
        "Please set your VITE_OPENAI_API_KEY in the project environment variables. Go to project settings to add it.",
      );
      return;
    }

    setIsGenerating(true);
    try {
      const { fullName } = formData.introduction;
      const existingSummary = formData.profileSummary;

      const prompt = `Generate a professional 6-line profile summary for a resume. 
      Name: ${fullName || "Professional"}
      ${existingSummary ? `Current summary: ${existingSummary}` : ""}
      
      Create a compelling professional summary that highlights key skills, experience, and career objectives. Make it exactly 6 lines, each line should be a complete sentence. Focus on professional strengths and career goals.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      });

      const generatedSummary = response.choices[0].message.content.trim();
      setformData((prev) => ({
        ...prev,
        profileSummary: generatedSummary,
      }));
    } catch (error) {
      console.error("Error generating profile summary:", error);
      alert(
        "Error generating profile summary. Please check your API key and try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate project description using AI
  const generateProjectDescription = async (
    jobTitle,
    companyName,
    existingDescription,
  ) => {
    if (!import.meta.env.VITE_OPENAI_API_KEY || !openai) {
      alert(
        "Please set your VITE_OPENAI_API_KEY in the project environment variables. Go to project settings to add it.",
      );
      return null;
    }

    setIsGenerating(true);
    try {
      const prompt = `Generate a professional project description for a resume with at least 6 bullet points.
      Job Title: ${jobTitle || "Professional"}
      Company: ${companyName || "Company"}
      ${existingDescription ? `Current description: ${existingDescription}` : ""}
      
      Create at least 6 detailed bullet points that describe key responsibilities, achievements, and impact. Each bullet point should start with a strong action verb and quantify results where possible. Format as bullet points with • symbol.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const generatedDescription = response.choices[0].message.content.trim();
      return generatedDescription;
    } catch (error) {
      console.error("Error generating project description:", error);
      alert(
        "Error generating project description. Please check your API key and try again.",
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
