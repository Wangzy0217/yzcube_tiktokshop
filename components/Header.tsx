import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { TikTokLogoText } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const languageOptions: { code: Language; label: string }[] = [
  { code: 'en-US', label: 'US English' },
  { code: 'zh-CN', label: '中文' },
  { code: 'th-TH', label: 'ภาษาไทย' },
  { code: 'ms-MY', label: 'Bahasa Melayu' },
];

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Find current label object
  const currentLangLabel = languageOptions.find(l => l.code === language)?.label || 'US English';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#161823] text-white h-[60px] flex items-center justify-between px-4 lg:px-8 w-full z-50">
      {/* Left side container */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <TikTokLogoText />
          </div>
          
          {/* Short white line divider */}
          <div className="h-5 w-[1px] bg-white/30"></div>
          
          {/* Seller Center Branding Text */}
          <div className="flex items-center">
             {/* Large White Text - Removed font-bold, Removed pt-1 for vertical centering */}
             <span className="text-[20px] font-normal text-white tracking-tight leading-none">
               {t.sellerCenter}
             </span>
          </div>
        </div>

        {/* Academy Link - Increased gap in parent container to move it slightly right */}
        <a 
          href="https://seller-my.tiktok.com/university/home" 
          className="hidden md:flex items-center justify-center px-3 py-2 rounded-[4px] hover:bg-[#ffffff1a] transition-colors duration-200 text-[14px] font-medium text-gray-300 hover:text-white"
        >
          {t.academy}
        </a>
      </div>

      {/* Right side container */}
      <div className="flex items-center gap-4 text-[14px]">
        {/* Contact Us button with gray hover effect */}
        <a 
          href="https://seller.tiktok.com/contact-us" 
          className="hidden sm:flex items-center justify-center px-3 py-2 rounded-[4px] hover:bg-[#ffffff1a] transition-colors duration-200"
        >
          {t.contactUs}
        </a>
        
        <div className="relative" ref={langDropdownRef}>
          {/* Language Trigger */}
          <button 
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[4px] hover:bg-[#ffffff1a] transition-all duration-200 ${isLangOpen ? 'bg-[#ffffff1a]' : ''}`}
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <Globe className="w-4 h-4" />
            <span>{currentLangLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu with Transition Effects */}
          <div 
            className={`absolute top-full right-0 mt-2 w-[180px] bg-white text-[#161823] rounded-[4px] shadow-lg py-2 transform transition-all duration-200 origin-top-right z-50 border border-gray-100
            ${isLangOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
          >
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                className={`w-full text-left px-4 py-2.5 text-[14px] hover:bg-gray-50 flex items-center justify-between transition-colors
                  ${language === lang.code ? 'font-semibold text-tiktok-teal bg-gray-50/50' : 'font-normal text-tiktok-text'}
                `}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLangOpen(false);
                }}
              >
                {lang.label}
                {language === lang.code && <Check className="w-4 h-4 text-tiktok-teal" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;