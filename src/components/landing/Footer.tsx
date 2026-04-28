import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f1f5f9] py-10 px-6 md:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1 group">
            <Image 
              src="/logo/ed3hub_logo.png" 
              alt="Ed3hub Logo" 
              width={150} 
              height={40} 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link href="/privacy-policy" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-condition" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
            Terms of Service
          </Link>
          <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
            Contact
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-slate-400 text-sm">
          © {currentYear} Ed3Hub. Where learning levels up.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
