"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement search functionality here
    if (searchQuery.trim() === '') return; // Prevent empty searches

    // Example: Fetching data based on search query
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log("Search results:", data);
      // Handle the search results (e.g., redirect to a results page)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png" // Directly importing the logo.png file
                alt="Homework Helper Logo - Three graduates reading from an open book"
                width={120} // Adjusted width
                height={80} // Adjusted height
                className="object-contain"
                priority
              />
            </Link>
          </div>
          {/* Centered Search Bar with Rounded Ends */}
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-center flex-grow">
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden w-[600px]"> {/* Custom width for longer search bar */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 pl-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Full width for input
              />
              <button type="submit" className="bg-gray-300 h-full flex items-center justify-center w-10 rounded-r-full"> {/* Keeping button size smaller */}
                <span className="text-gray-500">🔍</span> {/* Search icon */}
              </button>
            </div>
          </form>
          <div className="space-x-4">
            <Link href="#why-scholarstream" className="text-gray-600 hover:text-blue-600">Why ScholarStream?</Link>
            <Link href="#solutions" className="text-gray-600 hover:text-blue-600">Solutions</Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="#services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;