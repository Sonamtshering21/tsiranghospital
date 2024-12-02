'use client'
import React from 'react';
import { useEffect,useState } from 'react';
import styles from '@/components/styles/footer.module.css'; // Assuming you have a separate footer CSS
import Image from 'next/image';
const Footer = () => {
  const [homePageDetails, setHomePageDetails] = useState(null); // To store fetched data

  useEffect(() => {
    const fetchHomePageDetails = async () => {
      try {
        const response = await fetch('/api/homepagedetail');
        if (!response.ok) {
          throw new Error('Failed to fetch home page details');
        }
  
        const data = await response.json();
        console.log(data); // This helps to inspect the structure of the response
  
        // Check if 'details' exists and contains data
        if (data.details && data.details.length > 0) {
          const homePageDetails = data.details[0]; // Get the first object from 'details' array
          setHomePageDetails(homePageDetails); // Set the state with the first object
          console.log(homePageDetails.headertext); // Access the specific field (e.g., headertext)
        } else {
          console.log('No details available');
        }
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHomePageDetails();
  }, []); // This runs once on mount
  if (!homePageDetails) return <div>Loading...</div>;

  return (
    <div className={styles.footer}>
      {/* Flex container for the content */}
      <div className="flex flex-row w-full gap-10 justify-between border-b border-white "> {/* Full width and space between */}
        
        {/* Left Section: Contact Information */}
        <div className="flex-1 pl-10 pt-5">
            {/* Take up equal width */}
            <div className="flex items-center space-x-3 mb-5">
                <Image src="/icall.png" alt="Phone Icon" width={40} height={40} />
                <a href="tel:+9756471112" className="text-white">+9756471112</a>
            </div>
            <div className="flex items-center space-x-3 mb-5">
                <Image src="/im.png" alt="Email Icon" width={35} height={35} />
                <a href="mailto:tsiranghospital@gmail.com" className="text-white">tsiranghospital@gmail.com</a>
            </div>
            <div className="flex items-center space-x-3 mb-5">
                <Image src="/ifb1.png" alt="Facebook Icon" width={40} height={40} />
                <a href="https://www.facebook.com/Tsiranghospital2021" target="_blank" rel="noopener noreferrer" className="text-white">Tsirang Hospital</a>
            </div>
        </div>



        {/* Right Section: Location (with Google Maps iframe) */}
        <div className="flex-1 pr-10 pt-5 pb-10"> {/* Take up equal width */}
          <p><Image src="/il.png" alt='image' width={30} height={30} />Our Location</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1054.149950863378!2d90.12400534960659!3d27.003832830259512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3758af59cfef0d9f%3A0xf2d99b2cb20f0fd9!2sTSIRANG%20HOSPITAL!5e1!3m2!1sen!2sin!4v1731609751674!5m2!1sen!2sin" 
            className="w-full max-w-2xl h-96 border-0"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>         
        </div>
      </div>

      {/* Footer Bottom: Copyright */}
      <p className="text-lg text-center mt-7 mb-3">
  © {homePageDetails?.footer_year || '2024'} Tsirang Hospital. All rights reserved.
</p>


    </div>
  );
};

export default Footer;
