import React from 'react';
import { Search, Headset, Bell, HelpCircle, User } from 'lucide-react';
import { TikTokLogoText } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-[#161823] text-white h-[60px] flex items-center justify-between px-4 lg:px-6 w-full sticky top-0 z-50">
      {/* Left: Logo & Branding */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer">
            <TikTokLogoText />
          </div>
          <div className="h-5 w-[1px] bg-white/30"></div>
          <span className="text-[18px] font-normal text-white tracking-tight">
            {t.sellerCenter}
          </span>
        </div>
      </div>

      {/* Right: Search, Actions, Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#2f313a] rounded-[4px] h-[32px] px-3 w-[300px] hover:bg-[#3d3f4b] transition-colors border border-transparent focus-within:border-gray-500">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="store rating" 
            className="bg-transparent border-none outline-none text-[13px] text-white placeholder-gray-400 w-full"
          />
          <span className="text-[10px] text-gray-500 border border-gray-600 rounded px-1 ml-2">⌘+K</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5 text-gray-300">
          <button className="flex items-center gap-1.5 text-[13px] hover:text-white transition-colors">
            <Headset className="w-5 h-5" />
            <span className="hidden xl:inline">1 customer unassigned</span>
          </button>
          
          <button className="relative hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#FE2C55] text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] h-[16px] flex items-center justify-center border-2 border-[#161823]">
              13
            </span>
          </button>

          <button className="flex items-center gap-1.5 text-[13px] hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="hidden xl:inline">Help</span>
          </button>
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden cursor-pointer border border-gray-500 hover:border-gray-300 transition-colors">
          <img 
            src="https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/513904664ec64155b085731f99c15852~tplv-o3syd03w52-origin-jpeg.jpeg" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;