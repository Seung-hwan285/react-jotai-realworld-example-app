"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSessionStroage = exports.setLocalStroage = exports.removeStroage = exports.removeSessionStroage = exports.getSessionStroage = exports.getLocalStroage = void 0;
const setLocalStroage = function (key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};
exports.setLocalStroage = setLocalStroage;
const getLocalStroage = function (key) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.error(err);
  }
};
exports.getLocalStroage = getLocalStroage;
const removeStroage = function (key) {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};
exports.removeStroage = removeStroage;
const setSessionStroage = function (key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};
exports.setSessionStroage = setSessionStroage;
const getSessionStroage = function (key) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.error(err);
  }
};
exports.getSessionStroage = getSessionStroage;
const removeSessionStroage = function (key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};
exports.removeSessionStroage = removeSessionStroage;