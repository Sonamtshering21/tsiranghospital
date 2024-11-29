// app/admin/layout.js
import Header from '@/components/Header';
import React from 'react';
import Sidebar from './componenetsadminsec/sidebar'; 
import styles from './componenetsadminsec/sidebar.module.css'

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.container}> {/* Use the container class here */}
      
      <Sidebar />
      <div className={styles.headersec}>
      <Header />
      </div>

      <div className={styles.innerdisplay}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
