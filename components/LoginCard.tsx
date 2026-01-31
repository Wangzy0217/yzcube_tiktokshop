import React from 'react';
import LoginForm from './LoginForm';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginCardProps {
  onLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1100px] px-4 md:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-8 md:mt-10 px-2">
        <h1 className="text-[24px] font-bold text-[#161823] mb-2 sm:mb-0">{t.login}</h1>
        <div className="text-[14px] text-[#161823]">
          {t.noAccount} <a href="#" className="text-tiktok-teal font-medium hover:underline ml-1">{t.signUp}</a>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e8e8e8] p-6 md:p-10 lg:p-14 flex flex-col md:flex-row items-center gap-12 lg:gap-20 min-h-[520px]">
        
        {/* Illustration Section */}
        <div className="hidden md:flex flex-1 justify-center items-center h-full w-full">
           <div className="relative w-full max-w-[360px]">
             {/* Updated asset using provided URL */}
              <img 
                src="https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/atlas/account/page/account_login_sea/assets/br_login_icon.hk7zd5fo.svg" 
                alt="Seller Center Illustration" 
                className="w-full h-auto object-contain"
              />
           </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] bg-[#f0f0f0] self-stretch mx-4"></div>

        {/* Form Section */}
        <div className="flex-1 flex justify-center w-full md:w-auto">
          <LoginForm onLogin={onLogin} />
        </div>

      </div>

      {/* Footer / Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default LoginCard;