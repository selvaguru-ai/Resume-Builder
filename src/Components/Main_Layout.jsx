import React, { useContext } from "react";
import { ResumeContext } from "../scripts/ResumeContext";
import Menu from "./Menu";
import Preview_Screen from "./Preview_Screen";

const Main_Layout = () => {
  const { formData } = useContext(ResumeContext);
  return (
    <div className="container">
      <div className="row">
        <p>Heading</p>
      </div>
      <div className="d-flex align-items-start">
        <div className="bg-dark text-white p-3 me-3" style={{ width: "40%" }}>
          <Menu />
        </div>
        {/* Arrow Button */}
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <button
            className="beating-arrow"
            onClick={() => {
              // Call a function here to collect and log the form data
              console.log("Full Name: ", formData.introduction.fullName);
              console.log("Profile Summary: ", formData.profileSummary);
              // You can also lift state up from Menu if needed
            }}
          >
            ➡
          </button>
        </div>
        <div className="bg-dark text-white p-3 ms-3" style={{ width: "60%" }}>
          <Preview_Screen />
        </div>
      </div>
    </div>
  );
};

export default Main_Layout;
