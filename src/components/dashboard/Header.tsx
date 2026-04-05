"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeTab }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <p className="font-bold text-sm md:text-base">{activeTab}</p>
      </div>

      <div className="flex items-center gap-2 md:gap-4 text-[#5a5a5a]">
        <div className="flex relative">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02"
              />
            </svg>
          </span>
          <span className="absolute bg-[#0077ff] text-white px-[3px] rounded-full text-[8px] right-[-1px] top-[-5px]">2</span>
        </div>

        <Image
          src="https://i.pravatar.cc/150?u=tom"
          alt="Profile Picture"
          width={24}
          height={24}
          className="w-5 h-5 md:w-6 md:h-6 rounded-sm"
        />

        <div className="flex items-center gap-1">
          <p className="font-bold text-[10px] md:text-[12px] hidden sm:block">
            {user?.username ?? "User"}
          </p>
          <svg className="mt-[2px]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <button
          onClick={handleLogout}
          className="text-[10px] md:text-[12px] text-red-500 hover:underline font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
