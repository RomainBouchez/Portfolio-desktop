'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LiquidGlass from '@/components/LiquidGlass';

// Icône monochrome (SVG symbolique MacTahoe) rendue en blanc via mask CSS.
function MenuIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block bg-white/90 ${className ?? ''}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export default function MenuBar({ appName = 'Finder' }: { appName?: string }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const { language, setLanguage } = useLanguage();
  const [showLangHelp, setShowLangHelp] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the help modal
    let hasSeenHelp = false;
    try {
      hasSeenHelp = !!localStorage.getItem('hasSeenLangHelp');
    } catch (error) {
      console.warn('localStorage is not available:', error);
    }

    if (!hasSeenHelp) {
      // Small delay so it feels natural
      const timer = setTimeout(() => setShowLangHelp(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissLangHelp = () => {
    setShowLangHelp(false);
    try {
      localStorage.setItem('hasSeenLangHelp', 'true');
    } catch (error) {
      console.warn('localStorage is not available:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
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
    <div className="fixed top-0 left-0 right-0 z-40 h-7 bg-black/20 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18)]">
      <div className="h-full flex items-center justify-between px-2 sm:px-4 text-white text-xs sm:text-sm">
        {/* Left side */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Apple logo */}
          <button className="hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.5 1C14.5 1 13.8 1.5 13.3 2.2C12.9 2.8 12.5 3.7 12.7 4.7C13.7 4.8 14.6 4.3 15.1 3.6C15.6 2.9 15.9 2 15.5 1ZM17.9 7C16.8 7 16 7.5 15.3 7.5C14.5 7.5 13.6 7 12.6 7C10.9 7 9.2 8.1 8.4 9.8C7.5 11.7 8 15.4 10.2 18C11 19.1 12 20.2 13.2 20.2C14.2 20.2 14.7 19.6 15.9 19.6C17.1 19.6 17.5 20.2 18.6 20.2C19.8 20.2 20.7 19 21.5 17.9C22.4 16.6 22.7 15.4 22.7 15.3C22.6 15.3 20.4 14.4 20.4 11.9C20.4 9.8 22.2 8.9 22.3 8.8C21.2 7.3 19.6 7.1 19 7C18.6 7.1 18.2 7 17.9 7Z" transform="translate(-7, -1)" />
            </svg>
          </button>

          {/* App name (dynamique selon la fenêtre active) */}
          <button className="hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors font-semibold max-w-[120px] sm:max-w-[200px] truncate">
            {appName}
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
          {/* Battery */}
          <button className="hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors flex items-center">
            <MenuIcon src="/icon/menubar/battery.svg" className="w-6 h-4" />
          </button>

          {/* WiFi */}
          <button className="hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors flex items-center">
            <MenuIcon src="/icon/menubar/wifi.svg" className="w-4 h-4" />
          </button>

          {/* Search - Hidden on mobile */}
          <button className="hidden md:flex items-center hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <MenuIcon src="/icon/menubar/search.svg" className="w-4 h-4" />
          </button>

          {/* Control Center - Hidden on mobile */}
          <button className="hidden md:block hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="5.5" rx="2.75" />
              <circle cx="16" cy="7.75" r="1.6" fill="currentColor" stroke="none" />
              <rect x="3" y="13.5" width="18" height="5.5" rx="2.75" />
              <circle cx="8" cy="16.25" r="1.6" fill="currentColor" stroke="none" />
            </svg>
          </button>

          {/* Language Toggle with First Visit Help Modal */}
          <div className="relative flex items-center h-full">
            <button
              onClick={() => {
                setLanguage(language === 'fr' ? 'en' : 'fr');
                if (showLangHelp) dismissLangHelp();
              }}
              className="hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors font-semibold text-xs sm:text-sm uppercase tracking-wider relative z-10"
            >
              {language}
            </button>

            {/* Help Modal */}
            {showLangHelp && (
              <LiquidGlass
                radius={16}
                blur={20}
                overflow="visible"
                tint="rgba(59,130,246,0.55)"
                strokeColor="255,255,255"
                strokeEdge={0.2}
                strokeMid={0.2}
                highlight={0.35}
                shade={0.1}
                className="absolute top-full right-0 mt-3 w-48 text-white font-medium text-[10px] sm:text-xs z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-300"
                contentClassName="p-3"
              >
                <div className="absolute -top-[5px] right-[13px] w-2.5 h-2.5 bg-blue-500/80 rotate-45 transform rounded-tl-[2px]"></div>
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <p className="leading-relaxed">
                    {language !== 'fr' ? 'Cliquez ici pour changer la langue du site' : 'Click here to change the language'}
                  </p>
                  <button onClick={(e) => { e.stopPropagation(); dismissLangHelp(); }} className="p-1 hover:bg-white/20 rounded-full shrink-0 transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </LiquidGlass>
            )}
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-1 sm:gap-2 hover:bg-white/10 px-1.5 sm:px-2 py-0.5 rounded transition-colors cursor-pointer">
            {mounted && (
              <>
                <span className="hidden sm:inline">{formatDate(date)}</span>
                <span className="font-medium">{formatTime(time)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
