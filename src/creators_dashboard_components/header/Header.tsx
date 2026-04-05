"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeTab,
  setActiveTab,
  setActivePage,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const navItems = [
    { id: "Home", label: "Home" },
    { id: "Account", label: "Account" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Poll unread count
  useEffect(() => {
    const fetchUnread = () => api.get<{ unread: number }>('/chat/unread/').then(r => setUnreadCount(r.data.unread)).catch(() => {});
    fetchUnread();
    const id = setInterval(fetchUnread, 10000);
    return () => clearInterval(id);
  }, []);

  const fullName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.username ||
    "User";
  const avatarDisplay =
    user?.avatar ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0077ff&color=fff&size=64`;

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <img
            src="/logo/ed3hub_logo.png"
            alt="Ed3Hub Logo"
            className="h-8 md:h-10 w-auto object-contain cursor-pointer"
            onClick={() => setActiveTab("Home")}
          />
        </div>

        {/* Desktop nav tabs */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeTab === item.id ? "text-blue-500" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Messages tab with badge */}
          <button
            onClick={() => { setActiveTab("Messages"); setUnreadCount(0); }}
            className={`relative text-sm font-medium transition-colors ${
              activeTab === "Messages" ? "text-blue-500" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Messages
            {unreadCount > 0 && activeTab !== "Messages" && (
              <span className="absolute -top-2 -right-3 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={avatarDisplay}
                alt={fullName}
                className="w-8 h-8 rounded-full border border-gray-200 object-cover"
              />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-800 leading-tight">{fullName}</span>
                <span className="text-[10px] text-gray-400 capitalize">{user?.role ?? "educator"}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={avatarDisplay} alt={fullName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{fullName}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email ?? ""}</p>
                    </div>
                  </div>
                  <span className="inline-block text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full capitalize font-medium">
                    {user?.role ?? "educator"}
                  </span>
                </div>
                <button
                  onClick={() => { setActivePage("profile"); setIsDropdownOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-2">
              <img src={avatarDisplay} alt={fullName} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{fullName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email ?? ""}</p>
              </div>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Mobile Messages tab */}
            <button
              onClick={() => { setActiveTab("Messages"); setUnreadCount(0); setIsMobileMenuOpen(false); }}
              className={`relative flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                activeTab === "Messages" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Messages
              {unreadCount > 0 && activeTab !== "Messages" && (
                <span className="ml-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => { setActivePage("profile"); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
