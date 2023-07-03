"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanHTML = void 0;
const removeElement = function (selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
  return undefined;
};

// Refactoring the spa router method
const cleanHTML = {
  HomePage: function () {
    removeElement('.auth-page');
    removeElement('.container-page');
    removeElement('.settings-page');
    removeElement('.editor-page');
    removeElement('.profile-page');
    removeElement('.article-page');
  },
  LoginPage: function () {
    removeElement('.home-page');
    removeElement('.auth-page');
    removeElement('.article-page');
  },
  RegisterPage: function () {
    removeElement('.home-page');
    removeElement('.auth-page');
    removeElement('.article-page');
  },
  SettingPage: function () {
    removeElement('.article-page');
    removeElement('.editor-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  CreateArticlePage: function () {
    removeElement('.article-page');
    removeElement('.settings-page');
    removeElement('.home-page');
    removeElement('.profile-page');
  },
  ProfilePage: function () {
    removeElement('.article-page');
    removeElement('.editor-page');
    removeElement('.settings-page');
    removeElement('.container-page');
    removeElement('.home-page');
    removeElement('.article-page');
  },
  SinglePage: function () {
    removeElement('.home-page');
    removeElement('.profile-page');
  }
};
exports.cleanHTML = cleanHTML;