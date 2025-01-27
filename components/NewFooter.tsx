import React from 'react';

const NewFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto flex justify-between">
        <div>
          <h2 className="text-xl font-bold">AcademicWrite</h2>
          <p className="text-sm">Professional academic writing services for students worldwide.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="text-sm">
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-sm">support@academicwrite.com</p>
          <p className="text-sm">+1 (555) 123-4567</p>
          <img src="/path/to/logo.png" alt="Logo" className="mt-2" /> {/* Adjust logo path */}
        </div>
      </div>
      <div className="text-center mt-5">
        <p className="text-sm">© 2025 AcademicWrite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default NewFooter;
