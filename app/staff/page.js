import React from 'react'
import Image from 'next/image';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
import styles from'./staff.module.css'
const page = () => {
  return (
    <div className={styles.staff}>
      <Header />
      <h1>Staff</h1>
      <div className={styles.staffsection}>
        <Image src='/a2.jpg' alt='image' width={600} height={600} />
      </div>
      <Footer/>
    </div>
  )
}

export default page
