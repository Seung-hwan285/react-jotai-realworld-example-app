"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
const FAVORITED_CLASS = 'btn btn-sm btn-primary pull-xs-right';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary pull-xs-right';
function HomeArticlePreview(articles, onClick) {
  const handleArticleClick = function (slug) {
    console.log(slug);
    (0, _index.route)("/articles/".concat(slug));
  };
  const handleFavoriteClick = async function (e) {
    e.preventDefault();
    const slug = e.target.dataset;
    const button = e.target;
    const initialCount = button.textContent.trim();
    if (!e.target.classList.contains('ion-heart')) {
      const updateCount = String(Number(initialCount) + 1);
      const deleteCount = String(Number(initialCount) - 1);
      const className = button.className.split(' ');
      const boolean = className[className.length - 1] === 'true';
      if (boolean) {
        updateState({
          favorited: false,
          favoritesCount: deleteCount
        });
      }
      if (!boolean) {
        updateState({
          favorited: true,
          favoritesCount: updateCount
        });
      }
      button.innerHTML = /* HTML */"\n      <i class=\"ion-heart\"></i> ".concat(state.favoritesCount, "\n    </button>");
      button.disabled = true;
      const set = slug.set;
      if (state.favorited) {
        await _index.article_request.favorite(set, (0, _index.getLocalStroage)('token'));
      } else {
        await _index.article_request.cancelFavorite(set, (0, _index.getLocalStroage)('token'));
      }
    }
  };
  const render = function () {
    const col = document.querySelector('.col-md-9');
    const spinner = document.querySelector('.spinner');
    if (Array.isArray(articles)) {
      articles.map(function ({
        author,
        createdAt,
        description,
        favorited,
        favoritesCount,
        slug,
        tagList,
        title
      }) {
        updateState({
          favorited: favorited,
          favoritesCount: favoritesCount
        });
        const article = document.createElement('div');
        article.className = 'article-preview';
        const isFavorited = state.favorited === true;
        const buttonClass = isFavorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;
        article.innerHTML = /* HTML */"\n            <div class=\"article-meta\">\n              <a href=\"profile.html\"><img src=".concat(author.image, " /></a>\n              <div class=\"info\">\n                <a href=\"\" class=\"author\">").concat(author.username, "</a>\n                <span class=\"date\">").concat(createdAt, "</span>\n              </div>\n              <button class=\"").concat(buttonClass, " ").concat(isFavorited, "\">\n                <i class=\"ion-heart\"></i> ").concat(state.favoritesCount, "\n              </button>\n            </div>\n            <a href=\"\" class=\"preview-link\">\n              <h1>").concat(title, "</h1>\n              <p>").concat(description, "</p>\n              <span>Read more...</span>\n              ").concat(Array.isArray(tagList) && (0, _index.HomeArticleTagList)(tagList), "\n            </a>\n          ");

        // wait refactoring
        col?.appendChild(article);
        spinner?.remove();
        const button = article.querySelector('button');
        const preview = article.querySelector('.preview-link');
        button.setAttribute('data-set', slug);
        button.addEventListener('click', handleFavoriteClick);
        preview.addEventListener('click', onClick);
        article.addEventListener('click', function (e) {
          e.preventDefault();
          const tag = e.target.classList.contains('tag-pill');
          const likeButton = e.target.classList.contains('btn');
          if (!tag && !likeButton) {
            handleArticleClick(slug);
          }
        });
      });
    }
  };
  render();
  return {
    handleArticleClick,
    handleFavoriteClick,
    state
  };
}
const initialState = {
  favorited: false,
  favoritesCount: 0
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initialState;
var _default = HomeArticlePreview;
exports.default = _default;