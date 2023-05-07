import { article_request } from '../../lib/article/request.js';
import HomeArticlePreview from '../../components/Home/HomeArticlePreview.js';

export const getPageItems = () =>
  Array.from(document.querySelectorAll('.page-item'));

export const getActivePageItem = () =>
  getPageItems().findIndex((item) => item.classList.contains('active'));

export const articlesRemove = (article) => article.forEach((a) => a.remove());

export const getArticlePreviews = () =>
  document.querySelectorAll('.article-preview');

export const setActivePage = async (pageNumber) => {
  const { articles } = await article_request.getAllArticles(
    pageNumber > 1 && pageNumber
  );

  const articlePreviews = getArticlePreviews();
  articlesRemove(articlePreviews);

  window.history.pushState({}, '', `?page=${pageNumber}`);

  const page = Array.from(document.querySelectorAll('.page-item'));
  const activeItem = page.find((item) => item.classList.contains('active'));
  if (page.length) {
    activeItem.classList.remove('active');
    page[pageNumber + 1].classList.add('active');
  }
  HomeArticlePreview(articles);
};
