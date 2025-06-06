import React, { useContext, useEffect } from "react";
import { ResumeContext } from "../scripts/ResumeContext";
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
  const { user, setUser, supabase } = useContext(ResumeContext);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email || "Guest";

  return (
    <div className="d-flex align-items-center">
      <div className="dropdown">
        <button
          className="btn btn-outline-primary btn-sm dropdown-toggle d-flex align-items-center"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
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
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="profileDropdown"
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
          {user && (
            <>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const Main_Layout = () => {
  const { formData, user, setUser, supabase } = useContext(ResumeContext);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    // Check initial auth state
    const checkInitialAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    checkInitialAuth();

    return () => subscription.unsubscribe();
  }, [supabase, setUser]);
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
