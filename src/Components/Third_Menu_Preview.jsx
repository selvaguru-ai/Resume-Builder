import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Third_Menu_Preview = () => {
  const { formData, experiences } = useContext(ResumeContext);
  return (
    <div>
      <h4
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "5px",
          textAlign: "left",
          marginTop: "5px",
        }}
      >
        Experience
      </h4>
      {experiences.length !== 0 &&
        experiences.map((exp, index) => (
          <div key={index} className="row mb-3 p-3">
            <div className="col-3">
              <h4
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  textAlign: "left",
                }}
              >
                <strong style={{ textAlign: "left" }}>Company: </strong>{" "}
                {exp.companyName} &nbsp;
                <strong>Designation: </strong> {exp.jobTitle}{" "}
              </h4>
            </div>
            <p>
              <strong>From:</strong> {exp.fromDate} &nbsp;
              <strong>To:</strong> {exp.toDate}
            </p>
            <p>{exp.projectDescription}</p>
          </div>
        ))}
    </div>
  );
};

export default Third_Menu_Preview;
