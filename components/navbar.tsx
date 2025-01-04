"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SearchIcon } from 'lucide-react'; // Ensure you have this package installed

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return; // Prevent empty searches

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
      // Handle the search results (e.g., redirect to a results page)
      // You can navigate to a search results page or display results in the UI
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Homework Helper Logo - Three graduates reading from an open book"
              width={116}
              height={76}
              className="object-contain rounded-full"
              priority
            />
          </Link>
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-center w-full md:w-[500px] mx-auto"> {/* Centering the search bar */}
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden w-full"> 
              <SearchIcon className="h-5 w-5 text-gray-500 p-2" /> {/* Search icon */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 pl-0 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Adjusted padding to accommodate the icon
              />
            </div>
          </form>
          <div className="hidden md:flex space-x-4">
            <Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="#solutions" className="text-gray-600 hover:text-blue-600">Solutions</Link>
            <Link href="#services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
          </div>
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2">
            <Link href="#why-scholarstream" className="text-gray-600 hover:text-blue-600">Why ScholarStream?</Link>
            <Link href="#solutions" className="text-gray-600 hover:text-blue-600">Solutions</Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="#services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;