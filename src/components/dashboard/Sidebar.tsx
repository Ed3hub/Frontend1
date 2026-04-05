"use client";

import React from "react";

interface SidebarProps {
  setIsMobileMenuOpen?: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsMobileMenuOpen, activeTab, setActiveTab }) => {
  const handleOptionClick = (option: string) => {
    setActiveTab(option);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="container flex flex-col justify-between h-screen relative">
      <button
        className="md:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      
      {/* Logo section */}
      <div className="logo">
        <span className="log1 font-medium">
          <h1 className="mb-2">e</h1>
        </span>
        <h1 className="log2 font-extrabold">d3hub</h1>
      </div>
      
      {/* Navigation options */}
      <div className="options">
        <div
          className={`option1 ${
            activeTab === "Home" ? "!text-[#00589f] bg-[#009dff38]" : ""
          } cursor-pointer`}
          onClick={() => handleOptionClick("Home")}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2zM3 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zM10.5 2A1.5 1.5 0 0 0 9 3.5v2A1.5 1.5 0 0 0 10.5 7h2A1.5 1.5 0 0 0 14 5.5v-2A1.5 1.5 0 0 0 12.5 2zM10 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm-8 7A1.5 1.5 0 0 1 3.5 9h2A1.5 1.5 0 0 1 7 10.5v2A1.5 1.5 0 0 1 5.5 14h-2A1.5 1.5 0 0 1 2 12.5zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm7-1A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9zm-.5 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </span>
          <p>Home</p>
        </div>
        <div
          className={`option1 ${
            activeTab === "Account" ? "!text-[#0175d4] bg-[#009dff38]" : ""
          } cursor-pointer`}
          onClick={() => handleOptionClick("Account")}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                d="M24 4c-5.523 0-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10S29.523 4 24 4M12.25 28A4.25 4.25 0 0 0 8 32.249V33c0 3.755 1.942 6.567 4.92 8.38C15.85 43.163 19.786 44 24 44s8.15-.837 11.08-2.62C38.058 39.567 40 36.755 40 33v-.751A4.25 4.25 0 0 0 35.75 28z"
              />
            </svg>
          </span>
          <p>Account</p>
        </div>
      </div>
      
      {/* Logout section */}
      <div className="logout">
        <div
          className={`option1 ${
            activeTab === "Logout" ? "!text-red-900" : "!text-red-500"
          } cursor-pointer`}
          onClick={() => handleOptionClick("Logout")}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"
              />
            </svg>
          </span>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;