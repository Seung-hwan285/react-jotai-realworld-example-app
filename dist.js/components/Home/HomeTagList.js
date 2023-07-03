"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.updateArticleByTag = updateArticleByTag;
var _LoadingSpinner = _interopRequireDefault(require("../../commons/LoadingSpinner.js"));
var _index = require("./index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderSidebar() {
  const row = document.querySelector('.row');
  const col = document.querySelector('.col-md-3');
  col.innerHTML = "\n    <div class=\"sidebar\">\n        <p>Popular Tags</p>\n        <div class=\"sidebar tag-list\"></div>\n    </div>\n  ";
  row.appendChild(col);
}
function renderTagList(tags) {
  const tagList = document.querySelector('.sidebar .tag-list');
  tagList.innerHTML = tags.map(function (tag) {
    return (/* HTML*/"\n       <p class=\"tag-pill tag-default\">".concat(tag, "</a>\n    ")
    );
  }).join('');
}
async function updateArticleByTag(tag, handleFeedClick, handleTagClick) {
  const _await$article_reques = await _index.article_request.getTagArticles(tag),
    tagArticles = _await$article_reques.articles;
  updateState({
    activeFeed: 'getTag',
    articles: tagArticles,
    onClick: handleFeedClick
  });
  (0, _index.HomeFeed)(state);
  (0, _index.HomeArticlePreview)(state.articles, handleTagClick);
}
function HomeTagList({
  onClickFeed,
  onClickTag
}) {
  const row = document.querySelector('.row');
  const col = (0, _index.createElement)('div', 'col-md-3');
  (0, _index.appendChildrenToParent)(row, col);
  if (document.querySelector('.col-md-3')) {
    document.querySelector('.col-md-3').remove();
    row.appendChild(col);
  }
  renderSidebar();
  const handleTagClick = async function (e) {
    e.preventDefault();
    const tag = e.target.textContent.trim();
    (0, _index.setSessionStroage)('selectTag', tag);
    await updateArticleByTag(tag, onClickFeed, onClickTag);
  };
  const render = async function () {
    const tagList = document.querySelector('.sidebar .tag-list');
    const spinner = (0, _LoadingSpinner.default)();
    tagList.appendChild(spinner);
    const _await$tag_request$ge = await _index.tag_request.getTagsList(),
      tags = _await$tag_request$ge.tags;
    renderTagList(tags);
    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', handleTagClick);
  };
  render();
  return {
    render,
    handleTagClick
  };
}
const initialState = {
  articles: [],
  activeFeed: ''
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initialState;
var _default = HomeTagList;
exports.default = _default;