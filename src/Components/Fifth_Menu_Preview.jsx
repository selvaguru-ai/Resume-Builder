import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Fifth_Menu_Preview = () => {
  const { skillList } = useContext(ResumeContext);

  if (!skillList || skillList.length === 0) {
    return null;
  }

  // Split skills into 3 columns
  const skillsPerColumn = Math.ceil(skillList.length / 3);
  const column1 = skillList.slice(0, skillsPerColumn);
  const column2 = skillList.slice(skillsPerColumn, skillsPerColumn * 2);
  const column3 = skillList.slice(skillsPerColumn * 2);

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
        Technical Skills
      </h4>
      <div
        className="skills-container"
        style={{ display: "flex", gap: "15px" }}
      >
        {/* Column 1 */}
        <div className="skills-column" style={{ flex: 1 }}>
          <ul
            style={{
              margin: 0,
              padding: 0,
              paddingLeft: "12px",
              listStyleType: "disc",
              listStylePosition: "outside",
            }}
          >
            {column1.map((skill, index) => (
              <li
                key={index}
                style={{
                  fontSize: "11px",
                  marginBottom: "2px",
                  color: "#212529",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        {column2.length > 0 && (
          <div className="skills-column" style={{ flex: 1 }}>
            <ul
              style={{
                margin: 0,
                padding: 0,
                paddingLeft: "12px",
                listStyleType: "disc",
                listStylePosition: "outside",
              }}
            >
              {column2.map((skill, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "11px",
                    marginBottom: "2px",
                    color: "#212529",
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Column 3 */}
        {column3.length > 0 && (
          <div className="skills-column" style={{ flex: 1 }}>
            <ul
              style={{
                margin: 0,
                padding: 0,
                paddingLeft: "12px",
                listStyleType: "disc",
                listStylePosition: "outside",
              }}
            >
              {column3.map((skill, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "11px",
                    marginBottom: "2px",
                    color: "#212529",
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fifth_Menu_Preview;
