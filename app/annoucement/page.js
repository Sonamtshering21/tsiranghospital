'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Page = () => {
  const [announcements, setAnnouncements] = useState([]); // State to store announcements
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [visibleAnnouncements, setVisibleAnnouncements] = useState([]); // Announcements to show initially
  const [nextIndex, setNextIndex] = useState(4); // Index for fetching more announcements

  // Fetch announcements data on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements'); // Replace with your actual API route
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();
        const sortedAnnouncements = data.announcements.sort((a, b) => 
          new Date(b.upload_date) - new Date(a.upload_date)
        ); // Sort announcements by upload_date in descending order

        setAnnouncements(sortedAnnouncements); // Set all announcements in sorted order
        setVisibleAnnouncements(sortedAnnouncements.slice(0, 4)); // Show the first 4 announcements
      } catch (err) {
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAnnouncements();
  }, []);

  const loadMoreAnnouncements = () => {
    // Load the next 4 announcements from the sorted array
    const nextAnnouncements = announcements.slice(nextIndex, nextIndex + 4);
    setVisibleAnnouncements((prev) => [...prev, ...nextAnnouncements]);
    setNextIndex(nextIndex + 4); // Update the index for the next batch
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>News Section</h1>

        {/* Loading State */}
        {loading && <p>Loading announcements...</p>}

        {/* Error State */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Announcements */}
        {!loading && !error && announcements.length === 0 && (
          <p>No announcements available at the moment.</p>
        )}

        {!loading && !error && visibleAnnouncements.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {visibleAnnouncements.map((announcement, index) => (
              <li
                key={index} // Use the index as the key for simplicity (if IDs aren't unique)
                style={{
                  marginBottom: '20px',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {/* Render Creation Date at the top */}
                <div style={{ marginBottom: '10px', textAlign: 'right', fontSize: '0.9em', color: '#555' }}>
                  <p>
                    <strong>Created On:</strong> 
                    {new Date(announcement.upload_date).toLocaleDateString()}
                  </p>
                </div>

                {/* Render Announcement Text */}
                <div style={{ marginBottom: '10px' }}>
                  {announcement.announcement_text && (
                    <p>{announcement.announcement_text}</p>
                  )}
                </div>

                {/* Render File/Image Directly */}
                {announcement.file_url && (
                <div>
                  {/\.(jpeg|jpg|png|gif|webp)$/i.test(announcement.file_url) ? (
                    // If the file is an image
                    <Image
                      src={announcement.file_url}
                      alt="Announcement file"
                      width={500} // You can adjust this width according to your layout
                      height={300} // Adjust this height as well
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        marginTop: '10px',
                      }}
                    />
                  ) : (
                    // Handle non-image files (e.g., PDF, video, etc.)
                    <p>
                      <a href={announcement.file_url} target="_blank" rel="noopener noreferrer">
                        View File
                      </a>
                    </p>
                  )}
                </div>
              )}

              </li>
            ))}
          </ul>
        )}

        {/* See More Button */}
        {!loading && !error && announcements.length > visibleAnnouncements.length && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={loadMoreAnnouncements}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              See More
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Page;
