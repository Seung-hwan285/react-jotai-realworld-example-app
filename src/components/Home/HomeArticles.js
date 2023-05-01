import { article_request } from '../../lib/article/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  getActivePageItem,
  getPageItems,
  paintPageLink,
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

      nav.appendChild(ul);
      paintPageLink();
    }

    col.appendChild(nav);

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}
export default HomeArticles;
