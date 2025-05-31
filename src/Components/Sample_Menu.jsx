import React, { useState, useEffect } from "react";

const Sample_Menu = ({ taskList, setTaskList }) => {
  console.log("tasklist on load: ", taskList);
  const [taskText, setTaskText] = useState(""); //Current text
  const [editingIndex, setEditingIndex] = useState(null); //null = not editing

  const handleChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddorUpdate = () => {
    if (taskText.trim() == "") return;

    if (editingIndex !== null) {
      const updated = [...taskList];
      updated[editingIndex] = taskText;
      setTaskList(updated);
      setEditingIndex(null);
    } else {
      setTaskList([...taskList, taskText]);
    }
    setTaskText(""); //Clear after the input editing
  };

  const handleEdit = (index) => {
    setTaskText(taskList[index]); //Load the task to input box
    setEditingIndex(index); //Set the Index to know what we are editing
  };

  return (
    <div className="container">
      <div className="row">
        <input
          type="text"
          value={taskText}
          onChange={handleChange}
          placeholder="Enter"
        />

        <button onClick={handleAddorUpdate}>
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="row">
        <ul>
          {taskList.map((task, index) => (
            <li key={index} className="d-flex align-items-center mb-2">
              <div className="flex-grow-1">{task}</div>
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sample_Menu;
