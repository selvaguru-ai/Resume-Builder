import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import First_Menu from "./First_Menu";
import Second_Menu from "./Second_Menu";
import Third_Menu from "./Third_Menu";
import Fourth_Menu from "./Fourth_Menu";
import Sample_Menu from "./Sample_Menu";
import Fifth_Menu from "./Fifth_Menu";

const Menu = () => {
  const [taskList, setTaskList] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [educationDetailsList, setEducationDetailsList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  //const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const [step, setStep] = useState(1);

  const [experience, setExperience] = useState([
    {
      expId: 0,
      jobTitle: "",
      companyName: "",
      fromDate: null,
      toDate: null,
      projectDescription: "",
    },
  ]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <div className="container">
      <div className="mb-4">
        <div className="progress mb-3" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${(step / 5) * 100}%` }}
            aria-valuenow={step}
            aria-valuemin="1"
            aria-valuemax="5"
          ></div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span
            className={`badge ${step >= 1 ? "bg-primary" : "bg-secondary"}`}
          >
            Personal
          </span>
          <span
            className={`badge ${step >= 2 ? "bg-primary" : "bg-secondary"}`}
          >
            Summary
          </span>
          <span
            className={`badge ${step >= 3 ? "bg-primary" : "bg-secondary"}`}
          >
            Experience
          </span>
          <span
            className={`badge ${step >= 4 ? "bg-primary" : "bg-secondary"}`}
          >
            Education
          </span>
          <span
            className={`badge ${step >= 5 ? "bg-primary" : "bg-secondary"}`}
          >
            Skills
          </span>
        </div>
      </div>

      <h4 className="mb-4 border-bottom pb-2">
        {step === 1 && "Personal Information"}
        {step === 2 && "Professional Summary"}
        {step === 3 && "Work Experience"}
        {step === 4 && "Education"}
        {step === 5 && "Skills & Expertise"}
      </h4>

      {step == 1 && <First_Menu />}
      {step == 2 && <Second_Menu />}
      {step == 3 && <Third_Menu />}
      {step == 4 && (
        <Fourth_Menu
          educationDetailsList={educationDetailsList}
          setEducationDetailsList={setEducationDetailsList}
        />
      )}
      {step === 5 && (
        <Fifth_Menu skillList={skillList} setSkillList={setSkillList} />
      )}

      <div className="row mt-4 pt-3 border-top">
        <div className="col-4 d-flex justify-content-start">
          {step > 1 && (
            <button className="btn btn-outline-primary px-4" onClick={prevStep}>
              <i className="bi bi-arrow-left me-2"></i> Previous
            </button>
          )}
        </div>

        <div className="col-4 text-center">
          <button className="btn btn-primary px-4">
            <i className="bi bi-check-circle me-2"></i> Update Resume
          </button>
        </div>

        <div className="col-4 d-flex justify-content-end">
          {step < 5 && (
            <button className="btn btn-outline-primary px-4" onClick={nextStep}>
              Next <i className="bi bi-arrow-right ms-2"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
