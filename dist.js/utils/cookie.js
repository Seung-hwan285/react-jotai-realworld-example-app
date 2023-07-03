"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = exports.removeCookie = exports.getCookie = void 0;
const setCookie = function (name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value?.trim() || '') + expires + '; path=/';
};
exports.setCookie = setCookie;
const getCookie = function (name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].substring(name.length + 1);
    return cookie;
  }
  return null;
};
exports.getCookie = getCookie;
const removeCookie = function (name) {
  document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
};
exports.removeCookie = removeCookie;