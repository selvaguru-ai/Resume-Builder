import React, { useContext, useEffect } from "react";
import { ResumeContext } from "../scripts/ResumeContext";
import { Modal, Button } from "react-bootstrap";
import Menu from "./Menu";
import Preview_Screen from "./Preview_Screen";

const LayoutSelector = () => {
  const { selectedLayout, setSelectedLayout } = useContext(ResumeContext);

  const layouts = [
    { id: "classic", name: "Classic", icon: "📄" },
    { id: "modern", name: "Modern", icon: "🎨" },
    { id: "minimal", name: "Minimal", icon: "✨" },
    { id: "professional", name: "Professional", icon: "💼" },
  ];

  return (
    <div className="d-flex align-items-center">
      <select
        className="form-select form-select-sm"
        value={selectedLayout}
        onChange={(e) => setSelectedLayout(e.target.value)}
        style={{
          backgroundColor: "#ffffff",
          color: "#2c3e50",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          fontSize: "0.85rem",
          minWidth: "140px",
        }}
      >
        {layouts.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.icon} {layout.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProfileSection = () => {
  const {
    user,
    isAuthenticating,
    handleGoogleSignIn,
    handleLogout,
    clearResumeData,
  } = useContext(ResumeContext);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const handleLogoutWithCleanup = async () => {
    console.log("Logout button is pressed");
    const success = await handleLogout();
    console.log("Success: ", success);
    if (success) {
      clearResumeData();
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle Google Sign-In with modal close
  const handleGoogleSignInWithModal = async () => {
    const success = await handleGoogleSignIn();
    if (success) {
      setShowLoginModal(false);
    }
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
    setShowLoginModal(true);
  };

  const displayName = user?.user_metadata?.full_name || user?.email || "Guest";

  return (
    <>
      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-3">
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "2rem", color: "#6c757d" }}
            ></i>
          </div>
          <h5 className="mb-3">Welcome to Resume Builder</h5>
          <p className="text-muted mb-4">
            Sign in to access all features and save your progress.
          </p>
          <Button
            variant="primary"
            onClick={handleGoogleSignInWithModal}
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

      <div className="d-flex align-items-center position-relative">
        <div className="dropdown">
          <button
            className="btn btn-outline-primary btn-sm dropdown-toggle d-flex align-items-center"
            type="button"
            onClick={toggleDropdown}
            style={{
              borderColor: "#3498db",
              color: "#3498db",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "1.0rem",
              fontWeight: "500",
            }}
          >
            <i className="bi bi-person-circle me-2"></i>
            {displayName}
          </button>
          {isDropdownOpen && (
            <ul
              className="dropdown-menu dropdown-menu-end show position-absolute"
              style={{
                top: "100%",
                right: "0",
                zIndex: 1000,
                minWidth: "200px",
                marginTop: "5px",
              }}
            >
              <li>
                <span className="dropdown-item-text text-muted small">
                  {user ? "Signed in as:" : "Not signed in"}
                </span>
              </li>
              <li>
                <span className="dropdown-item-text fw-semibold">
                  {displayName}
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {user ? (
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogoutWithCleanup}
                    style={{
                      border: "none",
                      background: "none",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className="dropdown-item text-primary"
                    onClick={handleLoginClick}
                    style={{
                      border: "none",
                      background: "none",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
        {isDropdownOpen && (
          <div
            className="position-fixed"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </>
  );
};

const Main_Layout = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header Section */}
      <header
        className="text-dark py-3 shadow-sm"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center flex-grow-1">
                  <h1
                    className="h3 fw-bold mb-0"
                    style={{ color: "#2c3e50", letterSpacing: "-0.5px" }}
                  >
                    <i
                      className="bi bi-file-earmark-person me-2"
                      style={{ color: "#3498db" }}
                    ></i>
                    Resume Builder
                  </h1>
                  <p
                    className="mb-0 mt-2"
                    style={{
                      color: "#6c757d",
                      fontSize: "0.95rem",
                      fontWeight: "300",
                    }}
                  >
                    Create your professional resume in minutes
                  </p>
                </div>
                <div className="ms-3">
                  <ProfileSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main
        className="container-fluid py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="row g-4 h-100 justify-content-center">
          {/* Left Panel - Form Section */}
          <div className="col-lg-6 col-xl-5">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ borderRadius: "12px", backgroundColor: "#ffffff" }}
            >
              <div
                className="card-header text-white py-4"
                style={{
                  backgroundColor: "#2c3e50",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <h5
                  className="card-title mb-0 fw-semibold"
                  style={{ fontSize: "1.1rem" }}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Resume Information
                </h5>
              </div>
              <div
                className="card-body p-4 overflow-auto"
                style={{ maxHeight: "70vh", backgroundColor: "#ffffff" }}
              >
                <Menu />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview Section */}
          <div className="col-lg-5 col-xl-7">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ borderRadius: "12px", backgroundColor: "#ffffff" }}
            >
              <div
                className="card-header text-white py-4"
                style={{
                  backgroundColor: "#2c3e50",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    className="card-title mb-0 fw-semibold"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <i className="bi bi-eye me-2"></i>
                    Resume Preview
                  </h5>
                  <LayoutSelector />
                </div>
              </div>
              <div
                className="card-body p-4 overflow-auto"
                style={{ maxHeight: "70vh", backgroundColor: "#ffffff" }}
              >
                <Preview_Screen />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-dark py-4 mt-auto"
        style={{ backgroundColor: "#f8f9fa", borderTop: "2px solid #e9ecef" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p
                className="mb-0"
                style={{
                  color: "#6c757d",
                  fontSize: "0.95rem",
                  fontWeight: "300",
                }}
              >
                &copy; 2024 Resume Builder. Developed by Selvaguru
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main_Layout;
