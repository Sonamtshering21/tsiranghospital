'use client';  // Ensures client-side rendering
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '../componenetsadminsec/stylecomp/imagestyle.module.css';

const Picture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]); // Store all announcements
  const [page, setPage] = useState(1);  // Track the current page
  const [announcementsPerPage] = useState(5);  // Number of announcements to display per page
//delete
const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this announcement?')) {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete announcement');
      }

      // If successful, update the state to remove the deleted announcement
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
      alert('Announcement deleted successfully');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
};


  // Fetch all announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements'); // Replace with your actual API route
        const data = await response.json();

        // Sort announcements by upload date in descending order
        const sortedAnnouncements = data.announcements.sort((a, b) => 
          new Date(b.upload_date) - new Date(a.upload_date)
        );

        setAnnouncements(sortedAnnouncements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Calculate the announcements to display based on the current page
  const indexOfLastAnnouncement = page * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

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

  // Handle "See More" click
  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.imagepage}>
      <h1>Upload File and Announcement</h1>
      {/* Show Announcements in Table Format */}
      <div>
        <h2>All Announcements</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
  <thead>
    <tr>
      <th className="px-4 py-2 border-b border-gray-500">ID</th>
      <th className="px-4 py-2 border-b border-gray-500">Text</th>
      <th className="px-4 py-2 border-b border-gray-500">File</th>
      <th className="px-4 py-2 border-b border-gray-500">Delete</th>
    </tr>
    </thead>
    <tbody>
      {currentAnnouncements.map((announcement, index) => (
        <tr key={index}>
          <td className="px-4 py-2 border-b border-r border-gray-400">
            {index + 1 + (page - 1) * announcementsPerPage}
          </td>
          <td className="px-4 py-2 border-b border-r border-gray-400">
            {announcement.announcement_text || 'No Text'}
          </td>
          <td className="px-4 py-2 border-b border-gray-400">
            {announcement.file_url && (
              <div>
                {/\.(jpeg|jpg|png|gif|webp)$/i.test(announcement.file_url) ? (
                  <Image
                    src={announcement.file_url}
                    alt="Announcement file"
                    width={200}
                    height={200}
                    className="max-w-full h-auto mt-2"
                  />
                ) : (
                  <p>
                    <a href={announcement.file_url} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </p>
                )}
              </div>
            )}
          </td>
          <td className="px-4 py-2 border-b border-gray-400">
        <button
          onClick={() => handleDelete(announcement.id)}
          style={{
            padding: '5px 10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Delete
        </button>
      </td>
        </tr>
      ))}
    </tbody>
  </table>



        {/* "See More" Button */}
        {announcements.length > indexOfLastAnnouncement && (
          <button
            onClick={handleSeeMore}
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
            See More
          </button>
        )}
      </div>

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
          <h2>Uploaded File URL:</h2>
          <p>{fileUrl}</p>
        </div>
      )}
    </div>
  );
};

export default Picture;
