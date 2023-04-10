import { getLocalStroage } from '../storage.js';

export const cleanHTML = {
  HomePage: () => {
    const LoginBox = document.querySelector('.Login__Container');
    const RegisterBox = document.querySelector('.Register__Container');
    const SettingContainer = document.querySelector('.Setting__Container');

    const token = getLocalStroage('token');
    if (SettingContainer && token) {
      SettingContainer.innerHTML = '';
      SettingContainer.remove();
    }

    if (RegisterBox) {
      RegisterBox.innerHTML = '';
      RegisterBox.remove();
    }
    if (LoginBox) {
      LoginBox.innerHTML = '';
      LoginBox.remove();
    }
  },
  LoginPage: () => {
    const Banner = document.querySelector('.Banner__Container');
    const registerBox = document.querySelector('.Register__Container');
    if (Banner) {
      Banner.innerHTML = '';
      Banner.remove();
    }
    if (registerBox) {
      registerBox.remove();
    }
  },
  RegisterPage: () => {
    const Banner = document.querySelector('.Banner__Container');
    const Login = document.querySelector('.Login__Container');

    if (Login) {
      Login.innerHTML = '';
      Login.remove();
    }
    if (Banner) {
      Banner.innerHTML = '';
      Banner.remove();
    }
  },
  SettingPage: () => {
    const Banner = document.querySelector('.Banner__Container');

    if (Banner) {
      Banner.innerHTML = '';
      Banner.remove();
    }
  },
};
