"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
var _LoadingSpinner = _interopRequireDefault(require("../../commons/LoadingSpinner.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderSpinner() {
  const col = document.querySelector('.articles-toggle');
  const spinnerContainer = (0, _LoadingSpinner.default)();
  col.appendChild(spinnerContainer);
}
function removeSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.remove();
}
function ProfileArticle({
  feed,
  user
}) {
  const handleArticleClick = function (slug) {
    (0, _index.route)("/articles/".concat(slug));
  };
  const handleFavoriteClick = async function (e) {
    e.preventDefault();
    const slug = e.target.dataset;
    const button = e.target;
    const initialCount = button.textContent.trim();
    const deleteCount = String(Number(initialCount) - 1);
    if (button.classList.contains('clicked')) {
      return;
    }
    button.classList.add('clicked');
    if (Number(initialCount) <= 0) {
      return;
    }
    updateState({
      favoritesCount: deleteCount
    });
    button.innerHTML = /* HTML */"\n      <i class=\"ion-heart\"></i>".concat(state.favoritesCount, "\n    ");
    const set = slug.set;
    if (Number(initialCount) > 0) {
      await _index.article_request.cancelFavorite(set, (0, _index.getLocalStroage)('token'));
    }
  };
  const render = async function () {
    const col = document.querySelector('.articles-toggle');
    const username = user.username;
    const token = (0, _index.getLocalStroage)('token');
    switch (feed) {
      case 'my':
        renderSpinner();
        const _await$article_reques = await _index.article_request.getUserArticles(username, token),
          articleUsername = _await$article_reques.articles;
        updateState({
          articles: articleUsername
        });
        removeSpinner();
        break;
      case 'favorite':
        renderSpinner();
        const _await$article_reques2 = await _index.article_request.getUserFavortieArticles(username, token),
          articleFavorite = _await$article_reques2.articles;
        updateState({
          articles: articleFavorite
        });
        removeSpinner();
        break;
      default:
        renderSpinner();
        const _await$article_reques3 = await _index.article_request.getUserArticles(username, token),
          articles = _await$article_reques3.articles;
        removeSpinner();
        updateState({
          articles: articles
        });
        break;
    }
    if (Array.isArray(state.articles)) {
      state.articles.map(function ({
        body,
        author,
        favoritesCount,
        slug,
        tagList,
        title
      }) {
        const articlePreview = (0, _index.createElement)('div', 'article-preview');
        updateState({
          favoritesCount: favoritesCount
        });
        articlePreview.innerHTML = /* HTML */"\n          <div class=\"article-meta\">\n            <a href=\"\"><img src=".concat(author.image ? author.image : user.image, " /></a>\n            <div class=\"info\">\n              <a href=\"\" class=\"author\">").concat(username, "</a>\n            </div>\n            <button class=\"btn btn-outline-primary btn-sm pull-xs-right\">\n              <i class=\"ion-heart\"></i> ").concat(state.favoritesCount, "\n            </button>\n          </div>\n          <a href=\"\" class=\"preview-link\">\n            <h1>").concat(title, "</h1>\n            <p>").concat(body, "</p>\n            <span>Read more...</span>\n         ").concat(Array.isArray(tagList) && (0, _index.HomeArticleTagList)(tagList), "\n          </a>\n        </div>\n        ");
        col.appendChild(articlePreview);
        const button = articlePreview.querySelector('button');
        button.setAttribute('data-set', slug);
        button.addEventListener('click', handleFavoriteClick);
        articlePreview.addEventListener('click', function (e) {
          e.preventDefault();
          if (!e.target.classList.contains('btn') && !e.target.classList.contains('ion-heart')) {
            handleArticleClick(slug);
          }
        });
      });
    }
  };
  render();
}
const initialState = {
  articles: [],
  favoritesCount: 0
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initialState;
var _default = ProfileArticle;
exports.default = _default;