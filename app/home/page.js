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
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
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

  return (
    <div>
      <Header />
    <div className={styles.marqueecontainer}>
        <p className={styles.marquee_text}>
          <Image src="/speaker.png" alt='img' width={33} height={33} />
          Announcements: 
          <marquee direction="left" >
           <Image src='/newc.png' alt='img' width={33} height={33} className={styles.image_fade}/> Please be informed that Dr. X is currently out of station and will be unavailable for medical consultations until further notice.<Image src='/newc.png' alt='img' width={33} height={33} className={styles.image_fade}/>
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
          <Link href="/services/odp">
            <p>
              <Image src="/i1.png" alt="image" width={50} height={50} />
              <span>1. OPD services of Hospital and BHUs</span>
            </p>
          </Link>
          <Link href="/services/emergency">
            <p>
              <Image src="/i4.png" alt="image" width={50} height={50} />
              <span>2. Emergency response and ambulatory services</span>
            </p>
          </Link>
          <Link href="/services/referral">
            <p>
              <Image src="/i3.png" alt="image" width={50} height={50} />
              <span>3. Referral of patients</span>
            </p>
          </Link>
          <Link href="/services/medicalcertificate">
            <p>
              <Image src="/i2.png" alt="image" width={50} height={50} />
              <span>4. Issuance of medical certificates</span>
            </p>
          </Link>
        </div>
      </div>

      <div className={styles.staff}>
        <p>
          <span className={styles.number}>
            <AnimatedNumber targetNumber={169} duration={1000} />
          </span>{" "}
          Total Staff
        </p>
        <p>
          <span className={styles.number}>
            <AnimatedNumber targetNumber={65} duration={1000} />
          </span>{" "}
          Clinical
        </p>
        <p>
          <span className={styles.number}>
            <AnimatedNumber targetNumber={69} duration={1000} />
          </span>{" "}
          Non Clinical
        </p>
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
