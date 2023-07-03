"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _storage = require("../../utils/storage.js");
var _index = require("./index.js");
var _LoadingSpinner = _interopRequireDefault(require("../../commons/LoadingSpinner.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderHomeMain() {
  const homeContainer = document.querySelector('.home-page');
  const container = (0, _index.createElement)('div', 'container page');
  const row = (0, _index.createElement)('div', 'row');
  const col = (0, _index.createElement)('div', 'col-md-9');
  (0, _index.appendChildrenToParent)(row, col);
  (0, _index.appendChildrenToParent)(container, row);
  (0, _index.appendChildrenToParent)(homeContainer, container);
}
async function getArticlesPromise() {
  const getTag = (0, _storage.getSessionStroage)('selectTag');
  const token = (0, _storage.getLocalStroage)('token');
  const parms = new URLSearchParams(window.location.search);
  const activePage = Number(parms.get('page') || 1);
  switch (state.activeFeed) {
    case 'global':
      const _await$article_reques = await _index.article_request.getAllArticles(activePage === 1 ? 0 : activePage + 10, !!token && token),
        articles = _await$article_reques.articles;
      updateState({
        articles: articles,
        pageNumber: (0, _index.createPageNumberList)()
      });
      break;
    case 'getTag':
      const _await$article_reques2 = await _index.article_request.getTagArticles(getTag),
        tagArticles = _await$article_reques2.articles;
      updateState({
        articles: tagArticles,
        pageNumber: []
      });
      break;
    case 'your':
      updateState({
        articles: [],
        pageNumber: []
      });
      if (!token) {
        const _await$article_reques3 = await _index.article_request.getAllArticles(token),
          articles = _await$article_reques3.articles;
        updateState({
          activeFeed: 'global',
          articles: articles
        });
      }
      break;
    default:
      break;
  }
  return state.articles;
}
function HomeMain() {
  renderHomeMain();
  const handleTagListClick = function (e) {
    if (e.target.classList.contains('tag-pill')) {
      const tag = e.target.textContent.trim();
      (0, _storage.setSessionStroage)('selectTag', tag);
      updateState({
        activeFeed: 'getTag'
      });
      render();
    }
  };
  const handleFeedClick = async function (e) {
    e.preventDefault();
    const getTag = (0, _storage.getSessionStroage)('selectTag');
    const textContent = e.target.textContent.trim();
    const feeds = [{
      text: 'Global Feed',
      feed: 'global'
    }, {
      text: "#".concat(getTag && getTag.trim()),
      feed: 'getTag'
    }, {
      text: 'Your Feed',
      feed: 'your'
    }];
    const findFeed = feeds.find(function (feed) {
      return feed.text === textContent;
    });
    if (findFeed) {
      updateState({
        activeFeed: findFeed.feed
      });
    }
    render();
  };
  const render = async function () {
    const articlesPromise = getArticlesPromise();

    // setCookie('token', JSON.stringify(authToken), 7);

    (0, _index.HomeFeed)({
      activeFeed: state.activeFeed,
      onClick: handleFeedClick
    });
    (0, _index.HomeArticles)({
      articles: []
    });
    const spinner = (0, _LoadingSpinner.default)();
    const col = document.querySelector('.col-md-9');
    col.appendChild(spinner);
    await articlesPromise;
    (0, _index.HomeArticles)({
      pageNumber: state.pageNumber,
      articles: state.articles,
      onClick: handleTagListClick
    });
  };
  render();
  const initTags = function () {
    (0, _index.HomeTagList)({
      onClickFeed: handleFeedClick,
      onClickTag: handleTagListClick
    });
  };
  initTags();
  return {
    render
  };
}
const initalState = {
  activeFeed: 'global',
  articles: [],
  pageNumber: []
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initalState;
var _default = HomeMain;
exports.default = _default;