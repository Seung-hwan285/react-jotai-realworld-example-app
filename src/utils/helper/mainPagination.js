import { article_request } from '../../lib/article/request.js';
import RenderData from '../../components/Home/HomeArticlesItems.js';
import { getLocalStroage } from '../storage.js';
import { fetchAuthUserInfo } from './fetchAuth.js';
import HomeArticles from '../../components/Home/HomeArticles.js';

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

export const paintPageLink = () => {
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
  const ul = document.querySelector('.pagination');

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
};
