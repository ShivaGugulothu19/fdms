import { useState, useEffect } from "react";
import axios from "axios";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/faculty/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="faculty-container">
      <h2>Faculty List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((f) => (
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.professionalInfo.department}</td>
              <td>{f.professionalInfo.experienceYears} years</td>
              <td>
                <button onClick={() => handleDelete(f._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Faculty;
