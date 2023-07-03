"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag_request = void 0;
var _url = require("../../url.js");
const tag_request = {
  getTagsList: async function () {
    try {
      const response = await fetch("".concat(_url.API_END_POINT, "/api/tags"), {
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
  }
};
exports.tag_request = tag_request;