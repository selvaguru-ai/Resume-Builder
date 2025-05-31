import React from "react";

import First_Menu_Preview from "./First_Menu_Preview";
import Second_Menu_Preview from "./Second_Menu_Preview";
import Third_Menu_Preview from "./Third_Menu_Preview";

const Preview_Screen = () => {
  return (
    <div
      id="resume-preview"
      className="resume-preview p-3 border bg-light text-dark text-center"
    >
      <First_Menu_Preview />
      <Second_Menu_Preview />
      <Third_Menu_Preview />
    </div>
  );
};

export default Preview_Screen;
