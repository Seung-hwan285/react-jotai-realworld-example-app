import { getLocalStroage } from '../storage.js';

export const cleanHTML = {
  HomePage: () => {
    document.querySelector('.auth-page')?.remove();
    document.querySelector('.container-page')?.remove();
    const SettingContainer = document.querySelector('.Setting__Container');

    const token = getLocalStroage('token');
    if (SettingContainer && token) {
      SettingContainer.innerHTML = '';
      SettingContainer.remove();
    }
  },
  LoginPage: () => {
    document.querySelector('.home-page')?.remove();
    document.querySelector('.auth-page')?.remove();
  },
  RegisterPage: () => {
    document.querySelector('.home-page')?.remove();
    document.querySelector('.auth-page')?.remove();
  },
  SettingPage: () => {
    document.querySelector('.Home__Container')?.remove();
  },
};
