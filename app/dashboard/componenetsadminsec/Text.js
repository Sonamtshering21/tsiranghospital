'use client'
import React, { useState } from 'react';

const AdminAnnouncement = () => {
  const [headerText, setHeaderText] = useState(''); // Input value
  const [status, setStatus] = useState(''); // Submission status

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/saveHeader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headerText }),
      });

      if (response.ok) {
        setStatus('Header text saved successfully!');
      } else {
        setStatus('Failed to save header text.');
      }
    } catch (error) {
      setStatus('An error occurred while saving.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Admin Announcement</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <textarea
          placeholder="Enter the header text for the homepage"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '80px',
            padding: '10px',
            margin: '20px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminAnnouncement;
