import Image from 'next/image';
import { WhatsAppLogoIcon } from './whatsapp-logo-icon';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Homework Helper Logo - Three graduates reading from an open book"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Contact and Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            {/* Contact Section */}
            <div className="flex items-center space-x-4">
              <WhatsAppLogoIcon className="w-6 h-6 text-[#25D366]" />
              <Link
                href="https://wa.me/923401258059"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +92 340 1258059
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <Link
                href="https://www.facebook.com/discounthomeworkhelper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6 text-[#1877F2]" />
              </Link>
              <Link
                href="https://www.instagram.com/discounthomeworkhelper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6 text-[#E4405F]" />
              </Link>
              <Link
                href="https://x.com/HomeworkHelp786?t=cXt4j7VJL3kK7VIP-cG2Cw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6 text-[#1DA1F2]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center md:text-left">
          <p>&copy; 2024 Homework Helper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;