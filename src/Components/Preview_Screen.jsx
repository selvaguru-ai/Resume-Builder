import React from "react";
import html2pdf from "html2pdf.js";

import First_Menu_Preview from "./First_Menu_Preview";
import Second_Menu_Preview from "./Second_Menu_Preview";
import Third_Menu_Preview from "./Third_Menu_Preview";

const Preview_Screen = () => {
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="position-relative">
      {/* Download PDF Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success btn-sm shadow-sm"
          onClick={downloadPDF}
          style={{
            borderRadius: "8px",
            fontWeight: "500",
            padding: "8px 16px",
            fontSize: "0.9rem",
            backgroundColor: "#28a745",
            border: "none",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#218838";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#28a745";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <i className="bi bi-download me-2"></i>
          Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div
        id="resume-preview"
        className="resume-preview p-4 text-dark text-center"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          lineHeight: "1.5",
        }}
      >
        <First_Menu_Preview />
        <Second_Menu_Preview />
        <Third_Menu_Preview />
      </div>
    </div>
  );
};

export default Preview_Screen;
