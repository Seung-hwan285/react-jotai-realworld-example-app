"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJwtToken = exports.getHeaders = void 0;
const getHeaders = function (authToken) {
  const baseHeaders = {
    'Content-Type': 'application/json'
  };
  if (authToken) {
    isJwtToken(authToken);
    baseHeaders.Authorization = "Token ".concat(encodeURIComponent(authToken));
  }
  return baseHeaders;
};
exports.getHeaders = getHeaders;
const isJwtToken = function (authToken) {
  const parts = authToken.split('.');
  if (parts.length !== 3) {
    return false;
  }
  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      return false;
    }
    if (!payload.email || !payload.username || !payload.idt || !payload.exp) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
exports.isJwtToken = isJwtToken;