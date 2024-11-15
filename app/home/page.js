'use client'
import React from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import styles from '../home/home.module.css'
import Gallery from '../../components/Gallery.jsx'
import Link from 'next/link'; 

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
  <div className={styles.serviceGrid}>
    <p>
      <Link href="/services/odp" className="flex flex-col items-center space-x-2">
        <Image src="/i1.png" alt="image" width={50} height={50} />
        <span>1. OPD services of Hospital and BHUs</span>
      </Link>
    </p>

    <p>
      <Link href="/services/emergency" className="flex flex-col items-center space-x-2">
        <Image src="/i4.png" alt="image" width={50} height={50} />
        <span>2. Emergency response and ambulatory services</span>
      </Link>
    </p>

    <p>
      <Link href="/services/referral" className="flex flex-col items-center space-x-2">
        <Image src="/i3.png" alt="image" width={50} height={50} />
        <span>3. Referral of patients</span>
      </Link>
    </p>

    <p>
      <Link href="/services/medicalcertificate" className="flex flex-col items-center space-x-2">
        <Image src="/i2.png" alt="image" width={50} height={50} />
        <span>4. Issuance of medical certificates</span>
      </Link>
    </p>
  </div>
</div>

    <div className={styles.staff}>
      <p><span className={styles.number}>169</span> Total Staff</p>
      <p><span className={styles.number}>65</span> Clinical</p>
      <p><span className={styles.number}>69</span> Non Clinical</p>
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
