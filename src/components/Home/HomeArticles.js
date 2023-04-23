import { article_request } from '../../lib/article/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import {
  articlesRemove,
  getActivePageItem,
  getArticlePreviews,
} from '../../utils/helper/mainPagination.js';
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
        renderData(articles1);
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
        renderData(articles2);
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
        renderData(articles3);
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
          renderData(articles4);
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
        renderData(articles5);
        break;
    }
  };

  const renderData = (articles) => {
    if (articles && Array.isArray(articles)) {
      articles.map(
        ({
          author,
          body,
          createdAt,
          description,
          favorited,
          favoritesCount,
          slug,
          tagList,
          title,
          updatedAt,
        }) => {
          const Article = document.createElement('div');

          Article.className = 'article-preview';
          Article.innerHTML = /* HTML */ `
            <div class="article-meta">
              <a href="profile.html"><img src=${author.image} /></a>
              <div class="info">
                <a href="" class="author">${author.username}</a>
                <span class="date">${createdAt}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> ${favoritesCount}
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>${title}</h1>
              <p>${description}</p>
              <span>Read more...</span>
            </a>
          `;

          col.appendChild(Article);
          col.appendChild(nav);
        }
      );
    }
  };

  const render = async () => {
    const { articles, articlesCount } = await article_request.getAllArticles();

    const spinner = document.querySelector('.spinner');
    spinner.remove();

    // 초기렌더링
    renderData(articles);

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
