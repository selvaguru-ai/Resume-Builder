import React, { useContext } from "react";
import emailIcon from "../assets/envelope-solid.png";
import phoneIcon from "../assets/phone-solid.png";
import linkedinIcon from "../assets/linkedin.png";
import { ResumeContext } from "../scripts/ResumeContext";

const First_Menu_Preview = () => {
  const { formData, selectedLayout } = useContext(ResumeContext);

  // For classic layout, render contact info directly below name
  if (selectedLayout === "classic") {
    return (
      <>
        {/* Full Name */}
        {formData?.introduction?.fullName && (
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#3498db",
              textAlign: "center",
            }}
          >
            {formData.introduction.fullName}
          </h3>
        )}

        {/* Contact Info */}
        <div
          className="d-flex flex-column align-items-center gap-1"
          style={{
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center gap-4"
            style={{ marginBottom: "5px" }}
          >
            {/* Email */}
            {formData?.introduction?.email && (
              <div className="d-flex align-items-center">
                <img
                  src={emailIcon}
                  alt="Email"
                  width="12"
                  height="12"
                  style={{ marginRight: "5px" }}
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#3498db", // anchor tag needs it separately
                    wordBreak: "break-word",
                  }}
                >
                  {formData.introduction.email}
                </a>
              </div>
            )}

            {/* Phone */}
            {formData?.introduction?.phone && (
              <div className="d-flex align-items-center">
                <img
                  src={phoneIcon}
                  alt="Phone"
                  width="12"
                  height="12"
                  style={{ marginRight: "5px" }}
                />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#3498db", // anchor tag needs it separately
                    wordBreak: "break-word",
                  }}
                >
                  {formData.introduction.phone}
                </a>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          {formData?.introduction?.linkedin && (
            <div className="d-flex align-items-center">
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                width="12"
                height="12"
                style={{
                  marginRight: "5px",
                  minWidth: "12px",
                  minHeight: "12px",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <a
                href={formData.introduction.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#3498db", // anchor tag needs it separately
                  wordBreak: "break-word",
                }}
              >
                {formData.introduction.linkedin}
              </a>
            </div>
          )}
        </div>
        <div className="blue-separator"></div>
      </>
    );
  }

  // For modern layout, align contact details to the left
  if (selectedLayout === "modern") {
    return (
      <>
        {/* Full Name */}
        {formData?.introduction?.fullName && (
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            {formData.introduction.fullName}
          </h3>
        )}

        {/* Contact Information - Horizontal Layout */}
        <div
          className="d-flex align-items-center gap-3"
          style={{ textAlign: "left", marginBottom: "12px" }}
        >
          {/* Email */}
          {formData?.introduction?.email && (
            <div className="d-flex align-items-center">
              <img
                src={emailIcon}
                alt="Email"
                width="12"
                height="12"
                style={{ marginRight: "5px" }}
              />
              <span style={{ fontSize: "10px", color: "#007bff" }}>
                {formData.introduction.email}
              </span>
            </div>
          )}

          {/* Phone */}
          {formData?.introduction?.phone && (
            <div className="d-flex align-items-center">
              <img
                src={phoneIcon}
                alt="Phone"
                width="12"
                height="12"
                style={{ marginRight: "5px" }}
              />
              <span style={{ fontSize: "10px", color: "#007bff" }}>
                {formData.introduction.phone}
              </span>
            </div>
          )}

          {/* LinkedIn */}
          {formData?.introduction?.linkedin && (
            <div className="d-flex align-items-center">
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                width="12"
                height="12"
                style={{ marginRight: "5px" }}
              />
              <a
                href={formData.introduction.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  textDecoration: "none",
                  color: "#007bff",
                  wordBreak: "break-word",
                }}
              >
                {formData.introduction.linkedin}
              </a>
            </div>
          )}
        </div>
      </>
    );
  }

  // For other layouts, use the original responsive layout
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

      {/* Contact Information - Responsive Layout */}
      <div className="d-flex flex-column align-items-center gap-2 mt-2">
        {/* Email and Phone on first row if both exist, otherwise center individually */}
        {(formData?.introduction?.email || formData?.introduction?.phone) && (
          <div className="d-flex justify-content-center align-items-center gap-3">
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
          </div>
        )}

        {/* LinkedIn on separate row to ensure full visibility */}
        {formData?.introduction?.linkedin && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                width="12"
                height="12"
                style={{
                  marginRight: "5px",
                  minWidth: "12px",
                  minHeight: "12px",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <a
                href={formData.introduction.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px",
                  textDecoration: "none",
                  color: "inherit",
                  wordBreak: "break-all", // Allow breaking long URLs
                  maxWidth: "100%", // Use full available width
                  display: "inline-block",
                }}
              >
                {formData.introduction.linkedin}
              </a>
            </div>
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
