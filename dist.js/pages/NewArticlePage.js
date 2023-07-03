"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderNewArticle(target) {
  const newArticleContainer = (0, _index.createElement)('div', 'editor-page');
  const newArticleWrapper = (0, _index.createElement)('div', 'container page');
  const newArticleRow = (0, _index.createElement)('div', 'row');
  const newArticleCol = (0, _index.createElement)('div', 'col-md-10 offset-md-1 col-xs-1');
  (0, _index.appendChildrenToParent)(newArticleRow, newArticleCol);
  (0, _index.appendChildrenToParent)(newArticleWrapper, newArticleRow);
  (0, _index.appendChildrenToParent)(newArticleContainer, newArticleWrapper);
  (0, _index.appendChildrenToParent)(target, newArticleContainer);
}
function NewArticlePage(target) {
  _index.cleanHTML.CreateArticlePage();
  renderNewArticle(target);
  const render = function () {
    (0, _index.NewArticleForm)();
  };
  render();
}
var _default = NewArticlePage;
exports.default = _default;