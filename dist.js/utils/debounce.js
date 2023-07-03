"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = void 0;
const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function () {
      func.apply(null, args);
    }, delay);
  };
};
exports.debounce = debounce;