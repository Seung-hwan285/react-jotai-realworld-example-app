"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function SingleBanner({
  user,
  comment,
  token
}) {
  const articleMeta = (0, _index.createElement)('div', 'article-meta');
  const container = document.querySelector('.article');
  const authToken = (0, _index.getLocalStroage)('token');
  const handleDeleteClick = async function (e) {
    e.preventDefault();
    const pathname = window.location.pathname;
    const pid = pathname.split('/')[2].trim();
    await _index.article_request.deleteArticle(pid, authToken);
    (0, _index.route)('/');
  };
  const render = async function () {
    const article = user.article;
    const iconName = token?.username === article.author.username ? "Delete Article" : '';
    const iconClass = token?.username === article.author.username ? "ion-trash-a" : '';
    const paintIcon = function () {
      if (iconName === 'Delete Article') {
        return " <button class=\"btn btn-outline-danger btn-sm\">\n        <i class=".concat(iconClass, "></i>\n        &nbsp; ").concat(iconName, "\n      </button>");
      } else {
        return "&nbsp;";
      }
    };
    articleMeta.innerHTML = /* HTML */"\n      <a href=\"\"><img src=".concat(article.author.image, " /></a>\n      <div class=\"info\">\n        <a href=\"\" class=\"author\">").concat(article.author.username, "</a>\n        <span class=\"date\">").concat(article.createdAt, "</span>\n      </div>\n      <button class=\"btn btn-sm btn-outline-secondary\">\n        <i class=\"ion-plus-round\"></i>\n        &nbsp; Follow Eric Simons <span class=\"counter\">(10)</span>\n      </button>\n      &nbsp;&nbsp; ").concat(paintIcon(), "\n    ");
    (0, _index.appendChildrenToParent)(container, articleMeta);
    const meta = document.querySelector('.article-meta');
    meta.addEventListener('click', handleDeleteClick);
  };
  render();
}
var _default = SingleBanner;
exports.default = _default;