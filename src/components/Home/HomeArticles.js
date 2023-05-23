import LoadingSpinner from '../../commons/LoadingSpinner.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import { article_request } from '../../lib/article/request.js';
import { getNextPageIndex } from '../../utils/helper/mainPagination.js';
import { getLocalStroage } from '../../utils/storage.js';
import {
  appendChildrenToParent,
  createElement,
  domRemove,
} from '../../utils/helper/dom.js';

export function renderPageNumberLink(
  nav,
  activePage,
  pageNumber,
  pageSize = 14
) {
  const startIndex = activePage <= 10 ? 0 : 14;
  const endIndex = Math.min(startIndex + pageSize, pageNumber.length);
  const currentPageNumbers = pageNumber.slice(startIndex, endIndex);

  if (pageNumber) {
    currentPageNumbers.forEach((link, idx) => {
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

async function updateArticles(activePage, pageNumberList) {
  const col = document.querySelector('.col-md-9');
  const nav = document.querySelector('.pagination');
  const ul = document.querySelector('.main-pagination');

  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);

  domRemove(document.querySelectorAll('.page-item'));
  domRemove(document.querySelectorAll('.article-preview'));

  const authToken = getLocalStroage('token');
  const { articles } = await article_request.getAllArticles(
    activePage === 1 ? 0 : activePage + 10,
    authToken
  );

  spinnerContainer.remove();
  HomeArticlePreview(articles);
  renderPageNumberLink(nav, activePage, pageNumberList);

  if (activePage > 0) {
    window.history.pushState({}, '', `?page=${activePage}`);
  }
}

function HomeArticles({ pageNumber, articles, onClick }) {
  const col = document.querySelector('.col-md-9');

  const nav = createElement('nav', 'main-pagination');
  const ul = createElement('div', 'pagination');
  appendChildrenToParent(nav, ul);

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;
    const newPageIndex = getNextPageIndex(textContent, activePage);
    await updateArticles(newPageIndex, pageNumber);
  };

  const render = async () => {
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;

    window.history.pushState({}, '', `?page=${activePage}`);
    const spinnerContainer = LoadingSpinner();
    col.appendChild(spinnerContainer);

    if (articles) {
      HomeArticlePreview(articles, onClick);
      renderPageNumberLink(ul, activePage, pageNumber);
    }
    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();

  return { render };
}

export default HomeArticles;
