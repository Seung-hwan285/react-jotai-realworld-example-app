"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth_request = void 0;
var _storage = require("../../utils/storage.js");
var _routes = require("../../utils/routes.js");
var _url = require("../../url.js");
var _cookie = require("../../utils/cookie.js");
var _jwt = require("./helper/jwt.js");
const auth_request = {
  userLogin: async function (loginData) {
    const email = loginData.email,
      password = loginData.password;
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/users/login"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        })
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.user.token;
        return token;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },
  userRegister: async function (registerData) {
    const username = registerData.username,
      email = registerData.email,
      password = registerData.password;
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/users/"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password
          }
        })
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },
  getUserInfo: async function (authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/user"), {
        method: 'GET',
        headers: (0, _jwt.getHeaders)(authToken)
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.errors);
      }
    } catch (err) {
      console.error(err);
    }
  },
  userUpdate: async function (settingData) {
    const authToken = settingData.authToken,
      username = settingData.username,
      email = settingData.email,
      bio = settingData.bio,
      imageValue = settingData.imageValue;
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/user"), {
        method: 'PUT',
        headers: (0, _jwt.getHeaders)(authToken),
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            bio: bio,
            image: imageValue
          }
        })
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  },
  userLogout: function (key) {
    (0, _storage.removeStroage)(key);
    (0, _cookie.removeCookie)('authToken');
    (0, _storage.removeSessionStroage)('selectTag');
    (0, _routes.route)('/');
  }
};
exports.auth_request = auth_request;