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
    setUser,
    isAuthenticating,
    setIsAuthenticating,
    supabase,
  } = useContext(ResumeContext) || {};

  const [shouldAutoDownload, setShouldAutoDownload] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);

      if (event === "SIGNED_IN" && session?.user) {
        console.log("✅ User signed in:", session.user.email);

        const userData = {
          id: session.user.id,
          email: session.user.email,
          created_at: session.user.created_at,
          last_login: new Date().toISOString(),
        };

        const { error } = await supabase.from("users").upsert(userData, {
          onConflict: "id",
        });

        if (error) {
          console.error("❌ Upsert error:", error);
        } else {
          console.log("✅ Upsert success");
        }

        setUser(session.user); // update your app's user state
        setIsAuthenticating(false);

        if (shouldAutoDownload) {
          downloadPDF();
          setShouldAutoDownload(false);
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("🚪 User signed out");
        setUser(null);
        //clearResumeData(); // Optional: clean up on logout
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Listen for auth state changes for PDF download
  {
    /*useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      console.log("User ID:", session?.user?.id);
      console.log("Event:", event);
      console.log("Session user:", session?.user);
      console.log("shouldAutoDownload:", shouldAutoDownload);
      console.log("SUPABASE", supabase);

      if (event === "SIGNED_IN" && session?.user) {
        console.log("🔥 Inside SIGNED_IN block");
        const userData = {
          id: session.user.id,
          email: session.user.email,
          created_at: session.user.created_at,
          last_login: new Date().toISOString(),
        };
        try {
          // insert if not exist, else update last login

          const { data, error } = await supabase.from("users").upsert(
            {
              id: userData.id,
              email: userData.email,
              created_at: userData.created_at,
              last_login: userData.last_login,
            },
            {
              onConflict: "id", //This tells supabase to update if ID already exists
            },
          );
        } catch (error) {
          console.error("Upsert error:", error.message, error.details);
          console.log("Upsert response:", data);
          // console.error("Error inserting/updating user:", error.message);
        }
        setIsAuthenticating(false);
        setShouldAutoDownload(false); // Reset the flag
        // Auto-download PDF after successful sign-in
        setTimeout(() => {
          downloadPDF();
        }, 1000);
      }
    });

    return () => subscription.unsubscribe();
  }, [shouldAutoDownload, supabase]); */
  }

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    console.log("handle google signin");
    setIsAuthenticating(true);
    console.log("handle google signin");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    } catch (error) {
      console.error("Google Sign-In error:", error);
      alert(
        `Failed to sign in with Google: ${error.message}. Please try again.`,
      );
      return false;
    } finally {
      setIsAuthenticating(false);
      setShowLoginModal(false);
    }
  };

  // Check current authentication status
  const checkAuthStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  };

  // Handle download with authentication
  const handleDownloadClick = async () => {
    // Check if user is already authenticated
    const currentUser = await checkAuthStatus();

    if (currentUser) {
      // User is authenticated, proceed with download
      downloadPDF();
    } else {
      // User is not authenticated, show login modal
      setShouldAutoDownload(true);
      setShowLoginModal(true);
    }
  };
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
      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-3">
            <i
              className="bi bi-lock-fill"
              style={{ fontSize: "2rem", color: "#6c757d" }}
            ></i>
          </div>
          <h5 className="mb-3">Please sign in to download your resume</h5>
          <p className="text-muted mb-4">
            We require authentication to ensure secure access to your resume.
          </p>
          <Button
            variant="primary"
            onClick={handleGoogleSignIn}
            disabled={isAuthenticating}
            className="d-flex align-items-center justify-content-center mx-auto"
            style={{
              backgroundColor: "#4285f4",
              borderColor: "#4285f4",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "500",
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
                <svg
                  className="me-2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </Modal.Body>
      </Modal>

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
