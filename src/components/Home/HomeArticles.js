import { article_request } from '../../lib/article/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  getActivePageItem,
  getPageItems,
  setActivePage,
} from '../../utils/helper/mainPagination.js';
import HomeArticlePreview from './HomeArticlePreview.js';

function renderPageNumberLink(ul) {
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

    if (idx === 2) {
      li.classList.add('active');
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
        await setActivePage(2);
        break;

      case '<':
        const previousPageIndex = getActivePageItem();
        if (previousPageIndex > 2) {
          await setActivePage(previousPageIndex - 1);
        } else {
          return;
        }
        break;

      case '>>':
        const lastPage = getPageItems().length - 3;
        await setActivePage(lastPage);
        break;

      case '>':
        const nextPageIndex = getActivePageItem();
        if (nextPageIndex < 11) {
          await setActivePage(nextPageIndex + 1);
        }
        break;

      default:
        const pageNumber = Number(textContent) + 1;
        await setActivePage(pageNumber);
        break;
    }
  };

  const render = async () => {
    const { articles } = await article_request.getAllArticles();

    const spinner = document.querySelector('.spinner');

    // 초기렌더링
    if (tagArticles) {
      spinner.remove();
      HomeArticlePreview(tagArticles);
    } else {
      spinner.remove();
      HomeArticlePreview(articles);
      renderPageNumberLink(ul);
    }

    col.appendChild(nav);
    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}
export default HomeArticles;
