import React from 'react';
import styles from '@/components/styles/footer.module.css'; // Assuming you have a separate footer CSS
import Image from 'next/image';
const Footer = () => {
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
      <p className="text-lg text-center mt-7 mb-3 ">
  © 2024 Tsirang Hospital. All rights reserved.
</p>

    </div>
  );
};

export default Footer;
