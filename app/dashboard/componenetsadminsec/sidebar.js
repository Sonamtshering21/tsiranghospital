// app/components/admin/Sidebar.js
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the new hook
import styles from './sidebar.module.css'
import Image from 'next/image';


const Sidebar = () => {
    const pathname = usePathname(); // Get the current path

    return (
        <div className={styles.sidebar}>
            <ul>
            <li>
                    <Link href="/dashboard/adminannoucement" className={pathname === '/dashboard/adminannoucement' ? styles.activeLink : ''}>
                    <div className={styles.flexContainer}>
                        <Image 
                            src='/image50.png'
                            alt="img" 
                            width={30}  // Adjust width as needed
                            height={30} // Adjust height as needed
                            className={styles.icon}
                        />
                        <span>Annoucement</span>
                        </div>
                                </Link>
                </li>
                <li>
                    <Link href="/dashboard/text" className={pathname === '/dashboard/text' ? styles.activeLink : ''}>
                    <div className={styles.flexContainer}>
                        <Image 
                            src='/text.png'
                            alt="img" 
                            width={30}  // Adjust width as needed
                            height={30} // Adjust height as needed
                            className={styles.icon}
                        />
                        <span>Notice</span>
                        </div>
                    </Link>
                </li>
                {/*<li>
                    <Link href="/admin/NowDrinksList" className={pathname === '/admin/NowDrinksList' ? styles.activeLink : ''}>
                        Now Drinks List
                    </Link>
                </li>*/}
                <li>
                    <Link href="/dashboard/pdf" className={pathname === '/dashboard/pdf' ? styles.activeLink : ''}>
                    <div className={styles.flexContainer}>
                        <Image 
                            src='/pdf1.png'
                            alt="img" 
                            width={30}  // Adjust width as needed
                            height={30} // Adjust height as needed
                            className={styles.icon}
                        />
                        <span>PDF</span>
                        </div>
                                </Link>
                </li>
                <li>
                    <Link href="/dashboard/mixed" className={pathname === '/dashboard/mixed' ? styles.activeLink : ''}>
                    <div className={styles.flexContainer}>
                        <Image 
                            src='/mixed40.png'
                            alt="img" 
                            width={30}  // Adjust width as needed
                            height={30} // Adjust height as needed
                            className={styles.icon}
                        />
                        <span>Mixed</span>
                        </div>
                                </Link>
                </li>
                
                
            </ul>
        </div>
    );
};

export default Sidebar;
