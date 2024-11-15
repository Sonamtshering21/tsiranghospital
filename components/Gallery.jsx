import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/components/styles/gallery.module.css'

export default function Gallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.imageContainer}>
    <Image
      src={images[currentIndex]}
      alt={`Gallery image ${currentIndex + 1}`}
      width={700}
      height={700}
    />
    <div className={styles.navi}>
      <button onClick={prevImage} className={styles.prevButton}><Image src='/arrow1.png' alt='img' width={30} height={30} /></button>
      <button onClick={nextImage} className={styles.nextButton}><Image src='/arrow2.png' alt='img' width={30} height={30} /></button>
    </div>
  </div>
  )
}