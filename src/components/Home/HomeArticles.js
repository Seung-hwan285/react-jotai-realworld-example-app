import LoadingSpinner from '../../commons/LoadingSpinner.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import { article_request } from '../../lib/article/request.js';
import {
  domRemove,
  getNextPageIndex,
} from '../../utils/helper/mainPagination.js';

export function renderPageNumberLink(ul, activePage) {
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
    ul.appendChild(li);
  });

  return ul;
}

function HomeArticles(tagArticles) {
  const col = document.querySelector('.col-md-9');

  const nav = document.createElement('nav');
  nav.className = 'main-pagination';
  const ul = document.createElement('nav');
  ul.className = 'pagination';
  nav.appendChild(ul);

  const initialState = {
    articles: [],
    activePage: 1,
  };

  const updateState = (nextState) => {
    state = { ...state, ...nextState };
  };

  const createHomePage = async () => {
    const spinnerContainer = LoadingSpinner();
    col.insertBefore(spinnerContainer, nav);

    domRemove(document.querySelectorAll('.page-item'));
    domRemove(document.querySelectorAll('.article-preview'));

    const data = await article_request.getAllArticles(state.activePage);

    spinnerContainer.remove();
    updateState({ articles: data });
    HomeArticlePreview(state.articles);

    const ulElement = renderPageNumberLink(ul, state.activePage);
    const mainPaginationElement = document.querySelector('.main-pagination');
    mainPaginationElement.appendChild(ulElement);

    if (state.activePage > 0) {
      window.history.pushState({}, '', `?page=${state.activePage}`);
    }
  };

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;
    const newPageIndex = getNextPageIndex(textContent, state);
    updateState({ activePage: newPageIndex });
    await createHomePage();
  };

  const render = async () => {
    const spinner = document.querySelector('.spinner');
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;

    console.log(activePage);
    window.history.pushState({}, '', `?page=${activePage > 0 && activePage}`);
    const spinnerContainer = LoadingSpinner();
    col.appendChild(spinnerContainer);

    if (tagArticles) {
      spinner.remove();
      HomeArticlePreview(tagArticles);
    } else if (activePage) {
      const data = await article_request.getAllArticles(state.activePage);
      updateState({ activePage: activePage });
      updateState({ articles: data });

      HomeArticlePreview(state.articles);
      renderPageNumberLink(ul, state.activePage);
    }
    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  let state = initialState;

  render();
}

export default HomeArticles;
