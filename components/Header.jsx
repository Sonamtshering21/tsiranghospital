'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect after sign out, if desired
  };

  return (
    <nav className="py-1 bg-white text-black flex justify-between items-center gap-2">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" className="ml-4">
          <Image
            src="/image2.jpg"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain mt-2 mb-2"
            style={{
              borderRadius: '50%',
              border: '0.1rem solid #3498db',
            }}
          />
        </Link>
        <h3 className="font-bold pl-2">Tsirang Hospital</h3>
      </div>
      <ul className="flex space-x-4 pr-4 group-hover:block">
        <li>
          <Link href="/home" className="hover:text-blue-500">Home</Link>
        </li>
        <li className="relative group group-hover:block">
          <Link href="/services" className="flex items-center space-x-2 gap-1 hover:text-blue-500">
            Services
            <Image src='/downarrow.png' alt='img' width={15} height={18} />
          </Link>
          {/* Submenu under Services */}
          <ul className="absolute left-0 hidden mt-0 space-y-2 bg-white shadow-lg group-hover:block">
            <li>
              <Link href="/services/odp" className="block px-2 py-2 hover:bg-gray-100 hover:text-blue-500">OPD</Link>
            </li>
            <li>
              <Link href="/services/emergency" className="block px-2 py-2 hover:text-blue-500 hover:bg-gray-100">Emergency</Link>
            </li>
            <li>
              <Link href="/services/referral" className="block px-2 py-2 hover:text-blue-500 hover:bg-gray-100">Referral</Link>
            </li>
            <li>
              <Link href="/services/medicalcertificate" className="block px-2 py-2 hover:text-blue-500 hover:bg-gray-100">Medical certificate</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/staff" className="hover:text-blue-500">Our Staff</Link>
        </li>
        <li>
          <Link href="/annoucement" className="hover:text-blue-500">News & Events</Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href='/dashboard' className='hover:text-green-300'>Dashboard</Link>
            </li>
           
           
           
            <li>
              <span>{session.user.name}</span>
              <button
                onClick={handleSignOut}
                className="font-bold"
                style={{ marginLeft: "5px" }}
              >
                Sign out
              </button>
            </li>
          </>
        ) : ( 
          // If not logged in, show a link to log in
          <li>
            <Link href='/login' className='hover:text-green-300'></Link>
          </li>
        )}
        
      </ul>
    </nav>
  );
};

export default Header;
