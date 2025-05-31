import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";

const Second_Menu_Preview = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <div>
      {formData.profileSummary.trim() !== "" && (
        <>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "5px",
              textAlign: "left",
            }}
          >
            Profile Summary:
          </h4>
          <div
            className="d-flex gap-3"
            style={{ fontSize: "10px", textAlign: "left" }}
          >
            <span>{formData.profileSummary.replace(/"/g, "")}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Second_Menu_Preview;
