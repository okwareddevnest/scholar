import React from 'react';

const ContactUs: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">Have questions? Reach out to us on WhatsApp!</p>
      <a
        href="https://wa.me/923401258059"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Message Us on WhatsApp
      </a>
    </div>
  );
};

export default ContactUs;
