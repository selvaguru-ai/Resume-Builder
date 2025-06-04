import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";
import Menu from "./Menu";
import Preview_Screen from "./Preview_Screen";

const Main_Layout = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <header className="bg-primary text-white py-4 shadow-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4 fw-bold mb-0 text-center">
                <i className="bi bi-file-earmark-person me-3"></i>
                Resume Builder
              </h1>
              <p className="lead text-center mb-0 mt-2">
                Create your professional resume in minutes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container-fluid py-4">
        <div className="row g-4 h-100">
          {/* Left Panel - Form Section */}
          <div className="col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-header bg-dark text-white py-3">
                <h5 className="card-title mb-0">
                  <i className="bi bi-pencil-square me-2"></i>
                  Resume Information
                </h5>
              </div>
              <div
                className="card-body p-4 overflow-auto"
                style={{ maxHeight: "70vh" }}
              >
                <Menu />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview Section */}
          <div className="col-lg-5 col-xl-7">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-header bg-dark text-white py-3">
                <h5 className="card-title mb-0">
                  <i className="bi bi-eye me-2"></i>
                  Resume Preview
                </h5>
              </div>
              <div
                className="card-body p-4 overflow-auto"
                style={{ maxHeight: "70vh" }}
              >
                <Preview_Screen />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">
                &copy; 2024 Resume Builder. Built with React & Bootstrap
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main_Layout;
