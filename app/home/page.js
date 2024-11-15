'use client'
import React from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import styles from '../home/home.module.css'
import Gallery from '../../components/Gallery.jsx'

const page = () => {
  const images = ['/a1.jpg', '/a2.jpg', '/a3.jpg'];
  
  return (
    <div>
    <div className={styles.marqueecontainer}>
        <div className={styles.marqueecontent}>
        Notice: Please be informed that Dr. X is currently out of station and will be unavailable for medical consultations until further notice.
        </div>
    </div>
      
      <div>
      
      </div>
    <div className={styles.homepage}>
        <h1>Tsirang Hospital</h1>
    </div>
    <div className={styles.ourvalue}>
        <h1>Vision</h1>
        <p>A Dzongkhag with the best health infrastructures and services</p>
        <h1>Mission</h1>
        <p>To provide quality primary, secondary  and  tertiary  health care  services  in  both traditional  and modern medicine</p>
        <p>To ensure accessible, equitable and reliable health services</p>
        <p>To prevent and control diseases</p>
        <p>To rehabilitate and promote healthy living</p>
    </div>
    <div className={styles.service}>
        <h1>Services</h1>
        <p><Image src="/i1.png" alt='image' width={50} height={50} />1. OPD services of Hospital and BHUs</p>
        <p><Image src="/i4.png" alt='image' width={50} height={50} />2. Emergency response and ambulatory services</p>
        <p><Image src="/i3.png" alt='image' width={50} height={50} />3. Referral of patients</p>
        <p><Image src="/i2.png" alt='image' width={50} height={50} />4. Issuance of medical certificates</p>
    </div>
    <div className={styles.staff}>
      <p>Total Staff: 169</p>
      <p>Clinical: 65</p>
      <p>Non Clinical: 69</p>
    </div>
    <div className={styles.achievement}>
      <h1>Gallery</h1>
    <Gallery images={images} />
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  )
}

export default page
