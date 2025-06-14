import React, { useContext } from "react";
import html2pdf from "html2pdf.js";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
} from "docx";
import { saveAs } from "file-saver";
import { ResumeContext } from "../scripts/ResumeContext";

import First_Menu_Preview from "./First_Menu_Preview";
import Second_Menu_Preview from "./Second_Menu_Preview";
import Third_Menu_Preview from "./Third_Menu_Preview";
import Fourth_Menu_Preview from "./Fourth_Menu_Preview";
import Fifth_Menu_Preview from "./Fifth_Menu_Preview";

const Preview_Screen = () => {
  const {
    formData,
    experiences,
    educationDetailsList,
    selectedLayout,
    skillList,
  } = useContext(ResumeContext) || {};

  // Handle download without authentication
  const handleDownloadClick = () => {
    downloadPDF();
  };

  // Handle Word document download for minimal layout
  const handleDownloadWordClick = () => {
    downloadWord();
  };
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      console.error("Resume preview element not found");
      return;
    }

    // Clean up any existing temporary elements first
    const cleanupTempElements = () => {
      // Remove any existing styles with the same ID
      const existingStyle = document.getElementById("pdf-temp-style");
      if (existingStyle) {
        existingStyle.remove();
      }

      // Remove any existing footer
      const existingFooter = element.querySelector(".pdf-footer");
      if (existingFooter) {
        existingFooter.remove();
      }

      // Remove any existing empty line
      const existingEmptyLine = element.querySelector(".pdf-empty-line");
      if (existingEmptyLine) {
        existingEmptyLine.remove();
      }
    };

    // Clean up before starting
    cleanupTempElements();

    // Add CSS styles to allow line-level page breaks and footer
    const style = document.createElement("style");
    style.id = "pdf-temp-style";
    style.textContent = `
      @media print {
        .resume-preview {
          page-break-inside: auto;
          padding-bottom: 60px !important;
        }
        .resume-section {
          page-break-inside: auto;
          break-inside: auto;
        }
        .experience-item {
          page-break-inside: auto;
          break-inside: auto;
        }
        h3, h4, h5, h6 {
          page-break-after: auto;
          break-after: auto;
          orphans: 2;
          widows: 2;
        }
        p, li {
          page-break-inside: auto;
          break-inside: auto;
          orphans: 2;
          widows: 2;
        }
        ul, ol {
          page-break-inside: auto;
          break-inside: auto;
        }
        .contact-info {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .pdf-footer {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 10px;
          color: #666;
          z-index: 1000;
        }
        * {
          orphans: 2;
          widows: 2;
        }
      }
    `;
    document.head.appendChild(style);

    // Add empty line before footer to prevent text breaking
    const emptyLine = document.createElement("div");
    emptyLine.className = "pdf-empty-line";
    emptyLine.style.height = "20px";
    emptyLine.innerHTML = "&nbsp;";
    element.appendChild(emptyLine);

    // Add footer element for page numbers
    const footer = document.createElement("div");
    footer.className = "pdf-footer";
    footer.innerHTML = "";
    element.appendChild(footer);

    const opt = {
      margin: [0.5, 0.5, 0.8, 0.5], // Increased bottom margin for footer
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1050, // Reduced height to account for footer
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      },
      pagebreak: {
        mode: ["css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: ".contact-info",
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        // Page numbering removed to fix '/' symbol issue
        return pdf;
      })
      .save()
      .then(() => {
        // Clean up temporary elements after successful PDF generation
        cleanupTempElements();
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        // Clean up temporary elements on error
        cleanupTempElements();
      });
  };

  const downloadWord = async () => {
    console.log("Starting Word document generation...");
    console.log("Form data:", formData);
    console.log("Experiences:", experiences);
    console.log("Education:", educationDetailsList);
    console.log("Skills:", skillList);

    try {
      // Create document sections
      const children = [];

      // Add name
      if (formData?.introduction?.fullName) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: formData.introduction.fullName,
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.LEFT,
          }),
        );
      }

      // Add contact information
      const contactInfo = [];
      if (formData?.introduction?.email) {
        contactInfo.push(formData.introduction.email);
      }
      if (formData?.introduction?.phone) {
        contactInfo.push(formData.introduction.phone);
      }
      if (formData?.introduction?.linkedin) {
        contactInfo.push(formData.introduction.linkedin);
      }

      if (contactInfo.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: contactInfo.join(" | "),
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        );
      }

      // Add profile summary
      if (formData?.profileSummary && formData.profileSummary.trim() !== "") {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Profile Summary",
                bold: true,
                size: 24,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
        );
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: formData.profileSummary.replace(/"/g, ""),
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        );
      }

      // Add experience
      if (experiences && experiences.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Experience",
                bold: true,
                size: 24,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
        );

        experiences.forEach((exp) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Company: ${exp.companyName} | Designation: ${exp.jobTitle}`,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 50 },
            }),
          );
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `From: ${exp.fromDate} | To: ${exp.toDate}`,
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            }),
          );

          // Handle project description
          if (exp.projectDescription) {
            if (exp.projectDescription.includes("•")) {
              // Handle bullet points
              const points = exp.projectDescription
                .split("\n")
                .filter((line) => line.trim())
                .map((point) => point.replace(/^•\s*/, "").trim());

              points.forEach((point) => {
                children.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${point}`,
                        size: 20,
                      }),
                    ],
                    spacing: { after: 50 },
                  }),
                );
              });
            } else {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.projectDescription,
                      size: 20,
                    }),
                  ],
                  spacing: { after: 100 },
                }),
              );
            }
          }

          children.push(
            new Paragraph({
              children: [new TextRun({ text: "", size: 20 })],
              spacing: { after: 100 },
            }),
          );
        });
      }

      // Add education
      if (educationDetailsList && educationDetailsList.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Education",
                bold: true,
                size: 24,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
        );

        educationDetailsList.forEach((education) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${education.degree} - ${education.study}`,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 50 },
            }),
          );
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${education.college} | ${education.month} | GPA: ${education.gpa || "N/A"}`,
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            }),
          );
        });
      }

      // Add skills
      if (skillList && skillList.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Technical Skills",
                bold: true,
                size: 24,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
        );

        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: skillList.join(", "),
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        );
      }

      // Create the document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: children,
          },
        ],
      });

      // Generate and save the document
      console.log("Generating document blob...");
      const blob = await Packer.toBlob(doc);
      console.log("Document blob generated successfully");
      saveAs(blob, "resume.docx");
      console.log("Word document download initiated successfully");
    } catch (error) {
      console.error("Word document generation failed:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      alert(
        `Failed to generate Word document: ${error.message}. Please check the console for more details.`,
      );
    }
  };

  return (
    <div className="position-relative">
      {/* Download Buttons */}
      <div className="d-flex justify-content-end mb-3 gap-2">
        {/* Show Word download button only for minimal layout */}
        {selectedLayout === "minimal" && (
          <button
            className="btn btn-primary btn-sm shadow-sm"
            onClick={handleDownloadWordClick}
            style={{
              borderRadius: "8px",
              fontWeight: "500",
              padding: "8px 16px",
              fontSize: "0.9rem",
              backgroundColor: "#007bff",
              border: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0056b3";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="bi bi-file-earmark-word me-2"></i>
            Download Word
          </button>
        )}

        <button
          className="btn btn-success btn-sm shadow-sm"
          onClick={handleDownloadClick}
          style={{
            borderRadius: "8px",
            fontWeight: "500",
            padding: "8px 16px",
            fontSize: "0.9rem",
            backgroundColor: "#28a745",
            border: "none",
            transition: "all 0.2s ease",
            cursor: "pointer",
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
        className={`resume-preview p-4 text-dark no-page-break layout-${selectedLayout || "classic"}`}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          lineHeight: "1.5",
        }}
      >
        <div className="resume-section contact-info">
          <First_Menu_Preview />
        </div>
        <div className="resume-section">
          <Second_Menu_Preview />
        </div>
        <div className="resume-section">
          <Third_Menu_Preview />
        </div>
        <div className="resume-section">
          <Fourth_Menu_Preview
            educationDetailsList={educationDetailsList || []}
          />
        </div>
        <div className="resume-section">
          <Fifth_Menu_Preview />
        </div>
      </div>
    </div>
  );
};

export default Preview_Screen;
