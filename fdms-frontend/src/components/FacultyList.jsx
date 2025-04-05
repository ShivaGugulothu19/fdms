import React from "react";
import "./FacultyList.css";

const FacultyList = () => {
  const faculty = [
    { id: 1, name: "John Doe", department: "CS" },
    { id: 2, name: "Jane Smith", department: "Math" },
  ];

  return (
    <div className="faculty-list">
      <h2>Faculty Members</h2>
      <ul>
        {faculty.map((f) => (
          <li key={f.id}>
            {f.name} - {f.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyList;
