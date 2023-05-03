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
  const page = Array.from(document.querySelectorAll('.page-item'));
  const activeItem = page.find((item) => item.classList.contains('active'));
  activeItem.classList.remove('active');
  page[pageNumber].classList.add('active');

  const { articles } = await article_request.getAllArticles(pageNumber - 1);

  const articlePreviews = getArticlePreviews();
  articlesRemove(articlePreviews);
  HomeArticlePreview(articles);
};
