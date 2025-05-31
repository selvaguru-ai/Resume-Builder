import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Third_Menu_Preview = () => {
  const { formData, experiences } = useContext(ResumeContext);

  return (
    <div className="experience-preview">
      <h4 className="section-title mb-3">Work Experience</h4>
      {experiences && experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <div key={index} className="experience-item mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="job-title mb-0">{experience.jobTitle}</h5>
              <div className="date-range">
                <span>{experience.fromDate}</span>
                {experience.toDate && (
                  <>
                    <span> - </span>
                    <span>{experience.toDate}</span>
                  </>
                )}
              </div>
            </div>
            <h6 className="company-name">{experience.companyName}</h6>
            <p className="project-description mt-2">
              {experience.projectDescription}
            </p>
          </div>
        ))
      ) : (
        <p className="text-muted">No work experience added yet.</p>
      )}
    </div>
  );
};

export default Third_Menu_Preview;
