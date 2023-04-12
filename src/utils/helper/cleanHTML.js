import { getLocalStroage } from '../storage.js';

export const cleanHTML = {
  HomePage: () => {
    document.querySelector('.Login__Container')?.remove();
    document.querySelector('.Register__Container')?.remove();
    const SettingContainer = document.querySelector('.Setting__Container');

    const token = getLocalStroage('token');
    if (SettingContainer && token) {
      SettingContainer.innerHTML = '';
      SettingContainer.remove();
    }
  },
  LoginPage: () => {
    document.querySelector('.Home__Container')?.remove();
    document.querySelector('.Register__Container')?.remove();
  },
  RegisterPage: () => {
    document.querySelector('.Home__Container')?.remove();
    document.querySelector('.Login__Container')?.remove();
  },
  SettingPage: () => {
    document.querySelector('.Home__Container')?.remove();
  },
};
