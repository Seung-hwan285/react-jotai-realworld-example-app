import LoadingSpinner from '../../commons/LoadingSpinner.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import { article_request } from '../../lib/article/request.js';

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
        const classList = li.classList;
        classList.remove('active');
        classList.add('active');
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
  // mainPaginationElement.appendChild(ul);
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

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;
    const spinnerContainer = LoadingSpinner();
    col.insertBefore(spinnerContainer, nav);

    document.querySelectorAll('.page-item').forEach((li) => li.remove());
    document.querySelectorAll('.article-preview').forEach((li) => li.remove());

    switch (textContent) {
      case '<<':
        const firstPageIndex = 1;
        updateState({ activePage: firstPageIndex });
        break;

      case '<':
        const previousPageIndex = state.activePage - 1;
        if (previousPageIndex > 1) {
          updateState({ activePage: previousPageIndex });
        } else {
          return;
        }
        break;

      case '>>':
        const lastPageIndex = 10;
        updateState({ activePage: lastPageIndex });
        break;

      case '>':
        const nextPageIndex = state.activePage + 1;
        if (nextPageIndex < 11) {
          updateState({ activePage: nextPageIndex });
        }
        break;

      default:
        const pageNumber = Number(textContent);
        updateState({ activePage: pageNumber });
        break;
    }

    const data = await article_request.getAllArticles(state.activePage);

    spinnerContainer.remove();
    updateState({ articles: data });
    HomeArticlePreview(state.articles);

    const ulElement = renderPageNumberLink(ul, state.activePage);
    const mainPaginationElement = document.querySelector('.main-pagination');
    console.log(ulElement);
    mainPaginationElement.appendChild(ulElement);

    window.history.pushState({}, '', `?page=${state.activePage}`);
  };

  const render = async () => {
    const spinner = document.querySelector('.spinner');
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;
    window.history.pushState({}, '', `?page=${activePage}`);
    const spinnerContainer = LoadingSpinner();
    col.appendChild(spinnerContainer);

    if (tagArticles) {
      spinner.remove();
      HomeArticlePreview(tagArticles);
    } else if (activePage) {
      updateState({ activePage: activePage });

      const data = await article_request.getAllArticles(state.activePage);
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
