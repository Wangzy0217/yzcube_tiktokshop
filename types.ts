export interface CountryCode {
  code: string;
  dialCode: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Language = 'en-US' | 'zh-CN' | 'th-TH' | 'ms-MY';

export interface Translations {
  academy: string;
  contactUs: string;
  login: string;
  signUp: string;
  noAccount: string;
  loginEmail: string;
  loginPhone: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneNumber: string;
  phonePlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  loginSMS: string;
  or: string;
  loginTikTok: string;
  sellerCenter: string;
  help: string;
}