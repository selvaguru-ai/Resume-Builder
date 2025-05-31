import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";
import Menu from "./Menu";
import Preview_Screen from "./Preview_Screen";

const Main_Layout = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-primary">Resume Builder</h1>
            <p className="lead text-muted">
              Create a professional resume in minutes
            </p>
            <hr className="my-4" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Resume Details</h4>
              </div>
              <div className="card-body bg-white">
                <Menu />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Resume Preview</h4>
              </div>
              <div className="card-body bg-white">
                <Preview_Screen />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <button className="btn btn-success btn-lg px-5">
              <i className="bi bi-download me-2"></i> Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Layout;
