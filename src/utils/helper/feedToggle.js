import { fetchAuthUserInfo } from './fetchAuth.js';
import { getLocalStroage } from '../storage.js';
import HomeArticles from '../../components/Home/HomeArticles.js';
import { article_request } from '../../lib/article/request.js';
import { articlesRemove } from './mainPagination.js';

export const toggleActive = (dom1, dom2, dom3, boolean) => () => {
  if (dom3) {
    dom1.classList.add('active');
    dom2.classList.remove('active');
    if (
      dom2.classList.contains('active') ||
      dom1.classList.contains('active')
    ) {
      dom3.classList.remove('active');
      if (boolean) {
        dom3.classList.add('active');
        dom1.classList.remove('active');
        dom2.classList.remove('active');
      }
    }
  } else {
    dom1.classList.add('active');
    dom2.classList.remove('active');
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
  } else {
    const globalFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(1) a'
    );
    const tagFeedElement = document.querySelector(
      '.nav-pills .nav-item:nth-child(2) a'
    );
    const setActive = toggleActive(globalFeedElement, tagFeedElement);
    setActive();
    const { articles } = await article_request.getAllArticles();

    const main = document.querySelector('.main-pagination');
    main.remove();
    const col = document.querySelector('.col-md-9');
    articlesRemove(document.querySelectorAll('.article-preview'));
    HomeArticles(col, articles);
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

  const { articles } = await article_request.getTagArticles(
    getLocalStroage('selectTag')
  );
  const col = document.querySelector('.col-md-9');
  const main = document.querySelector('.main-pagination');
  main.remove();
  articlesRemove(document.querySelectorAll('.article-preview'));

  HomeArticles(col, articles);
};
