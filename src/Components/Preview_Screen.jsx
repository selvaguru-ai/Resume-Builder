import React, { useContext } from "react";
import html2pdf from "html2pdf.js";
import { ResumeContext } from "../scripts/ResumeContext";

import First_Menu_Preview from "./First_Menu_Preview";
import Second_Menu_Preview from "./Second_Menu_Preview";
import Third_Menu_Preview from "./Third_Menu_Preview";
import Fourth_Menu_Preview from "./Fourth_Menu_Preview";
import Fifth_Menu_Preview from "./Fifth_Menu_Preview";

const Preview_Screen = () => {
  const { formData, experiences, educationDetailsList, selectedLayout } =
    useContext(ResumeContext) || {};
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");

    // Add CSS styles to allow line-level page breaks and footer
    const style = document.createElement("style");
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
    emptyLine.style.height = "20px";
    emptyLine.innerHTML = "&nbsp;";
    element.appendChild(emptyLine);

    // Add footer element for page numbers
    const footer = document.createElement("div");
    footer.className = "pdf-footer";
    footer.innerHTML =
      '<span class="pageNumber"></span> / <span class="totalPages"></span>';
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

        // Add page numbers to each page
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(102, 102, 102); // #666 color
          const pageText = `Page ${i} of ${totalPages}`;
          const textWidth =
            (pdf.getStringUnitWidth(pageText) * 10) / pdf.internal.scaleFactor;
          const x = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
          pdf.text(pageText, x, pdf.internal.pageSize.getHeight() - 0.3);
        }

        return pdf;
      })
      .save()
      .then(() => {
        // Remove the temporary style, empty line, and footer after PDF generation
        document.head.removeChild(style);
        const footerElement = element.querySelector(".pdf-footer");
        if (footerElement) {
          element.removeChild(footerElement);
        }
        // Remove the empty line element
        const emptyLineElement = element.children[element.children.length - 2];
        if (emptyLineElement && emptyLineElement.innerHTML === "&nbsp;") {
          element.removeChild(emptyLineElement);
        }
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        document.head.removeChild(style);
        const footerElement = element.querySelector(".pdf-footer");
        if (footerElement) {
          element.removeChild(footerElement);
        }
        // Remove the empty line element on error
        const emptyLineElement = element.children[element.children.length - 2];
        if (emptyLineElement && emptyLineElement.innerHTML === "&nbsp;") {
          element.removeChild(emptyLineElement);
        }
      });
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
