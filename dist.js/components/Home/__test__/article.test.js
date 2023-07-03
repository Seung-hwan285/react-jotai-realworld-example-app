"use strict";

var _mainPagination = require("../../../lib/article/helper/mainPagination");
var _HomeArticles = _interopRequireWildcard(require("../HomeArticles"));
var _request = require("../../../lib/article/request");
var _index = require("../index");
var _history = require("history");
var _jsdom = require("jsdom");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
describe('HomeArticle', function () {
  let nav;
  let activePage;
  let pageNumberList;
  const symbols1 = ['<<', '<'];
  const symbols2 = ['>', '>>'];
  beforeEach(function () {
    nav = document.createElement('nav');
    activePage = 1;
    pageNumberList = [].concat(symbols1, _toConsumableArray(Array.from({
      length: 10
    }, function (val, idx) {
      return idx + 1;
    })), symbols2, symbols1, _toConsumableArray(Array.from({
      length: 10
    }, function (val, idx) {
      return idx + 11;
    })), symbols2);
    document.body.innerHTML = "\n      <div class=\"col-md-9\"></div>\n      <nav class=\"pagination\"></nav>\n    ";
  });
  const articleMock = [{
    author: {
      bio: 'hi',
      following: false,
      image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
      username: 'fsda22'
    },
    body: 'test_bio',
    createdAt: '2023-07-01T08:39:33.602Z',
    description: 'test',
    favorited: false,
    favoritesCount: 0,
    slug: 'test_title-158960',
    tagList: ['test_tag'],
    title: 'test_title',
    updatedAt: '2023-07-01T08:39:33.602Z'
  }];
  afterEach(function () {
    nav = null;
    activePage = null;
    pageNumberList = null;
  });
  test('returns getNextPageIndex', function () {
    expect((0, _mainPagination.getNextPageIndex)('<<', 3)).toBe(1);
    expect((0, _mainPagination.getNextPageIndex)('>>', 3)).toBe(20);
    expect((0, _mainPagination.getNextPageIndex)('<', 5)).toBe(4);
    expect((0, _mainPagination.getNextPageIndex)('>', 5)).toBe(6);
    expect((0, _mainPagination.getNextPageIndex)(7, 5)).toBe(7);
  });
  test('returns createPageNumberList', function () {
    expect((0, _mainPagination.createPageNumberList)()).toEqual(pageNumberList);
  });
  test('returns renderPageNumberLink for activePage 20', function () {
    activePage = 20;
    (0, _HomeArticles.renderPageNumberLink)(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');
    expect(li.length).toEqual(14);
    expect(li[11].classList.contains('active')).toBe(true);
  });
  test('returns renderPageNumberLink for activePage 1', function () {
    activePage = 1;
    (0, _HomeArticles.renderPageNumberLink)(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');
    expect(li.length).toEqual(14);
    expect(li[2].classList.contains('active')).toBe(true);
  });
  test('removes all page item and article-preview', async function () {
    const col = document.querySelector('.col-md-9');
    const articlesMock = ['article1', 'article2'];
    jest.spyOn(_request.article_request, 'getAllArticles').mockReturnValue(articlesMock);
    const onClick = jest.fn();
    await (0, _HomeArticles.updateArticles)(1, pageNumberList, onClick);
    expect(col.querySelectorAll('.page-item').length).toBe(0);
    expect(col.querySelectorAll('.article-preview').length).toBe(0);
  });
  test('updates history pathname on article click', async function () {
    const onClick = jest.fn();
    const homeArticlePreview = new _index.HomeArticlePreview(articleMock, onClick);
    const slug = homeArticlePreview.slug,
      handleArticleClick = homeArticlePreview.handleArticleClick;
    handleArticleClick(slug);
    const history = (0, _history.createMemoryHistory)();
    const baseUrl = 'http://localhost:5000';
    history.push("".concat(baseUrl, "/article/").concat(slug));
    expect(history.location.pathname).toEqual("".concat(baseUrl, "/article/").concat(slug));
  });

  // jsdom broken error
  /**
   * @jest-environment node
   */
  test('updates state on favorite click', function () {
    const _JSDOM = new _jsdom.JSDOM('<html><body></body></html>'),
      dom = _JSDOM.document;
    const onClick = jest.fn();
    const homeArticlePreview = new _index.HomeArticlePreview(articleMock, onClick);
    const state = homeArticlePreview.state,
      slug = homeArticlePreview.slug,
      handleFavoriteClick = homeArticlePreview.handleFavoriteClick;
    const button = document.createElement('button');
    button.className = 'ion-heart';
    button.textContent = state.favoritesCount;
    button.dataset.slug = JSON.stringify(slug);
    document.body.appendChild(button);
    button.addEventListener('click', handleFavoriteClick);
    setTimeout(function () {
      const event = new dom.window.Event('click');
      button.dispatchEvent(event);
      expect(state.favorited).toBe(true);
      expect(state.favoritesCount).toBe('1');
    }, 0);
  });
});