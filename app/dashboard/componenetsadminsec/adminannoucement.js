'use client';  // Ensures client-side rendering

import React, { useState } from 'react';
import styles from '../componenetsadminsec/stylecomp/imagestyle.module.css'

const Picture = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [dragging, setDragging] = useState(false); // To track if user is dragging a file
  const [loading, setLoading] = useState(false); // To show loading state
  const [fileUrl, setFileUrl] = useState(null); // To display uploaded file URL
  const [announcement, setAnnouncement] = useState(''); // State for announcement text

  // Handle file selection from input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the file object for uploading
    } else {
      alert('No file selected');
    }
  };

  // Handle drag start
  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  // Handle drop of file
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file); // Save the file object for uploading
    } else {
      alert('No file dropped');
    }
  };

  // Handle form submission (upload the file and announcement)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile && announcement) {
      setLoading(true); // Start loading state
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('announcement', announcement); // Include announcement in the upload form

      try {
        // First, upload the file and get the URL
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const data = await response.json();
        const uploadedFileUrl = data.url; // URL returned from server after upload
        
        const announcementData = {
          announcement: announcement,
          fileUrl: uploadedFileUrl, // Add the uploaded file URL here
        };


        // Send announcement and URL to your API for storing in the database
        const announcementResponse = await fetch('/api/announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(announcementData),
        });
        const response2 = await announcementResponse.json();  // Parse the response

        if (announcementResponse.ok) {
          throw new Error(response2.error || 'Failed to save announcement');
        }
        else{
        alert('File and announcement uploaded successfully!');
        setFileUrl(uploadedFileUrl); // Set the uploaded file URL to display it
        setAnnouncement(''); // Reset the announcement text
        setSelectedFile(null); // Reset the file selection
        }
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        setLoading(false); // End loading state
      }
    } else {
      alert('Please provide both an announcement and a file');
    }
  };

  // Remove the selected file
  const handleRemoveFile = () => {
    setSelectedFile(null); // Reset the selected file
    setFileUrl(null); // Reset the file URL
  };

  // Handle announcement input change
  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value); // Update the announcement text
  };

  return (
    <div className={styles.imagepage}>
      <h1>Upload File and Announcement</h1>
      
      {/* Announcement Input */}
      <div>
        <label htmlFor="announcement" style={{ display: 'block', marginBottom: '10px' }}>Enter Announcement:</label>
        <textarea
          id="announcement"
          value={announcement}
          onChange={handleAnnouncementChange}
          placeholder="Write your announcement here"
          rows="4"
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '2px solid #0070f3',borderRadius: '5px'}}
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
        style={{ marginTop: '20px', padding: '10px'}}
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
              cursor: 'pointer'
            }}
          >
            Remove File
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button 
        onClick={handleSubmit} 
        disabled={loading || !selectedFile || !announcement}
        style={{
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer', 
          borderRadius: '5px'
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
