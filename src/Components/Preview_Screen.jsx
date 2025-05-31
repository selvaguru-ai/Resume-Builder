import React from "react";

import First_Menu_Preview from "./First_Menu_Preview";
import Second_Menu_Preview from "./Second_Menu_Preview";
import Third_Menu_Preview from "./Third_Menu_Preview";
import Fourth_Menu_Preview from "./Fourth_Menu_Preview";

const Preview_Screen = () => {
  return (
    <div
      id="resume-preview"
      className="resume-preview p-4 shadow-sm bg-white text-dark"
      style={{
        minHeight: "700px",
        maxHeight: "800px",
        overflowY: "auto",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
      }}
    >
      <First_Menu_Preview />
      <Second_Menu_Preview />
      <Third_Menu_Preview />
      <Fourth_Menu_Preview />
    </div>
  );
};

export default Preview_Screen;
