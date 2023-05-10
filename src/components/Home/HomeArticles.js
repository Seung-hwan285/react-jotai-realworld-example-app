import LoadingSpinner from '../../commons/LoadingSpinner.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import { article_request } from '../../lib/article/request.js';
import {
  domRemove,
  getNextPageIndex,
} from '../../utils/helper/mainPagination.js';
import { getLocalStroage } from '../../utils/storage.js';

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
          if (idx >= 2 && idx <= 8) {
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
    return nav;
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
    state.activePage === 1 ? 0 : state.activePage + 10,
    authToken
  );

  spinnerContainer.remove();

  HomeArticlePreview(articles);

  const pagination = renderPageNumberLink(nav, activePage, pageNumberList);

  ul.appendChild(pagination);
  if (state.activePage > 0) {
    window.history.pushState({}, '', `?page=${state.activePage}`);
  }
}

function HomeArticles({ activePage, pageNumber, articles }) {
  console.log(activePage);
  const col = document.querySelector('.col-md-9');
  const nav = document.createElement('nav');
  nav.className = 'main-pagination';
  const ul = document.createElement('nav');
  ul.className = 'pagination';
  nav.appendChild(ul);

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;

    const newPageIndex = getNextPageIndex(textContent, activePage);

    updateState({ activePage: newPageIndex });
    await updateArticles(state.activePage, pageNumber);
  };

  const render = async () => {
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;

    window.history.pushState({}, '', `?page=${activePage}`);
    const spinnerContainer = LoadingSpinner();
    col.appendChild(spinnerContainer);

    const spinner = document.querySelector('.spinner');

    if (articles) {
      setTimeout(() => {
        HomeArticlePreview(articles);
        renderPageNumberLink(ul, activePage, pageNumber);
      }, 1500);
    }
    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();

  return { render };
}

const initialState = {
  activePage: 1,
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};

let state = initialState;

export default HomeArticles;
