"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.renderPageNumberLink = renderPageNumberLink;
exports.updateArticles = updateArticles;
var _index = require("./index.js");
var _LoadingSpinner = _interopRequireDefault(require("../../commons/LoadingSpinner.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderPageNumberLink(nav, activePage, pageNumberList, pageSize = 14) {
  const startIndex = activePage <= 10 ? 0 : 14;
  const endIndex = Math.min(startIndex + pageSize, pageNumberList.length);
  const currentPageNumbers = pageNumberList.slice(startIndex, endIndex);
  if (pageNumberList) {
    currentPageNumbers.forEach(function (link, idx) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      switch (true) {
        case idx === 2 && activePage === 1:
          li.classList.add('active');
          break;
        case activePage <= 10 && idx === activePage + 1:
          li.classList.add('active');
          break;
        case activePage === 20:
          if (idx === 11) {
            li.classList.add('active');
          }
          break;
        case activePage > 10 && currentPageNumbers[idx] === activePage:
          if (idx >= 2 && idx <= 10) {
            li.classList.add('active');
          }
          break;
        default:
          break;
      }
      const a = document.createElement('a');
      a.classList.add('page-link');
      a.textContent = link;
      li.appendChild(a);
      nav.appendChild(li);
    });
  }
}
async function updateArticles(activePage, pageNumberList, onClick) {
  const col = document.querySelector('.col-md-9');
  const nav = document.querySelector('.pagination');
  const spinner = (0, _LoadingSpinner.default)();
  col.appendChild(spinner);
  (0, _index.domRemove)(document.querySelectorAll('.page-item'));
  (0, _index.domRemove)(document.querySelectorAll('.article-preview'));
  const authToken = (0, _index.getLocalStroage)('token');
  const _await$article_reques = await _index.article_request.getAllArticles(activePage === 1 ? 0 : activePage + 10, authToken),
    articles = _await$article_reques.articles;
  console.log(articles);
  spinner.remove();
  (0, _index.HomeArticlePreview)(articles, onClick);
  renderPageNumberLink(nav, activePage, pageNumberList);
  if (activePage > 0) {
    window.history.pushState({}, '', "?page=".concat(activePage));
  }
}
function HomeArticles({
  pageNumber,
  articles,
  onClick
}) {
  const col = document.querySelector('.col-md-9');
  const nav = (0, _index.createElement)('nav', 'main-pagination');
  const ul = (0, _index.createElement)('div', 'pagination');
  (0, _index.appendChildrenToParent)(nav, ul);
  const handleNextPageClick = async function (e) {
    const textContent = e.target.textContent;
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;
    const newPageIndex = (0, _index.getNextPageIndex)(textContent, activePage);
    await updateArticles(newPageIndex, pageNumber, onClick);
  };
  const render = async function () {
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;
    window.history.pushState({}, '', "?page=".concat(activePage));
    if (articles) {
      (0, _index.HomeArticlePreview)(articles, onClick);
      renderPageNumberLink(ul, activePage, pageNumber);
      col?.appendChild(nav);
    }
    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };
  render();
  return render;
}
var _default = HomeArticles;
exports.default = _default;