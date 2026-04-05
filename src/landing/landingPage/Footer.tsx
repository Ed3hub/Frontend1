import React from "react";
import {
  GraduationCap,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Send,
  Mail,
  Globe,
} from "lucide-react";
import Image from "next/image";

/** * SECTION 10: FOOTER SECTION
 */
const Footer = () => (
  <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-left">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8 cursor-pointer group">
            <Image 
              src="/logo/ed3hub_logo.png" 
              alt="Ed3hub logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto object-contain" 
            />
          </div>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-10">
            Empowering learners worldwide with quality education and expert-led
            courses.{" "}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
          <ul className="space-y-4">
            {["About Us", "Careers", "Press", "Blog"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Resources</h4>
          <ul className="space-y-4">
            {["Help Center", "Contact", "Terms", "Privacy"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-500 transition-colors font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h4 className="text-lg font-bold mb-4 text-white">Follow Us</h4>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 text-slate-500 text-sm font-medium">
        <p className="text-center">
          © 2024 ed3hub Learning Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
