import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Third_Menu_Preview = () => {
  const { formData, experiences } = useContext(ResumeContext);
  return (
    <div>
      {experiences.length !== 0 &&
        experiences.map((exp, index) => (
          <div key={index}>
            <h4
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "2px",
                textAlign: "left",
                marginTop: "7px",
              }}
            >
              Experience
            </h4>
            <div
              className="mb-2"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong style={{ fontSize: "12px" }}>Company: </strong>
                  <span style={{ fontSize: "12px" }}>{exp.companyName}</span>
                  &nbsp;
                  <strong style={{ fontSize: "12px" }}>Designation: </strong>
                  <span style={{ fontSize: "12px" }}>{exp.jobTitle}</span>
                </div>
                <div>
                  <strong style={{ fontSize: "12px" }}>From: </strong>
                  <span style={{ fontSize: "12px" }}>{exp.fromDate}</span>
                  &nbsp;
                  <strong style={{ fontSize: "12px" }}>To: </strong>
                  <span style={{ fontSize: "12px" }}>{exp.toDate}</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  marginTop: "5px",
                  textAlign: "left",
                  paddingLeft: "0px",
                  marginLeft: "0px",
                }}
              >
                {exp.projectDescription}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Third_Menu_Preview;
