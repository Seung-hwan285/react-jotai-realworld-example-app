"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment_request = void 0;
var _url = require("../../url.js");
var _jwt = require("../auth/helper/jwt.js");
var _storage = require("../../utils/storage.js");
const comment_request = {
  getComments: async function (slug) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug, "/comments"), {
        method: 'GET',
        headers: (0, _jwt.getHeaders)((0, _storage.getLocalStroage)('token'))
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
  deleteComment: async function (slug, id) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug, "/comments/").concat(id), {
        method: 'DELETE',
        headers: (0, _jwt.getHeaders)((0, _storage.getLocalStroage)('token'))
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
  createComment: async function (slug, body) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug, "/comments"), {
        method: 'POST',
        headers: (0, _jwt.getHeaders)((0, _storage.getLocalStroage)('token')),
        body: JSON.stringify({
          comment: {
            body: body
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
  }
};
exports.comment_request = comment_request;