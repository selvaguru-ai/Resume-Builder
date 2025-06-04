import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Fourth_Menu_Preview = ({ educationDetailsList }) => {
  if (!educationDetailsList || educationDetailsList.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h4
        className="text-start mb-3"
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "5px",
          textAlign: "left",
        }}
      >
        Education
      </h4>
      <div className="table-responsive">
        <table
          className="table table-sm"
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Degree
              </th>
              <th
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                College/University
              </th>
              <th
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Field of Study
              </th>
              <th
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Graduation Date
              </th>
              <th
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                GPA/CGPA
              </th>
            </tr>
          </thead>
          <tbody>
            {educationDetailsList.map((education, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#212529",
                  }}
                >
                  {education.degree}
                </td>
                <td
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#212529",
                  }}
                >
                  {education.college}
                </td>
                <td
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#212529",
                  }}
                >
                  {education.study}
                </td>
                <td
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    fontSize: "0.85rem",
                    color: "#212529",
                  }}
                >
                  {education.month}
                </td>
                <td
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    fontSize: "0.85rem",
                    color: "#212529",
                  }}
                >
                  {education.gpa || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fourth_Menu_Preview;
