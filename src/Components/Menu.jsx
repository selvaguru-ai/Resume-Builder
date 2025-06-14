import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import { ResumeContext } from "../scripts/ResumeContext";
import First_Menu from "./First_Menu";
import Second_Menu from "./Second_Menu";
import Third_Menu from "./Third_Menu";
import Fourth_Menu from "./Fourth_Menu";
import Sample_Menu from "./Sample_Menu";
import Fifth_Menu from "./Fifth_Menu";

const Menu = () => {
  const { educationDetailsList, setEducationDetailsList } =
    useContext(ResumeContext);
  const [taskList, setTaskList] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
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
      <h4>Provide your Details</h4>
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
      <div className="row mt-3 text-center">
        <div className="col-6 d-flex justify-content-start">
          {step > 1 && (
            <button className="btn btn-primary" onClick={prevStep}>
              Prev
            </button>
          )}
        </div>

        <div className="col-6 d-flex justify-content-end">
          {step < 5 && (
            <button className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
