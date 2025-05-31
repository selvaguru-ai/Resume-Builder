import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Fourth_Menu_Preview = () => {
  const { educationDetailsList } = useContext(ResumeContext);

  return (
    <div className="education-preview">
      {educationDetailsList && educationDetailsList.length > 0 ? (
        <>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "5px",
              textAlign: "left",
            }}
          >
            Education
          </h4>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>College</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Graduation Date</th>
              </tr>
            </thead>
            <tbody>
              {educationDetailsList.map((education, index) => (
                <tr key={index}>
                  <td>{education.college}</td>
                  <td>{education.degree}</td>
                  <td>{education.study}</td>
                  <td>{education.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default Fourth_Menu_Preview;
