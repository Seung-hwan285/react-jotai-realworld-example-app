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
    removeElement('.editor-page');
    removeElement('.profile-page');
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
    removeElement('.editor-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  CreateArticlePage: () => {
    removeElement('.settings-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  ProfilePage: () => {
    removeElement('.editor-page');
    removeElement('.settings-page');
    removeElement('container-page');
    removeElement('.home-page');
  },
};
