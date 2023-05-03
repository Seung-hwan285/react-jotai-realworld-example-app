import { fetchAuthUserInfo } from './fetchAuth.js';
import { getLocalStroage } from '../storage.js';
import HomeArticles from '../../components/Home/HomeArticles.js';
import { article_request } from '../../lib/article/request.js';
import { articlesRemove } from './mainPagination.js';

const addActive = (dom) => dom.classList.add('active');
const removeActive = (dom) => dom.classList.remove('active');
const hasActive = (dom) => dom.classList.contains('active');

const mainRemove = () => document.querySelector('.main-pagination').remove();

export const toggleActive = (dom1, dom2, dom3, boolean) => () => {
  addActive(dom1);
  removeActive(dom2);
  if (dom3) {
    removeActive(dom3);
    if ((hasActive(dom1) || hasActive(dom2)) && boolean) {
      addActive(dom3);
      removeActive(dom1);
      removeActive(dom2);
    }
  }
};

export const handleYourFeedClick = () => {
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );

  const tagFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(3) a'
  );

  const setActive = toggleActive(
    yourFeedElement,
    globalFeedElement,
    tagFeedElement
  );
  setActive();
};

export const handleGlobalFeedClick = async () => {
  const token = await fetchAuthUserInfo(getLocalStroage('token'));

  if (token) {
    const globalFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(2) a'
    );
    const yourFeedElement = document.querySelector('.nav-pills .nav-item a');

    const tagFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(3) a'
    );

    const setActive = toggleActive(
      globalFeedElement,
      yourFeedElement,
      tagFeedElement
    );

    setActive();
    mainRemove();
    articlesRemove(document.querySelectorAll('.article-preview'));
    HomeArticles();
  } else {
    const globalFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(1) a'
    );
    const tagFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(2) a'
    );
    const setActive = toggleActive(globalFeedElement, tagFeedElement);
    setActive();
    mainRemove();
    articlesRemove(document.querySelectorAll('.article-preview'));
    HomeArticles();
  }
};

export const handleTagsFeedClick = async () => {
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const tagFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(3) a'
  );

  const setActive = toggleActive(
    globalFeedElement,
    yourFeedElement,
    tagFeedElement,
    true
  );
  setActive();

  const { articles: tagArticles } = await article_request.getTagArticles(
    getLocalStroage('selectTag')
  );
  mainRemove();
  articlesRemove(document.querySelectorAll('.article-preview'));
  HomeArticles(tagArticles);
};

export const createTagNavPillsHtml = (items, authToken, tag) => {
  return items
    .map(({ text }) => {
      const isActive = text === `#${tag}` ? 'active' : '';

      return `
      <li class="nav-item">
        <a class = "nav-link ${isActive}" href="">${text}</a>
      </li>
    `;
    })
    .join('');
};

export const createNavPillsHtml = (items, authToken) => {
  return items.map(({ text }) => {
    const isActive = text === `#${authToken}` ? `active` : '';

    const isActiveTextContent = text === 'Global Feed' && 'active';

    return `
      <li class="nav-item">
        <a class="nav-link ${
          isActive || isActiveTextContent
        }" href="">${text}</a>
      </li>
    `;
  });
};
