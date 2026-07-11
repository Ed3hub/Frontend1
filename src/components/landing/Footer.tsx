import React from 'react';
import { Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const sections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Explore Courses', href: '#' },
        { label: 'Learning Paths', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Become an Educator', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'FAQs', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms', href: '#' },
      ],
    },
  ];

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="w-full bg-white text-slate-900 pt-16 pb-12 px-6 md:px-12 lg:px-24 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand Info + Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Logo Group */}
            <Link href="/" className="flex items-center gap-1 group mb-4">
              <Image 
                src="/logo/ed3hub_logo.png" 
                alt="Ed3hub Logo" 
                width={150} 
                height={40} 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            
            {/* Tagline */}
            <p className="text-sm md:text-base text-slate-500 font-medium">
              Where learning levels up.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col items-start">
                {/* Column Heading */}
                <h3 className="text-sm md:text-base font-bold text-slate-900 mb-5 tracking-tight">
                  {section.title}
                </h3>
                
                {/* Links list */}
                <ul className="flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-[#1552b1] transition-colors duration-150 font-medium block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Section Bar Divider */}
        <div className="border-t border-slate-100/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Slogan */}
          <p className="text-xs md:text-sm text-slate-400 font-medium text-center sm:text-left">
            &copy; 2026 Ed3Hub &mdash; Learn. Build. Grow.
          </p>

          {/* Social Media Connections */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500">
              Connect
            </span>
            <div className="flex items-center gap-2">
              {socials.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-[#EEF2F6] hover:bg-[#E2E8F0] text-slate-600 hover:text-[#1552b1] transition-all duration-200 flex items-center justify-center"
                  >
                    <IconComponent size={16} strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
