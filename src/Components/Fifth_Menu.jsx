import React, { useState } from "react";

const Fifth_Menu = ({ skillList, setSkillList }) => {
  const [skill, setSkill] = useState();
  const add = () => {
    if (skill.trim() === "") {
      alert("Please enter a skill");
      return;
    }
    const updatedList = [...skillList, skill];
    setSkillList(updatedList);
    setSkill(""); //clear the input
    console.log(updatedList);
  };
  const handleChange = (e) => {
    setSkill(e.target.value);
  };
  const removeSkill = (indexToRemove) => {
    const updatedList = skillList.filter((_, index) => index !== indexToRemove);
    setSkillList(updatedList);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <label htmlFor="Skillset" className="form-label">
            Skill set
          </label>
          <input
            type="text"
            name="skill"
            value={skill}
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={add}>
            Add
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 d-flex flex-wrap gap-2">
          {skillList.map((item, index) => (
            <div
              key={index}
              className="px-3 py-1 d-flex align-items-center rounded-pill"
              style={{
                backgroundColor: "#6c757d", // Bootstrap grey (secondary)
                color: "white",
                maxWidth: "100%",
              }}
            >
              <span className="me-2">{item}</span>
              <button
                type="button"
                className="btn-close btn-close-white btn-close-sm"
                aria-label="Remove"
                onClick={() => removeSkill(index)}
                style={{ filter: "invert(1)" }}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fifth_Menu;
