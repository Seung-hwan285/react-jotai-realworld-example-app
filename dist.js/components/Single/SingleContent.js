"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function SingleContent({
  article
}) {
  const page = (0, _index.createElement)('div', 'container page');
  const render = function () {
    const singleContainerElement = document.querySelector('.article-page');
    page.innerHTML = /* HTML */" <div class=\"row article-content\">\n      <div class=\"col-md-12\">\n        <h2 id=\"introducing-ionic\">".concat(article.title, "</h2>\n        <p>").concat(article.body, "</p>\n      </div>\n\n      <ul class=\"tag-list\">\n        ").concat(article.tagList && article.tagList.map(function (tag) {
      return "<li class=\"tag-default tag-pill tag-outline\">".concat(tag, "</li>");
    }).join(''), "\n      </ul>\n    </div>");
    (0, _index.appendChildrenToParent)(singleContainerElement, page);
  };
  render();
}
var _default = SingleContent;
exports.default = _default;