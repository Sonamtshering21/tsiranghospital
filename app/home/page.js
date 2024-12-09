'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import styles from '../home/home.module.css';
import Gallery from '../../components/Gallery.jsx';
import Link from 'next/link';
import Header from '@/components/Header'; 
function useIntersection(ref, options) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref.current; // Capture the current value of ref
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [ref, options]);

  return isVisible;
}


function AnimatedNumber({ targetNumber, duration }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isVisible = useIntersection(ref, { threshold: 0.1 });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Progress goes from 0 to 1
        const updatedNumber = Math.floor(progress * targetNumber);

        setCurrentNumber(updatedNumber);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setHasAnimated(true); // Mark animation as completed
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, targetNumber, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {hasAnimated ? targetNumber : currentNumber}
    </span>
  );
}

const Page = () => {
  const images = ['/a1.jpg', '/a2.jpg', '/a3.jpg'];
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homePageDetails, setHomePageDetails] = useState(null); // To store fetched data

  const [showMore, setShowMore] = useState(false);

  const services = [
    { title: 'OUT PATIENT DEPARTMENT SERVICES', image: '/i1.png', link: '/services/opd' },
    { title: 'INPATIENT DEPARTMENT SERVICE', image: '/i4.png', link: '/services/emergency' },
    { title: 'EMERGENCY SERVICES', image: '/i3.png', link: '/services/emergency' },
    { title: 'MEDICAL CERTIFICATE SERVICE', image: '/i2.png', link: '/services/medicalcertificate' },
    { title: 'TRADITIONAL MEDICINE SERVICE', image: '/t1.png', link: '/services/traditionalmedicineservice' },
    { title: 'OT SERVICE', image: '/ot.png', link: '/services/otservice' },
    { title: 'RADIODIAGNOSTIC SERVICES', image: '/ds.png', link: '/services/radiodiagnosticservice' },
    { title: 'LABORATORY SERVICES', image: '/ls.png', link: '/services/laboratoryservice' },
  ];

  const handleToggle = () => {
    setShowMore(!showMore);
  };
  // Fetch home page details
  useEffect(() => {
    const fetchHomePageDetails = async () => {
      try {
        const response = await fetch('/api/homepagedetail');
        if (!response.ok) {
          throw new Error('Failed to fetch home page details');
        }
  
        const data = await response.json();
        setHomePageDetails(data.details[0]);
    
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHomePageDetails();
  }, []); // This runs once on mount
  

  // Fetch latest announcement
  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const response = await fetch('/api/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();
        const sortedAnnouncements = data.announcements.sort((a, b) =>
          new Date(b.upload_date) - new Date(a.upload_date)
        );

        setLatestAnnouncement(sortedAnnouncements[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnnouncement();
  }, []); // This runs once on mount
  if (!homePageDetails) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className={styles.marqueecontainer}>
        <p className={styles.marquee_text}>
          <Image src="/speaker.png" alt='img' width={33} height={33} />
          Announcements: 
          <marquee direction="left">
            <Image src='/newc.png' alt='img' width={33} height={33} className={styles.image_fade} /> 
            {homePageDetails.headertext}
            <Image src='/newc.png' alt='img' width={33} height={33} className={styles.image_fade} />
          </marquee>
        </p>
      </div>

      <div className={styles.homepage}>
        <h1>Tsirang Hospital</h1>
        <p><span>Accessible</span><span>Equitable</span> <span>Reliable </span></p>
        <p>Health Services</p>
      </div>

      <div className={styles.ourvalue}>
        <h1>Vision</h1>
        <p>A Dzongkhag with the best health infrastructures and services</p>
        <h1>Mission</h1>
        <p>To provide quality primary, secondary and tertiary health care services in both traditional and modern medicine</p>
        <p>To ensure accessible, equitable and reliable health services</p>
        <p>To prevent and control diseases</p>
        <p>To rehabilitate and promote healthy living</p>
      </div>

      <div className={styles.service}>
        <h1>Services</h1>
        <div className={styles.serviceGrid}>
          {services.slice(0, 4).map((service, index) => (
            <Link href={service.link} key={index}>
              <p>
                <Image src={service.image} alt="image" width={50} height={50} />
                <span>{index + 1}. {service.title}</span>
              </p>
            </Link>
          ))}
          {showMore &&
            services.slice(4).map((service, index) => (
              <Link href={service.link} key={index + 4}>
                <p>
                  <Image src={service.image} alt="image" width={50} height={50} />
                  <span>{index + 5}. {service.title}</span>
                </p>
              </Link>
            ))
          }
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleToggle}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showMore ? 'Hide' : 'See More'}
          </button>
        </div>
      </div>
   


      <div className={styles.staff}>
  <p>
    <span className={styles.number}>
      {/* Use the fetched total_staff number as the target for the animation */}
      <AnimatedNumber targetNumber={169 || 0} duration={1000} />
    </span>{" "}
    Total Staff
  </p>
  <p>
    <span className={styles.number}>
      <AnimatedNumber targetNumber={69 || 0} duration={1000} />
    </span>{" "}
    Clinical
  </p>
  <p>
    <span className={styles.number}>
      <AnimatedNumber targetNumber={65 || 0} duration={1000} />
    </span>{" "}
    Non Clinical
  </p>
</div>


      <div className={styles.ourvalue}>
        <h1>Announcements</h1>
        {loading ? (
          <p>Loading latest announcement...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : latestAnnouncement ? (
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <p>
              <strong>Created On:</strong> {new Date(latestAnnouncement.upload_date).toLocaleDateString()}
            </p>
            <p>{latestAnnouncement.announcement_text}</p>
            {latestAnnouncement.file_url && (
              /\.(jpeg|jpg|png|gif|webp)$/i.test(latestAnnouncement.file_url) ? (
                <Image
                  src={latestAnnouncement.file_url}
                  alt="Announcement"
                  width={500}
                  height={300}
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
              ) : (
                <p>
                  <a href={latestAnnouncement.file_url} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </p>
              )
            )}
          </div>
        ) : (
          <p>No announcements available at the moment.</p>
        )}
        
        {/* See More Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/annoucement">
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              See More Announcements
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.achievement}>
        <h1>Gallery</h1>
        <Gallery images={images} />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
