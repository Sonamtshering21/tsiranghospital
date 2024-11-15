import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const header = () => {
  return (

    <nav className="py-1 bg-white text-black flex justify-between items-center">
    {/* Logo Section */}
    <div className="flex items-center">
      <Link href="/" className="ml-4">
        <Image 
          src="/image2.jpg" // Directly reference the logo path in the public folder
          alt="Logo" 
          width={50} 
          height={50} 
          className="object-contain mt-2 mb-2" 
          style={{ borderRadius: '50%',
                   border: '0.1rem solid #3498db'
           }}
        />
      </Link>
      <h3 className="font-bold pl-2">Tsirang Hospital</h3> {/* Optional title next to logo */}
    </div>

    {/* Navigation Links */}
    <ul className="flex space-x-4 pr-4">
      <li>
        <Link href="/home" className="hover:text-blue-500">
          Home
        </Link>
      </li>
      <li>
        <Link href="/users" className="hover:text-blue-500">
          Our Staff
        </Link>
      </li>
      <li>
        <Link href="/referencer" className="hover:text-blue-500">
          News & Events
        </Link>
      </li>
    </ul>
  </nav>
  
  )
}

export default header
