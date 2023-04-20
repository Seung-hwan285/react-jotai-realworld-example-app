import { getLocalStroage } from '../storage.js';

const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
  return undefined;
};

export const cleanHTML = {
  HomePage: () => {
    removeElement('.auth-page');
    removeElement('.container-page');
    removeElement('.settings-page');
  },
  LoginPage: () => {
    removeElement('.home-page');
    removeElement('.auth-page');
  },
  RegisterPage: () => {
    removeElement('.home-page');
    removeElement('.auth-page');
  },
  SettingPage: () => {
    removeElement('.home-page');
  },
};
