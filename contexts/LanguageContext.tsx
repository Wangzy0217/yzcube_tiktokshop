import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../types';

const translations: Record<Language, Translations> = {
  'en-US': {
    academy: 'Academy',
    contactUs: 'Contact us',
    login: 'Log in',
    signUp: 'Sign up',
    noAccount: 'Don\'t have an account yet?',
    loginEmail: 'Log in with email',
    loginPhone: 'Log in with phone number',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email address',
    phoneNumber: 'Phone number',
    phonePlaceholder: 'Enter your phone number',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot the password?',
    loginSMS: 'Log in with SMS Code',
    or: 'or',
    loginTikTok: 'Log in with TikTok account',
    sellerCenter: 'Seller Center',
    help: 'Help'
  },
  'zh-CN': {
    academy: '学院',
    contactUs: '联系我们',
    login: '登录',
    signUp: '注册',
    noAccount: '还没有账号？',
    loginEmail: '邮箱登录',
    loginPhone: '手机号码登录',
    emailLabel: '邮箱',
    emailPlaceholder: '请输入邮箱地址',
    phoneNumber: '手机号码',
    phonePlaceholder: '请输入手机号码',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    forgotPassword: '忘记密码？',
    loginSMS: '验证码登录',
    or: '或',
    loginTikTok: 'TikTok账号登录',
    sellerCenter: '卖家中心',
    help: '帮助'
  },
  'th-TH': {
    academy: 'Academy',
    contactUs: 'ติดต่อเรา',
    login: 'เข้าสู่ระบบ',
    signUp: 'ลงทะเบียน',
    noAccount: 'ยังไม่มีบัญชีใช่ไหม?',
    loginEmail: 'เข้าสู่ระบบด้วยอีเมล',
    loginPhone: 'เข้าสู่ระบบด้วยหมายเลขโทรศัพท์',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'ป้อนที่อยู่อีเมลของคุณ',
    phoneNumber: 'หมายเลขโทรศัพท์',
    phonePlaceholder: 'ป้อนหมายเลขโทรศัพท์',
    password: 'รหัสผ่าน',
    passwordPlaceholder: 'ป้อนรหัสผ่าน',
    forgotPassword: 'ลืมรหัสผ่าน?',
    loginSMS: 'เข้าสู่ระบบด้วย SMS',
    or: 'หรือ',
    loginTikTok: 'เข้าสู่ระบบด้วย TikTok',
    sellerCenter: 'Seller Center',
    help: 'ช่วยเหลือ'
  },
  'ms-MY': {
    academy: 'Akademi',
    contactUs: 'Hubungi kami',
    login: 'Log masuk',
    signUp: 'Daftar',
    noAccount: 'Tiada akaun?',
    loginEmail: 'Log masuk e-mel',
    loginPhone: 'Log masuk nombor telefon',
    emailLabel: 'E-mel',
    emailPlaceholder: 'Masukkan alamat e-mel',
    phoneNumber: 'Nombor telefon',
    phonePlaceholder: 'Masukkan nombor telefon',
    password: 'Kata laluan',
    passwordPlaceholder: 'Masukkan kata laluan',
    forgotPassword: 'Lupa kata laluan?',
    loginSMS: 'Log masuk SMS',
    or: 'atau',
    loginTikTok: 'Log masuk dengan TikTok',
    sellerCenter: 'Seller Center',
    help: 'Bantuan'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en-US');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};