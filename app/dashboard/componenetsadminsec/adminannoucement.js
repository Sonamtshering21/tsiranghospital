'use client';  // Ensures client-side rendering

import React, { useState } from 'react';
import styles from '../componenetsadminsec/stylecomp/imagestyle.module.css'

const Picture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert('No file selected');
    }
  };

  // Drag-and-drop handlers
  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert('No file dropped');
    }
  };

  // Handle announcement input change
  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  // Remove file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileUrl(null);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedFileUrl = null;

      // Only upload if a file is selected
      if (selectedFile) {
        const fileFormData = new FormData();
        fileFormData.append('file', selectedFile);

        const fileResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileFormData,
        });

        if (!fileResponse.ok) {
          throw new Error('File upload failed');
        }

        const fileData = await fileResponse.json();
        uploadedFileUrl = fileData.url; // Get the uploaded file URL
      }

      // Create announcement payload
      const announcementPayload = {
        announcement: announcement || null, // Use null if no announcement
        fileUrl: uploadedFileUrl, // Use null if no file was uploaded
      };

      // Send to announcements API
      const announcementResponse = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementPayload),
      });

      const announcementData = await announcementResponse.json();

      if (!announcementResponse.ok) {
        throw new Error(announcementData.error || 'Failed to save announcement');
      }

      // Success
      alert('Announcement and file uploaded successfully!');
      setFileUrl(uploadedFileUrl); // Set the file URL (if uploaded)
      setAnnouncement(''); // Reset announcement text
      setSelectedFile(null); // Reset file selection
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.imagepage}>
      <h1>Upload File and Announcement</h1>

      {/* Announcement Input */}
      <div>
        <label htmlFor="announcement" style={{ display: 'block', marginBottom: '10px' }}>
          Enter Announcement:
        </label>
        <textarea
          id="announcement"
          value={announcement}
          onChange={handleAnnouncementChange}
          placeholder="Write your announcement here"
          rows="4"
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '2px solid #0070f3', borderRadius: '5px' }}
        />
      </div>

      {/* Drag-and-Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #0070f3',
          padding: '20px',
          textAlign: 'center',
          marginTop: '20px',
          backgroundColor: dragging ? '#f0f8ff' : 'transparent',
        }}
      >
        <p>Drag and drop a file here</p>
      </div>

      {/* Upload File Button */}
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginTop: '20px', padding: '10px' }}
      />

      {/* Remove File Button */}
      {selectedFile && (
        <div>
          <h2>Selected File:</h2>
          <p>{selectedFile.name}</p>
          <button
            type="button"
            onClick={handleRemoveFile}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Remove File
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || (!selectedFile && !announcement)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Submitting...' : 'Submit Announcement'}
      </button>

      {/* Display uploaded file URL */}
      {fileUrl && (
        <div>
          <h2>Uploaded File:</h2>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Picture;