import React, { useContext } from "react";
import emailIcon from "../assets/envelope-solid.png";
import phoneIcon from "../assets/phone-solid.png";
import linkedinIcon from "../assets/linkedin.svg";
import { ResumeContext } from "../scripts/ResumeContext";

const First_Menu_Preview = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <>
      {/* Full Name Centered */}
      {formData?.introduction?.fullName && (
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          {formData.introduction.fullName}
        </h3>
      )}

      {/* Email and Phone Side by Side */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
        {formData?.introduction?.email && (
          <div className="d-flex align-items-center">
            <img
              src={emailIcon}
              alt="Email"
              width="12"
              height="12"
              style={{ marginRight: "5px" }}
            />
            <span style={{ fontSize: "12px" }}>
              {formData.introduction.email}
            </span>
          </div>
        )}
        {formData?.introduction?.phone && (
          <div className="d-flex align-items-center">
            <img
              src={phoneIcon}
              alt="Phone"
              width="12"
              height="12"
              style={{ marginRight: "5px" }}
            />
            <span style={{ fontSize: "12px" }}>
              {formData.introduction.phone}
            </span>
          </div>
        )}
        {formData?.introduction?.linkedin && (
          <div className="d-flex align-items-center">
            <img
              src={linkedinIcon}
              alt="Phone"
              width="12"
              height="12"
              style={{ marginRight: "5px" }}
            />
            <a
              href={formData.introduction.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap", // Prevent the text from breaking to the next line
                overflow: "hidden", // Hide any overflowed text
                textOverflow: "ellipsis", // Add ellipsis if text is too long
                maxWidth: "200px", // Adjust width as necessary to prevent overflow
                display: "inline-block", // Ensures the link stays inline
              }}
            >
              {formData.introduction.linkedin}
            </a>
          </div>
        )}
      </div>
      {/* Separator Line */}
      {formData?.introduction?.email &&
        formData?.introduction?.fullName &&
        formData?.introduction?.phone &&
        formData?.introduction?.linkedin && (
          <hr
            style={{
              width: "100%",
              margin: "5px auto",
              borderTop: "1px solid black",
            }}
          />
        )}
    </>
  );
};

export default First_Menu_Preview;
