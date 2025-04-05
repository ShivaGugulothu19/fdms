import React, { useState } from "react";

const FacultyForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, department });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Faculty Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button type="submit">Add Faculty</button>
    </form>
  );
};

export default FacultyForm;
