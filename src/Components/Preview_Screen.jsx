import React, { useContext, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { ResumeContext } from "../scripts/ResumeContext";
import { createClient } from "@supabase/supabase-js";
import { Modal, Button } from "react-bootstrap";

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
    user,
    isAuthenticating,
    handleGoogleSignIn,
    checkAuthStatus,
    supabase,
  } = useContext(ResumeContext) || {};

  const [shouldAutoDownload, setShouldAutoDownload] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user && shouldAutoDownload) {
        downloadPDF();
        setShouldAutoDownload(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, shouldAutoDownload]);

  // Handle download with authentication
  const handleDownloadClick = async () => {
    // Check if user is already authenticated
    const currentUser = await checkAuthStatus();

    if (currentUser) {
      // User is authenticated, proceed with download
      downloadPDF();
    } else {
      // User is not authenticated, show alert
      setShowLoginAlert(true);
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 5000);
    }
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

  return (
    <div className="position-relative">
      {/* Login Alert */}
      {showLoginAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show mb-3"
          role="alert"
          style={{
            borderRadius: "8px",
            border: "1px solid #ffc107",
            backgroundColor: "#fff3cd",
            color: "#856404",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-exclamation-triangle-fill me-2"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <div className="flex-grow-1">
              <strong>Sign In Required</strong>
              <div className="mt-1">
                Please sign in to download your resume. Use the profile menu in
                the top right corner to log in.
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowLoginAlert(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      {/* Download PDF Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success btn-sm shadow-sm"
          onClick={handleDownloadClick}
          disabled={isAuthenticating}
          style={{
            borderRadius: "8px",
            fontWeight: "500",
            padding: "8px 16px",
            fontSize: "0.9rem",
            backgroundColor: isAuthenticating ? "#6c757d" : "#28a745",
            border: "none",
            transition: "all 0.2s ease",
            cursor: isAuthenticating ? "not-allowed" : "pointer",
          }}
          onMouseOver={(e) => {
            if (!isAuthenticating) {
              e.target.style.backgroundColor = "#218838";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseOut={(e) => {
            if (!isAuthenticating) {
              e.target.style.backgroundColor = "#28a745";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          {isAuthenticating ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Signing in...
            </>
          ) : (
            <>
              <i className="bi bi-download me-2"></i>
              Download PDF
            </>
          )}
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
