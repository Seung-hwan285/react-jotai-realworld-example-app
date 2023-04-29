import { article_request } from '../../lib/article/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  getActivePageItem,
  getPageItems,
  setActivePage,
} from '../../utils/helper/mainPagination.js';
import RenderData from './HomeArticlesItems.js';
function HomeArticles(col, tagArticles) {
  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);

  const nav = document.createElement('nav');
  nav.className = 'main-pagination';

  const ul = document.createElement('ul');
  ul.className = 'pagination';

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
    const { articles, articlesCount } = await article_request.getAllArticles();

    const spinner = document.querySelector('.spinner');
    spinner.remove();

    // 초기렌더링
    if (tagArticles) {
      RenderData(tagArticles, col, nav);
    } else {
      RenderData(articles, col, nav);
    }

    ul.innerHTML = `
      <li class="page-item">
        <a class="page-link"><<</a>
      </li>
      
      <li class="page-item">
        <a class="page-link "><</a>
      </li>
      
      <li class="page-item active">
        <a class="page-link">1</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">2</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">3</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">4</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">5</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">6</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">7</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">8</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">9</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">10</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">></a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">>></a>
      </li>`;

    nav.appendChild(ul);
    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}
export default HomeArticles;
