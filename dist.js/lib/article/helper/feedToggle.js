"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTagNavPillsHtml = void 0;
const createTagNavPillsHtml = function (items) {
  return items.map(function ({
    text
  }) {
    return "\n      <li class=\"nav-item\">\n        <a class = \"nav-link \" href=\"\">".concat(text, "</a>\n      </li>\n    ");
  }).join('');
};
exports.createTagNavPillsHtml = createTagNavPillsHtml;