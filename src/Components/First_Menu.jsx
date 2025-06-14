import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import { ResumeContext } from "../scripts/ResumeContext";

const First_Menu = () => {
  const { formData, setformData } = useContext(ResumeContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      introduction: {
        ...formData.introduction,
        [name]: value,
      },
    });
  };

  const handlePhoneChange = (phone) => {
    setformData({
      ...formData,
      introduction: {
        ...formData.introduction,
        phone: phone,
      },
    });
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                className="form-control"
                value={formData.introduction.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="e-mail"
                className="form-control"
                value={formData.introduction.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {" "}
              {/* every row needs a col */}
              <PhoneInput
                country="us"
                value={formData.introduction.phone}
                onChange={handlePhoneChange}
                /* Don’t use plain `className`; instead use the library’s hooks */
                containerClass="w-100" // root div spans full width
                inputClass="form-control" // keep Bootstrap input styles
                buttonClass="btn btn-outline-secondary" // optional: style flag button
                /* Pass standard input attributes via `inputProps` */
                inputProps={{
                  name: "phone",
                  id: "phone",
                  placeholder: "Phone number",
                  required: true,
                  autoComplete: "tel",
                }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                placeholder="LinkedIn"
                className="form-control"
                value={formData.introduction.linkedin}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default First_Menu;
