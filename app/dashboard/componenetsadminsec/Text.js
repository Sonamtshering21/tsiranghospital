'use client'
import React, { useState } from "react";

const AdminAnnouncement = () => {
  const [headerText, setHeaderText] = useState(""); // Input value for header
  const [totalWorkers, setTotalWorkers] = useState(""); // Total workers input
  const [clinicalWorkers, setClinicalWorkers] = useState(""); // Clinical workers input
  const [nonClinicalWorkers, setNonClinicalWorkers] = useState(""); // Non-clinical workers input
  const [footerYear, setFooterYear] = useState("2024"); // Footer year input
  const [status, setStatus] = useState(""); // Submission status for all fields

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Collect all data in one object
    const body = {
      headerText,
      totalWorkers,
      clinicalWorkers,
      nonClinicalWorkers,
      footerYear
    };

    try {
      const response = await fetch("/api/homepagedetail", {
        method: "PUT",  // Use PUT instead of POST to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setStatus("Home page details updated successfully!");
      } else {
        setStatus("Failed to update home page details.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred while updating the details.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Admin Announcement</h1>

      {/* Form for all fields */}
      <form onSubmit={handleUpdate} style={{ marginTop: "20px" }}>
        {/* Header text input */}
        <textarea
          placeholder="Enter the header text for the homepage"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "80px",
            padding: "10px",
            margin: "20px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <br />

        {/* Staff details inputs */}
        <input
          type="number"
          placeholder="Enter total number of workers"
          value={totalWorkers}
          onChange={(e) => setTotalWorkers(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Enter number of clinical workers"
          value={clinicalWorkers}
          onChange={(e) => setClinicalWorkers(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Enter number of non-clinical workers"
          value={nonClinicalWorkers}
          onChange={(e) => setNonClinicalWorkers(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <br />

        {/* Footer year input */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          ©
          <input
            type="number"
            placeholder="Enter footer year (e.g., 2024)"
            value={footerYear}
            onChange={(e) => setFooterYear(e.target.value)}
            style={{
              width: "80px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          Tsirang Hospital. All rights reserved.
        </div>
        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Save All Details
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminAnnouncement;
