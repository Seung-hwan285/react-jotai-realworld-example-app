import { article_request } from '../../lib/article/request.js';
import RenderData from '../../components/Home/HomeArticlesItems.js';
import { getLocalStroage } from '../storage.js';

export const getPageItems = () =>
  Array.from(document.querySelectorAll('.page-item'));

export const getActivePageItem = () =>
  getPageItems().findIndex((item) => item.classList.contains('active'));

export const articlesRemove = (article) => article.forEach((a) => a.remove());

export const getArticlePreviews = () =>
  document.querySelectorAll('.article-preview');

export const setActivePage = async (pageNumber) => {
  const col = document.querySelector('.col-md-9');
  const nav = document.querySelector('.main-pagination');

  const page = Array.from(document.querySelectorAll('.page-item'));
  const activeItem = page.find((item) => item.classList.contains('active'));
  activeItem.classList.remove('active');
  page[pageNumber].classList.add('active');

  const { articles } = await article_request.getAllArticles(pageNumber - 1);
  const articlePreviews = getArticlePreviews();
  articlesRemove(articlePreviews);
  RenderData(articles, col, nav);
};

export const paintTagList = () => {
  const tag = getLocalStroage('selectTag');
  const col = document.querySelector('.col-md-9');

  if (tag) {
    col.innerHTML = /* HTML */ `
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <a class="nav-link" href="">Your Feed</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Global Feed</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="">#${tag}</a>
          </li>
        </ul>
      </div>
    `;
  }
};
