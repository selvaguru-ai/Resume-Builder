import React, { useState, useEffect } from "react";

const Fourth_Menu = ({ educationDetailsList, setEducationDetailsList }) => {
  const [educationDetails, setEducationDetails] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    console.log("educationDetails updated:", educationDetailsList);
  }, [educationDetailsList]);

  const handleChange = (e) => {
    //setEducationDetails(e.target.value);
    const { name, value } = e.target;
    setEducationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Adds the data to the education details list and populates the table
  const addData = () => {
    console.log("Clicked");
    const { college, degree, study, month } = educationDetails;
    if (college && degree && study && month) {
      if (editingIndex !== null) {
        //Update existing records
        const updated_list = [...educationDetailsList];
        updated_list[editingIndex] = educationDetails;
        setEducationDetailsList(updated_list);
        setEditingIndex(null); //reset editing mode
      } else {
        // Add new record
        setEducationDetailsList([...educationDetailsList, educationDetails]);
      }
      // Clear the form
      setEducationDetails({});
    } else {
      alert("Please fill all the data before submit");
    }
  };

  // To perform edit operations on the list
  const editData = (index) => {
    setEducationDetails(educationDetailsList[index]);
    setEditingIndex(index);
  };

  // To perform delete operation from the list
  const remove = (index) => {
    const updated_list = [...educationDetailsList];
    updated_list.splice(index, 1);
    setEducationDetailsList(updated_list);
  };
  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <input
            type="text"
            name="college"
            value={educationDetails.college || ""}
            onChange={handleChange}
            placeholder="College"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <select
            name="degree"
            value={educationDetails.degree || ""}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">select</option>
            <option value="High School">High School</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="Doctors">Doctorate</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <input
            type="text"
            name="study"
            value={educationDetails.study || ""}
            onChange={handleChange}
            className="form-control"
            placeholder="Field of Study"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="Graduation Date" className="form-label">
            Graduation/Expected Date of Graduation
          </label>
        </div>
        <div className="col-6">
          <input
            type="month"
            name="month"
            value={educationDetails.month || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-3">
          <button className="btn btn-primary form-control" onClick={addData}>
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          {educationDetailsList.length > 0 && (
            <table className="table table-striped table-hover table-bordered align-middle text-center">
              <thead className="table-dark fs-6">
                <tr>
                  <th>
                    <small>College</small>
                  </th>
                  <th>
                    <small>Degree</small>
                  </th>
                  <th>
                    <small>Field of Study</small>
                  </th>
                  <th>
                    <small>Graduation Date</small>
                  </th>
                  <th>
                    <small>Actions</small>
                  </th>
                </tr>
              </thead>
              <tbody className="fs-50">
                {educationDetailsList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <small>{item.college}</small>
                    </td>
                    <td>
                      <small>{item.degree}</small>
                    </td>
                    <td>
                      <small>{item.study}</small>
                    </td>
                    <td>
                      <small>{item.month}</small>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editData(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fourth_Menu;
