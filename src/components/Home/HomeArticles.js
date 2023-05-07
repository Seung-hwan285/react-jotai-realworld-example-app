import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  getActivePageItem,
  getPageItems,
  setActivePage,
} from '../../utils/helper/mainPagination.js';
import HomeArticlePreview from './HomeArticlePreview.js';

function renderPageNumberLink(ul, activePage) {
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
}

function HomeArticles(tagArticles) {
  const col = document.querySelector('.col-md-9');

  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);
  const nav = document.createElement('nav');
  nav.className = 'main-pagination';
  const ul = document.createElement('nav');
  ul.className = 'pagination';
  nav.appendChild(ul);

  const handleNextPageClick = async (e) => {
    const { textContent } = e.target;

    switch (textContent) {
      case '<<':
        await setActivePage(1);
        break;

      case '<':
        const previousPageIndex = getActivePageItem();
        if (previousPageIndex > 2) {
          await setActivePage(previousPageIndex - 2);
        } else {
          return;
        }
        break;

      case '>>':
        const lastPage = getPageItems().length - 4;

        await setActivePage(lastPage);
        break;

      case '>':
        const nextPageIndex = getActivePageItem();
        if (nextPageIndex < 10) {
          await setActivePage(nextPageIndex);
        }
        break;

      default:
        const pageNumber = Number(textContent);
        await setActivePage(pageNumber);
        break;
    }
  };

  const render = async () => {
    const spinner = document.querySelector('.spinner');
    const params = new URLSearchParams(window.location.search);
    const activePage = Number(params.get('page')) || 1;

    if (tagArticles) {
      spinner.remove();
      HomeArticlePreview(tagArticles);
    } else if (activePage) {
      await setActivePage(activePage);
      spinner.remove();
      renderPageNumberLink(ul, activePage);
    }

    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}

export default HomeArticles;
