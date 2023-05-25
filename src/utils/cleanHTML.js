const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
  return undefined;
};

// Refactoring the spa router method
export const cleanHTML = {
  HomePage: () => {
    removeElement('.auth-page');
    removeElement('.container-page');
    removeElement('.settings-page');
    removeElement('.editor-page');
    removeElement('.profile-page');
    removeElement('.article-page');
  },
  LoginPage: () => {
    removeElement('.home-page');
    removeElement('.auth-page');
    removeElement('.article-page');
  },
  RegisterPage: () => {
    removeElement('.home-page');
    removeElement('.auth-page');
    removeElement('.article-page');
  },
  SettingPage: () => {
    removeElement('.article-page');
    removeElement('.editor-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  CreateArticlePage: () => {
    removeElement('.article-page');
    removeElement('.settings-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  ProfilePage: () => {
    removeElement('.article-page');
    removeElement('.editor-page');
    removeElement('.settings-page');
    removeElement('container-page');
    removeElement('.home-page');
  },
  SinglePage: () => {
    removeElement('.home-page');
  },
};
