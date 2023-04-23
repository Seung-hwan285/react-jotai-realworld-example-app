import { article_request } from '../../lib/article/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  articlesRemove,
  getActivePageItem,
  getArticlePreviews,
} from '../../utils/helper/mainPagination.js';
import RenderData from './HomeArticlesItems.js';
function HomeArticles(col) {
  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);

  const nav = document.createElement('nav');

  const ul = document.createElement('ul');
  ul.className = 'pagination';

  const handleNextPageClick = async (e) => {
    const page = Array.from(document.querySelectorAll('.page-item'));
    const activeItem = page.find((item) => item.classList.contains('active'));
    const { textContent } = e.target;

    switch (textContent) {
      case '<<':
        const offset1 = 1;
        activeItem.classList.remove('active');
        page[2].classList.add('active');
        const { articles: articles1 } = await article_request.getAllArticles(
          offset1
        );
        const articlePreviews1 = getArticlePreviews();
        articlesRemove(articlePreviews1);
        RenderData(articles1, col, nav);
        break;

      case '<':
        const findIndex = getActivePageItem();
        console.log(findIndex);
        if (findIndex > 2) {
          page[findIndex - 1].classList.add('active');

          activeItem.classList.remove('active');
        } else {
          return;
        }
        const { articles: articles2 } = await article_request.getAllArticles(
          findIndex - 2
        );
        const articlePreviews2 = getArticlePreviews();
        articlesRemove(articlePreviews2);
        RenderData(articles2, col, nav);

        break;

      case '>>':
        const offset3 = 10;
        activeItem.classList.remove('active');
        page[page.length - 3].classList.add('active');
        const { articles: articles3 } = await article_request.getAllArticles(
          offset3
        );
        const articlePreviews3 = getArticlePreviews();
        articlesRemove(articlePreviews3);
        RenderData(articles3, col, nav);

        break;

      case '>':
        const findIndex4 = getActivePageItem();
        if (findIndex4 < 11) {
          page[findIndex4 + 1].classList.add('active');
          activeItem.classList.remove('active');
          const { articles: articles4 } = await article_request.getAllArticles(
            findIndex4
          );
          const articlePreviews4 = getArticlePreviews();
          articlesRemove(articlePreviews4);
          RenderData(articles4, col, nav);
        }
        break;

      default:
        e.target.parentNode.classList.add('active');
        activeItem.classList.remove('active');
        const offset5 = Number(textContent);
        const { articles: articles5 } = await article_request.getAllArticles(
          offset5
        );
        const articlePreviews5 = getArticlePreviews();
        articlesRemove(articlePreviews5);
        RenderData(articles5, col, nav);

        break;
    }
  };

  const render = async () => {
    const { articles, articlesCount } = await article_request.getAllArticles();

    const spinner = document.querySelector('.spinner');
    spinner.remove();

    // 초기렌더링
    RenderData(articles, col, nav);

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
