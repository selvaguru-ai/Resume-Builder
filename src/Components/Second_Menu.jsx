import React, { useContext } from "react";
import "../App.css";
import { ResumeContext } from "../scripts/ResumeContext";

const Second_Menu = () => {
  const { formData, setformData, isGenerating, generateProfileSummary } =
    useContext(ResumeContext);
  const callAI = async () => {
    await generateProfileSummary();
  };
  const handleProfileChange = (e) => {
    setformData((prev) => ({
      ...prev,
      profileSummary: e.target.value,
    }));
  };
  return (
    <div className="row" style={{ padding: 0 }}>
      <div className="position-relative p-0">
        <textarea
          type="text"
          placeholder="Profile Summary - click on the lightbulb to use AI"
          className="form-control"
          style={{
            height: "350px",
            paddingRight: "50px", // make room for the icon
            paddingBottom: "30px",
          }}
          value={formData.profileSummary}
          onChange={handleProfileChange}
        />
        <span
          className="lightbulb-icon"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px", // use right instead of fixed left
            pointerEvents: "auto",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontSize: "30px",
            opacity: isGenerating ? 0.5 : 1,
          }}
          onClick={!isGenerating ? callAI : undefined}
        >
          {isGenerating ? "⏳" : "💡"}
        </span>
      </div>
    </div>
  );
};

export default Second_Menu;
