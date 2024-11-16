import React from 'react';
import styles from './medicalcertificate.module.css';

const page = () => {
  return (
    <div className={styles.mc}>
      <h1>Issuance of Medical Certificates</h1>
      <div className={styles.mc1}>
        <div className={styles.mc2}>
          <h2>1. General Purpose</h2>
          <p>Purpose: This certificate is issued for general health verification. It may be required for various non-specific purposes such as personal health records, travel purposes, or as part of administrative or legal processes.</p>
          <p>Content: The certificate confirms that the individual is in generally good health or fit for a specific activity (depending on the requested purpose).</p>
          
          <ul>
          <p>Issued For:</p>
            <li>Personal health documentation</li>
            <li>Travel or visa purposes</li>
            <li>Medical clearance for attending events or activities (e.g., sports, travel, etc.)</li>
          </ul>
          <p>Process: The applicant will undergo a basic medical check-up, including general health screening (e.g., blood pressure, heart rate, temperature, basic lab tests if necessary).</p>
         
          <ul>
          <p>Required Documents:</p>
            <li>Photocopy of CID (or other identification)</li>
            <li>Completed Medical Certificate Application Form (PDF format)</li>
          </ul>
          <p>Fee: Nu 100&frasl;-</p>
        </div>

        <div className={styles.mc2}>
          <h2>2. Employment Medical Certificate</h2>
          <p>Purpose: This certificate is issued to individuals seeking employment or those who are required by their employer to provide proof of good health. It is often a prerequisite for job applications or for new hires, particularly for physically demanding roles.</p>
          <p>Content: The certificate confirms the individual fitness for work. </p>
          <ul>
            <p>It may include assessments such as:</p>
            <li>Physical examination (e.g., vision, hearing, mobility)</li>
            <li>Mental health evaluation (if applicable)</li>
            <li>Any chronic conditions or physical disabilities that may affect work performance</li>
          </ul>
         
          <ul>
          <p>Issued For:</p>
            <li>Employment applications (particularly for physically demanding jobs or health-related sectors)</li>
            <li>Occupational health assessments (e.g., for factory work, construction, etc.)</li>
          </ul>
          <p>Process: The applicant will undergo a detailed medical examination, including physical check-ups and, if necessary, blood tests or other specific health screenings.</p>
          
          <ul>
          <p>Required Documents:</p>
            <li>Photocopy of CID</li>
            <li>Employment Verification Letter or Job Offer Letter from the employer</li>
            <li>Completed Employment Medical Form (PDF format)</li>
          </ul>
          <p>Fee: Nu 150&frasl;-</p>
        </div>

        <div className={styles.mc2}>
          <h2>3. Driver&apos;s License Medical Certificate</h2>
          <p>Purpose: This certificate is required by the licensing authorities to verify that an individual is physically and mentally fit to operate a motor vehicle. It is a standard requirement when applying for or renewing a driver license, particularly for private, commercial, or public transport licenses.</p>
          <p>Content: The certificate verifies that the applicant meets the necessary medical standards to safely operate a vehicle.</p>
          <ul>
            <p>Common checks include:</p>
            <li>Vision test (e.g., acuity, color blindness)</li>
            <li>Hearing test (e.g., ability to hear sirens, honking, etc.)</li>
            <li>Neurological and cardiovascular assessment (e.g., to detect any underlying conditions like epilepsy, heart disease)</li>
            <li>General physical health check (e.g., mobility, reflexes)</li>
          </ul>
          
          <ul>
             <p>Issued For:</p>
            <li>Applying for or renewing a driver&apos;s license</li>
            <li>Assessing fitness to drive for individuals with medical conditions or disabilities</li>
          </ul>
          <p>Process: The applicant will undergo a thorough health check-up, which typically includes a vision test, a general physical examination, and possibly some specialized tests depending on age or medical history.</p>
         
          <ul>
          <p>Required Documents:</p>
            <li>Photocopy of CID</li>
            <li>Driver&apos;s License Application Form (if applicable)</li>
            <li>Completed Medical Certificate Form (PDF format)</li>
          </ul>
          <p>Fee: Nu 200&frasl;-</p>
        </div>

        <div className={styles.mc2}>
          <h2>4. Food Handler&apos;s Medical Certificate</h2>
          <p>Purpose: This certificate is issued to individuals working in the food industry to ensure that they do not carry any contagious diseases or conditions that could affect food safety. It is a mandatory health certificate for food handlers, including those working in restaurants, food processing plants, and any other establishment where food is prepared or served.</p>
          <p>Content: The certificate confirms that the individual has been screened for common foodborne diseases and is free of conditions that may pose a risk to public health. </p>
          <ul>
            <p>Common tests and checks include:</p>
            <li>Screening for infectious diseases (e.g., tuberculosis, Hepatitis, typhoid)</li>
            <li>Blood tests for pathogens that can cause foodborne illnesses</li>
            <li>General physical examination to ensure the absence of contagious diseases</li>
          </ul>
          
          <ul>
          <p>Issued For:</p>
            <li>Employment in the food industry (restaurants, cafes, food processing, etc.)</li>
            <li>Certification for food handling or food safety programs</li>
          </ul>
          <p>Process: The applicant will undergo a medical check-up that includes a series of tests to ensure they are free of communicable diseases. Depending on the workplace, vaccination status may also be reviewed (e.g., Hepatitis, tuberculosis).</p>
         
          <ul>
          <p>Required Documents:</p>
            <li>Photocopy of CID</li>
            <li>Proof of completion of any food handling or safety courses (if applicable)</li>
            <li>Completed Food Handler Medical Form (PDF format)</li>
          </ul>
          <p>Fee: Nu 150&frasl;-</p>
        </div>
      </div>
    </div>
  );
};

export default page;
