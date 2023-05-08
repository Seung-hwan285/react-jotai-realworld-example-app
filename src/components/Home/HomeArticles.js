import LoadingSpinner from '../../commons/LoadingSpinner.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import { article_request } from '../../lib/article/request.js';
import {
  domRemove,
  getNextPageIndex,
} from '../../utils/helper/mainPagination.js';

export function renderPageNumberLink(nav, activePage) {
  const links = [
    '<<',
    '<',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '>',
    '>>',
  ];
  links.forEach((link, idx) => {
    const li = document.createElement('li');
    li.classList.add('page-item');

    switch (true) {
      case idx === 2 && activePage === 1:
        li.classList.add('active');
        break;
      case activePage + 1 === idx && idx !== 1:
        li.classList.remove('active');
        li.classList.add('active');
        break;
      case activePage === '>':
        if (idx === 11) {
          li.classList.add('active');
        }
        break;
      case activePage === '<':
        if (idx === 2) {
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

async function updateArticles() {
  const col = document.querySelector('.col-md-9');
  const nav = document.querySelector('.pagination');
  const ul = document.querySelector('.main-pagination');

  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);

  domRemove(document.querySelectorAll('.page-item'));
  domRemove(document.querySelectorAll('.article-preview'));

  const data = await article_request.getAllArticles(state.activePage);

  spinnerContainer.remove();
  updateState({
    articles: data,
  });
  HomeArticlePreview(state.articles);
  const pagination = renderPageNumberLink(nav, state.activePage);

  ul.appendChild(pagination);
  if (state.activePage > 0) {
    window.history.pushState({}, '', `?page=${state.activePage}`);
  }
}

function HomeArticles(articles) {
  const col = document.querySelector('.col-md-9');
  const nav = document.createElement('nav');
  nav.className = 'main-pagination';
  const ul = document.createElement('div');
  ul.className = 'pagination';
  nav.appendChild(ul);

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;
    const newPageIndex = getNextPageIndex(textContent, state);
    updateState({ activePage: newPageIndex });
    await updateArticles();
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
        spinner.remove();
        HomeArticlePreview(articles);
      }, 1000);
    } else if (activePage) {
      const data = await article_request.getAllArticles(activePage);
      updateState({
        activePage: activePage,
        articles: data,
      });

      HomeArticlePreview(state.articles);
      renderPageNumberLink(ul, state.activePage);
    }
    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.removeEventListener('click', handleNextPageClick);
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}

const initialState = {
  articles: [],
  activePage: 1,
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};

let state = initialState;

export default HomeArticles;
