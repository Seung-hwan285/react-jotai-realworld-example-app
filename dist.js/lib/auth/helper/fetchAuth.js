"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAuthUserInfo = void 0;
var _request = require("../request.js");
const fetchAuthUserInfo = async function (authToken) {
  if (authToken) {
    const data = await _request.auth_request.getUserInfo(authToken);
    return data.user;
  }
};
exports.fetchAuthUserInfo = fetchAuthUserInfo;