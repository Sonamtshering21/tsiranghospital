import React from 'react';
import Header from '@/components/Header'; 
import styles from '../services.module.css'


const page = () => {
  const services = [
    { name: "SURGERY", days: "MONDAY, FRIDAY, SATURDAY" },
    { name: "ENDOSCOPY", days: "WEDNESDAY" },
    { name: "GYNAECOLOGY", days: "TUESDAY, THURSDAY AND SATURDAY" },
    { name: "GENERAL CONSULTATION", days: "DAILY" },
    { name: "ORTHOPAEDIC", days: "" },
    { name: "EAR NOSE AND THROAT", days: "" },
    { name: "OPHTHALMIC SERVICES", days: "" },
    { name: "DENTAL AND DENTURE SERVICES", days: "" },
    { name: "PHYSIOTHERAPY SERVICES", days: "" },
    { name: "PHARMACY SERVICES", days: "" },
  ];

  return (
    <>      <Header />
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>OUT PATIENT DEPARTMENT SERVICES</h1>
        <div className={styles.servicesList}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h2 className={styles.serviceName}>{service.name}</h2>
              <p className={styles.serviceDays}>{service.days || "Not specified"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
  
};

export default page;
