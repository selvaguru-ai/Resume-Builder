import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import { ResumeContext } from "../scripts/ResumeContext";

const Fifth_Menu = () => {
  const { skillList, setSkillList } = useContext(ResumeContext);
  const [skill, setSkill] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Tech stack suggestions database
  const techStackSuggestions = [
    // Programming Languages
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "TypeScript",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Scala",
    "R",
    "MATLAB",
    "Perl",
    "Dart",
    "Objective-C",
    "VB.NET",
    "F#",

    // Frontend Technologies
    "React",
    "Angular",
    "Vue.js",
    "HTML5",
    "CSS3",
    "SASS",
    "LESS",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",
    "Ant Design",
    "Chakra UI",
    "jQuery",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Svelte",

    // Backend Technologies
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "ASP.NET",
    "Laravel",
    "Ruby on Rails",
    "Symfony",
    "CodeIgniter",
    "Nest.js",
    "Koa.js",
    "Hapi.js",
    "Gin",
    "Echo",

    // Databases
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
    "Redis",
    "Cassandra",
    "DynamoDB",
    "Oracle",
    "SQL Server",
    "MariaDB",
    "CouchDB",
    "Neo4j",
    "InfluxDB",
    "Firebase Firestore",
    "Supabase",

    // Cloud & DevOps
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitLab CI",
    "GitHub Actions",
    "Terraform",
    "Ansible",
    "Chef",
    "Puppet",
    "Vagrant",
    "Nginx",
    "Apache",
    "Linux",
    "Ubuntu",

    // Mobile Development
    "React Native",
    "Flutter",
    "Ionic",
    "Xamarin",
    "Cordova",
    "PhoneGap",
    "Android Studio",
    "Xcode",

    // Tools & Others
    "Git",
    "SVN",
    "Webpack",
    "Vite",
    "Parcel",
    "Gulp",
    "Grunt",
    "npm",
    "Yarn",
    "pnpm",
    "ESLint",
    "Prettier",
    "Jest",
    "Cypress",
    "Selenium",
    "Postman",
    "Insomnia",
    "Figma",
    "Adobe XD",
    "Sketch",
    "InVision",
    "Zeplin",
    "Jira",
    "Trello",
    "Slack",
    "Discord",

    // Data Science & AI
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Jupyter",
    "Apache Spark",
    "Hadoop",
    "Tableau",
    "Power BI",
    "D3.js",
    "Chart.js",

    // Testing
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
    "TDD",
    "BDD",
    "Mocha",
    "Chai",
    "Jasmine",
    "Karma",
    "Protractor",
    "TestCafe",
    "Playwright",
  ];

  // Get suggestions based on input
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : techStackSuggestions.filter(
          (tech) => tech.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };

  // When suggestion is fetched, update suggestions
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // When suggestions are cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Get suggestion value
  const getSuggestionValue = (suggestion) => suggestion;

  // Render suggestion
  const renderSuggestion = (suggestion) => (
    <div style={{ padding: "8px 12px", cursor: "pointer" }}>{suggestion}</div>
  );
  const add = () => {
    if (skill.trim() === "") {
      alert("Please enter a skill");
      return;
    }
    if (skillList.includes(skill.trim())) {
      alert("Skill already added");
      return;
    }
    const updatedList = [...skillList, skill.trim()];
    setSkillList(updatedList);
    setSkill(""); //clear the input
    console.log(updatedList);
  };

  const onChange = (event, { newValue }) => {
    setSkill(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    if (!skillList.includes(suggestion)) {
      const updatedList = [...skillList, suggestion];
      setSkillList(updatedList);
      setSkill("");
    } else {
      alert("Skill already added");
    }
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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={{
              placeholder: "Type a skill (e.g., React, Python, AWS)...",
              value: skill,
              onChange: onChange,
              className: "form-control",
              style: {
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                padding: "12px 16px",
                fontSize: "0.95rem",
              },
            }}
            theme={{
              container: {
                position: "relative",
                width: "100%",
              },
              suggestionsContainer: {
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #e9ecef",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
              },
              suggestionsList: {
                margin: 0,
                padding: 0,
                listStyleType: "none",
              },
              suggestion: {
                borderBottom: "1px solid #f8f9fa",
              },
              suggestionHighlighted: {
                backgroundColor: "#f8f9fa",
              },
            }}
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
