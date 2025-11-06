'use client';

import { useState, useEffect } from 'react';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      setDate(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-7 bg-black/20 backdrop-blur-2xl border-b border-white/10">
      <div className="h-full flex items-center justify-between px-2 sm:px-4 text-white text-xs sm:text-sm">
        {/* Left side */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Apple logo */}
          <button className="hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.5 1C14.5 1 13.8 1.5 13.3 2.2C12.9 2.8 12.5 3.7 12.7 4.7C13.7 4.8 14.6 4.3 15.1 3.6C15.6 2.9 15.9 2 15.5 1ZM17.9 7C16.8 7 16 7.5 15.3 7.5C14.5 7.5 13.6 7 12.6 7C10.9 7 9.2 8.1 8.4 9.8C7.5 11.7 8 15.4 10.2 18C11 19.1 12 20.2 13.2 20.2C14.2 20.2 14.7 19.6 15.9 19.6C17.1 19.6 17.5 20.2 18.6 20.2C19.8 20.2 20.7 19 21.5 17.9C22.4 16.6 22.7 15.4 22.7 15.3C22.6 15.3 20.4 14.4 20.4 11.9C20.4 9.8 22.2 8.9 22.3 8.8C21.2 7.3 19.6 7.1 19 7C18.6 7.1 18.2 7 17.9 7Z" transform="translate(-7, -1)" />
            </svg>
          </button>

          {/* App name */}
          <button className="hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors font-semibold">
            Portfolio
          </button>

          {/* Menu items - Hidden on mobile and small tablets */}
          <button className="hidden md:block hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
            File
          </button>
          <button className="hidden md:block hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
            Edit
          </button>
          <button className="hidden lg:block hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
            View
          </button>
          <button className="hidden lg:block hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
            Window
          </button>
          <button className="hidden lg:block hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
            Help
          </button>
        </div>

        {/* Right side - Control Center items */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* Battery - Hidden on mobile */}
          <button className="hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg width="20" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="2" width="18" height="8" rx="2" />
              <path d="M19 4v4" strokeLinecap="round" />
              <rect x="2.5" y="3.5" width="15" height="5" fill="currentColor" opacity="0.8" />
            </svg>
          </button>

          {/* WiFi - Hidden on mobile */}
          <button className="hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg width="16" height="12" viewBox="0 0 20 16" fill="none">
              <path d="M1 8c2.8-2.8 7.2-2.8 10 0M4 11c1.6-1.6 4.4-1.6 6 0M7 14c0.6-0.6 1.4-0.6 2 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
          </button>

          {/* Search - Hidden on mobile */}
          <button className="hidden md:block hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="6" />
              <path d="M12 12l4 4" strokeLinecap="round" />
            </svg>
          </button>

          {/* Control Center - Hidden on mobile */}
          <button className="hidden md:block hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect width="6" height="6" rx="1.5" />
              <rect x="10" width="6" height="6" rx="1.5" />
              <rect y="10" width="6" height="6" rx="1.5" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" />
            </svg>
          </button>

          {/* Date and Time */}
          <div className="flex items-center gap-1 sm:gap-2 hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors cursor-pointer">
            <span className="hidden sm:inline">{formatDate(date)}</span>
            <span className="font-medium">{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
