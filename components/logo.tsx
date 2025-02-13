'use client';

import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  const newLocal = "/images/logo.png"
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src={newLocal}
        alt="Homework Helper Logo - Three graduates reading from an open book"
        width={50} // Updated width for smaller logo
        height={50} // Updated height for smaller logo
        className="object-contain rounded-full" // Added rounded-full for circular styling
        priority
      />
    </Link>
  )
}

