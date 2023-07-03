"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.article_request = void 0;
var _url = require("../../url.js");
var _jwt = require("../auth/helper/jwt.js");
var _storage = require("../../utils/storage.js");
const article_request = {
  getAllArticles: async function (offset, authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles?offset=").concat(offset), {
        method: 'GET',
        headers: (0, _jwt.getHeaders)(authToken)
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
  getSingleArticle: async function (slug) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug), {
        method: 'GET'
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
  getTagArticles: async function (tag, limit = 20) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles?tag=").concat(tag), {
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
  createArticle: async function (articleData) {
    const title = articleData.title,
      description = articleData.description,
      body = articleData.body,
      tagList = articleData.tagList,
      authToken = articleData.authToken;
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles"), {
        method: 'POST',
        headers: (0, _jwt.getHeaders)(authToken),
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList
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
  favorite: async function (slug, authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug, "/favorite"), {
        method: 'POST',
        headers: (0, _jwt.getHeaders)(authToken)
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
  cancelFavorite: async function (slug, authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(slug, "/favorite"), {
        method: 'DELETE',
        headers: (0, _jwt.getHeaders)(authToken)
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
  getUserFavortieArticles: async function (author, authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles?favorited=").concat(author, "&offset=0"), {
        method: 'GET',
        headers: (0, _jwt.getHeaders)(authToken)
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
  getUserArticles: async function (author, authToken) {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/articles?author=").concat(author, "&offset=0"), {
        method: 'GET',
        headers: (0, _jwt.getHeaders)(authToken)
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
  deleteArticle: async function (pid, authToken) {
    try {
      await fetch("".concat(_url.API_END_POINT, "/api/articles/").concat(pid), {
        method: 'DELETE',
        headers: (0, _jwt.getHeaders)(authToken)
      });
    } catch (err) {
      console.error(err);
    }
  }
};
exports.article_request = article_request;