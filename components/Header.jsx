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
            Services</Link>
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
