import React from 'react'
import styles from '../services/services.module.css'
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
const page = () => {
  return (
    <>
    <Header/>
    <div className={styles.servicespage}>
        <div>
        <h1>1. OPD services of Hospital and BHUs</h1>
        </div>
        <div>
        <h1>2. Emergency response and ambulatory services</h1>
        <p>Emergency service is providing 24 hours emergency service for emergency cases; this includes emergency treatment, surgery, laboratory and other diagnostic and pharmacy services.This service will be provided on all working days from 9.00 AM to 3.00 PM. This service includes OPD consultations, laboratory and diagnostics and pharmacy services. (Note: All laboratory diagnostic and drugs will be provided on the prescription of a registered medical practitioner only)</p>
        </div>
        <div>
        <h1>3. Referral of patients</h1>
        </div>
        <div>
            <h1>4. Issuance of medical certificates</h1>
                <div>
                    <h3>1.General Purpose</h3>
                    <div>
                        <p>Requirements:</p>
                        <p>CID photocopy</p>
                        <p>Forms PDF</p>
                        <p>Fees: Nu 100/-</p>
                    </div>
                    <h3>2.Employment</h3>
                    <h3>3.Driver Licensing</h3>
                    <h3>4.Food handler</h3>
                </div>
            </div>
    </div><Footer/></>
  )
}

export default page
