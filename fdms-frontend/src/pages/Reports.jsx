import React, { useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([
    { id: 1, title: "Annual Faculty Report 2024", date: "2024-04-04" },
    { id: 2, title: "Monthly Performance Report", date: "2024-03-31" },
  ]);

  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>{report.title}</strong> - {report.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
