import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Third_Menu_Preview = () => {
  const { formData, experiences } = useContext(ResumeContext);

  return (
    <div className="experience-preview mt-4">
      {experiences && experiences.length > 0 ? (
        <>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "5px",
              textAlign: "left",
            }}
          >
            Work Experience
          </h4>
          {experiences.map((experience, index) => (
            <div key={index} className="experience-item mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  {experience.jobTitle} - {experience.companyName}
                </h4>
                <div
                  className="date-range"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  <span>{experience.fromDate}</span>
                  {experience.toDate && (
                    <>
                      <span> - </span>
                      <span>{experience.toDate}</span>
                    </>
                  )}
                </div>
              </div>
              <p
                className="project-description mt-2"
                style={{ fontSize: "10px", textAlign: "left" }}
              >
                {experience.projectDescription}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Third_Menu_Preview;
