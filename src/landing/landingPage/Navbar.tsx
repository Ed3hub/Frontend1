"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavigationItem {
  name: string;
  to: string;
}

/** * SECTION 1: NAVIGATION HEADER
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavigationItem[] = [
    { name: "Features", to: "#why-us" },
    { name: "Courses", to: "/courses" },
    { name: "Instructors", to: "#instructors" },
    { name: "Pricing", to: "#pricing" },
    { name: "Testimonials", to: "#testimonials" },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <Image 
              src="/logo/ed3hub_logo.png" 
              alt="Ed3hub logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto object-contain" 
            />
          </Link>
          <div className=" hidden lg:flex items-center gap-7 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.to}
                className="text-md font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-md font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80%  text-white px-7 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                Get Started
              </button>
            </Link>
          </div>

          <button
            className="lg:hidden text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute w-full bg-white border-b transition-all duration-300 ${isMenuOpen ? "max-h-[600px] opacity-100 py-8 shadow-xl" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-slate-700 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/sign-in"
            className="text-xl font-bold text-slate-700 hover:text-blue-600"
          >
            Sign In
          </Link>
          <Link href="/sign-up" className="w-[80%] max-w-sm">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg w-full shadow-xl shadow-blue-100">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
