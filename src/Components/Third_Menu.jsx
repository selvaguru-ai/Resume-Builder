import React, { useState, useContext } from "react";
import "../App.css";
import { ResumeContext } from "../scripts/ResumeContext";

const Third_Menu = () => {
  const { experiences, setExperiences } = useContext(ResumeContext);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    fromDate: "",
    toDate: "",
    projectDescription: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateResume = () => {
    if (
      !currentExperience.jobTitle &&
      !currentExperience.companyName &&
      !currentExperience.projectDescription
    )
      return;

    if (editingIndex !== null) {
      const updated = [...experiences];
      updated[editingIndex] = currentExperience;
      setExperiences(updated);
      setEditingIndex(null);
    } else {
      setExperiences((prev) => [...prev, currentExperience]);
    }
    // Clear form
    setCurrentExperience({
      jobTitle: "",
      companyName: "",
      fromDate: "",
      toDate: "",
      projectDescription: "",
    });
  };

  const handleAddMore = () => {
    // Simply clear form and reset edit index
    setCurrentExperience({
      jobTitle: "",
      companyName: "",
      fromDate: "",
      toDate: "",
      projectDescription: "",
    });
    setEditingIndex(null);
  };

  const handleLabelClick = (index) => {
    setCurrentExperience(experiences[index]);
    setEditingIndex(index);
  };

  const callAI = () => {
    alert(JSON.stringify(currentExperience));
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-6">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={currentExperience.jobTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={currentExperience.companyName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-4">
          <label htmlFor="fromDate" className="form-label">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={currentExperience.fromDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-4">
          <label htmlFor="toDate" className="form-label">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={currentExperience.toDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col position-relative">
          <textarea
            type="text"
            name="projectDescription"
            className="col-12"
            placeholder="Project Description - click on the lightbulb to use AI"
            value={currentExperience.projectDescription}
            onChange={handleChange}
            style={{
              height: "350px",
              paddingRight: "50px", // extra space for the icon
              paddingBottom: "30px",
            }}
          />
          <span
            className="lightbulb-icon"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px", // responsive placement
              pointerEvents: "auto",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={callAI}
          >
            💡
          </span>
        </div>
      </div>

      <div className="row">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="badge bg-secondary text-white p-2 m-1"
            style={{ cursor: "pointer" }}
            onClick={() => handleLabelClick(index)}
          >
            {exp.jobTitle || `Experience ${index + 1}`}
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-primary" onClick={handleUpdateResume}>
            {editingIndex !== null ? "Update Experience" : "Add Experience"}
          </button>
        </div>
        <div className="col-6">
          <button className="btn btn-secondary w-100" onClick={handleAddMore}>
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Third_Menu;
