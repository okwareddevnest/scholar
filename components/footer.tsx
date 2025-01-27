import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const UpdatedFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto mb-2" />
            <h2 className="text-xl font-bold">Scholarstream</h2>
            <p className="text-sm">Professional academic writing services for students worldwide.</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col items-end mr-5">
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="text-sm">discounthomeworkhelper@gmail.com</p>
              <p className="text-sm">+92 340 1258059</p>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold">Company</h3>
              <a href="/about" className="text-sm">About Us</a>
              <a href="/careers" className="text-sm">Careers</a>
              <a href="/privacy-policy" className="text-sm">Privacy Policy</a>
              <a href="/terms-of-service" className="text-sm">Terms of Service</a>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <a href="/" className="text-sm">Home</a>
              <a href="/services" className="text-sm">Services</a>
              <a href="/blogs" className="text-sm">Blog</a>
              <a href="/contact" className="text-sm">Contact Us</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-5">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/discounthomeworkhelper" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook">
              <FacebookIcon style={{ color: '#3b5998' }} className="h-6 w-6" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
              <WhatsAppIcon style={{ color: '#25D366' }} className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/discounthomeworkhelper" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
              <InstagramIcon style={{ color: '#E1306C' }} className="h-6 w-6" />
            </a>
            <a href="https://x.com/HomeworkHelp786?t=cXt4j7VJL3kK7VIP-cG2Cw&s=09" target="_blank" rel="noopener noreferrer" title="Follow us on X">
              <TwitterIcon style={{ color: '#1DA1F2' }} className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p className="text-sm">© 2025 Scholarstream. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default UpdatedFooter;
