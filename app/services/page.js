import React from 'react'
import styles from '../services/services.module.css'
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
import Image from 'next/image';
const page = () => {
  return (
    <>
    <Header/>
  
    <div className={styles.servicespage}>
    <h1>Services</h1>
    <div className={styles.first}>
    <p>We are committed to providing exceptional healthcare through a comprehensive range of services tailored to meet the diverse needs of our patients. Our Outpatient Department (OPD) Services offer expert consultations, diagnostics, and follow-up care in a convenient, non-hospitalized setting. For patients requiring extended medical attention, our Inpatient Department (IPD) Services ensure a comfortable and supportive environment with round-the-clock care.

         We also provide Medical Certificate Services for official health documentation, including fitness assessments and medical history certifications.
        </p>
        </div>
      
    <div className={styles.servicecontent}>
      <Image src='/s1.avif' alt='img' width={500} height={500} />
      <p>For those seeking holistic treatment options, our Traditional Medicine Services integrate ancient healing practices with modern medical expertise. Our state-of-the-art Operating Theater (OT) Services are equipped for a wide spectrum of surgical procedures, ensuring precision and patient safety.

        To support accurate diagnoses, we offer advanced Radiodiagnostic Services, utilizing cutting-edge imaging technologies. Additionally, our Laboratory Services deliver reliable and timely diagnostic testing to aid in effective treatment planning. For patients seeking privacy and personalized care, our Cabin Services provide serene and exclusive accommodations.

        At the core of our mission is a dedication to excellence, compassion, and innovation in healthcare. We strive to deliver quality medical services that prioritize patient comfort, safety, and well-being.</p>
    
    </div>
    <div className={styles.car}>
      <h1>Our Emergency Services operate 24/7, delivering prompt and lifesaving interventions during 
      critical situations</h1>
        <div className={styles.loop_wrapper}>
          <div className={styles.mountain}></div>
          <div className={styles.hill}></div>
          <div className={styles.tree}></div>
          <div className={styles.tree}></div>
          <div className={styles.tree}></div>
          <div className={styles.rock}></div>
          <div className={styles.truck}></div>
          <div className={styles.wheels}></div>
        </div> 
    </div> 
   
        
        
    </div><Footer/></>
  )
}

export default page
