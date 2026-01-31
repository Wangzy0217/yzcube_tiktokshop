import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { TikTokIconSimple } from './Icons';
import { CountryCode } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const countryCodes: CountryCode[] = [
  { code: 'MY', dialCode: '+60' },
  { code: 'US', dialCode: '+1' },
  { code: 'CN', dialCode: '+86' },
  { code: 'ID', dialCode: '+62' },
  { code: 'VN', dialCode: '+84' },
  { code: 'TH', dialCode: '+66' },
  { code: 'PH', dialCode: '+63' },
  { code: 'GB', dialCode: '+44' },
];

type LoginMethod = 'phone' | 'email';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneInputFocused, setPhoneInputFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const toggleLoginMethod = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginMethod(prev => prev === 'phone' ? 'email' : 'phone');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-[400px] flex flex-col relative">
      {/* Top Link */}
      <div className="flex justify-end mb-6">
        <a 
          href="#" 
          onClick={toggleLoginMethod}
          className="text-tiktok-teal text-[13px] font-medium hover:underline"
        >
          {loginMethod === 'phone' ? t.loginEmail : t.loginPhone}
        </a>
      </div>

      <div className="space-y-6">
        {/* Input Group: Phone or Email */}
        {loginMethod === 'phone' ? (
          <div key="phone-inputs" className="space-y-2 animate-fade-in">
            <label className="block text-[14px] font-medium text-tiktok-text">
              {t.phoneNumber}
            </label>
            
            {/* Unified Input Container */}
            <div 
              className={`flex items-center w-full h-[44px] border rounded-[4px] transition-all duration-200 bg-white
                ${phoneInputFocused || isDropdownOpen ? 'border-tiktok-teal' : 'border-gray-300 hover:border-gray-400'}`}
            >
              {/* Country Selector */}
              <div className="relative h-full" ref={dropdownRef}>
                <button 
                  type="button"
                  className="flex items-center justify-between h-full px-3 gap-1 hover:bg-gray-50 transition-colors outline-none rounded-l-[4px] min-w-[100px]"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-[14px] text-tiktok-text font-normal whitespace-nowrap">
                    {selectedCountry.code} {selectedCountry.dialCode}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Separator Line */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-5 w-[1px] bg-gray-200"></div>
                
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-[240px] max-h-[280px] overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-md z-20 custom-scrollbar py-1">
                    {countryCodes.map((country) => (
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-gray-50 flex justify-between items-center transition-colors"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="text-tiktok-text">{country.code}</span>
                        <span className="text-gray-500">{country.dialCode}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneInputFocused(true)}
                onBlur={() => setPhoneInputFocused(false)}
                placeholder={t.phonePlaceholder}
                className="flex-1 h-full px-3 outline-none bg-transparent text-[14px] text-tiktok-text placeholder-gray-400"
              />
            </div>
          </div>
        ) : (
          <div key="email-inputs" className="space-y-2 animate-fade-in">
            <label className="block text-[14px] font-medium text-tiktok-text">
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full h-[44px] px-3 border border-gray-300 rounded-[4px] outline-none focus:border-tiktok-teal transition-all text-[14px] text-tiktok-text placeholder-gray-400 hover:border-gray-400"
            />
          </div>
        )}

        {/* Password Input Group */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-[14px] font-medium text-tiktok-text">
              {t.password}
            </label>
            <a href="#" className="text-[12px] text-tiktok-subtext hover:text-tiktok-teal transition-colors">
              {t.forgotPassword}
            </a>
          </div>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full h-[44px] px-3 pr-10 border border-gray-300 rounded-[4px] outline-none focus:border-tiktok-teal transition-all text-[14px] text-tiktok-text placeholder-gray-400 hover:border-gray-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* SMS Code Login - Only visible for phone login */}
        {loginMethod === 'phone' && (
          <div className="text-left pt-1 animate-fade-in">
             <a href="#" className="text-[13px] text-tiktok-subtext hover:text-tiktok-teal transition-colors">
               {t.loginSMS}
             </a>
          </div>
        )}

        {/* Buttons */}
        <div className={`space-y-4 ${loginMethod === 'email' ? 'pt-2' : 'pt-4'}`}>
          <button 
            onClick={onLogin}
            className="w-full h-[44px] bg-tiktok-teal hover:bg-tiktok-tealHover text-white font-medium rounded-[4px] transition-colors text-[14px]"
          >
            {t.login}
          </button>
          
          <div className="relative flex items-center justify-center py-1">
             <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-gray-200"></div>
             </div>
             <span className="relative bg-white px-3 text-[12px] text-tiktok-subtext">{t.or}</span>
          </div>

          <button className="w-full h-[44px] bg-[#f2f2f2] hover:bg-[#e8e8e8] text-tiktok-text font-medium rounded-[4px] flex items-center justify-center gap-2 transition-colors text-[14px]">
            <TikTokIconSimple />
            {t.loginTikTok}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;