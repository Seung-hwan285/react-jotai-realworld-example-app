import { getLocalStroage, getSessionStroage } from '../../utils/storage.js';
import { createTagNavPillsHtml } from '../../lib/article/helper/feedToggle.js';

function getNavElement(index) {
  return document.querySelector(`.nav-pills .nav-item:nth-child(${index}) a`);
}

function renderFeedToggleContainer(getTagList) {
  return `<div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
    ${getTagList}
</ul>
</div>`;
}

function renderNoArticle(col, message) {
  const noArticles = document.createElement('div');
  noArticles.className = 'article-preview';
  noArticles.textContent = message;
  col.appendChild(noArticles);
}

function HomeFeed({ activeFeed, onClick }) {
  const col = document.querySelector('.col-md-9');
  const getTag = getSessionStroage('selectTag');

  const token = getLocalStroage('token');

  const items = [
    ...(token
      ? [
          { text: 'Your Feed' },
          { text: 'Global Feed' },
          { text: getTag !== null ? `#${getTag}` : '' },
        ]
      : [
          { text: 'Global Feed' },
          { text: getTag !== null ? `#${getTag}` : '' },
        ]),
  ];

  const getTagList = createTagNavPillsHtml(items);

  const setActiveNavElement = (navElements) => {
    navElements.forEach((navElement) => {
      if (activeFeed === Object.keys(navElement)[0]) {
        Object.values(navElement)[0].classList.add('active');
      } else {
        Object.values(navElement)[0].classList.remove('active');
      }
    });
  };

  const render = () => {
    if (getTag && token) {
      col.innerHTML = renderFeedToggleContainer(getTagList);
    } else {
      col.innerHTML = renderFeedToggleContainer(getTagList);
    }

    const navElements = [
      ...(token
        ? [
            { your: getNavElement(1) },
            { global: getNavElement(2) },
            { getTag: getNavElement(3) },
          ]
        : [{ global: getNavElement(1) }, { getTag: getNavElement(2) }]),
    ];

    if (token) {
      switch (activeFeed) {
        case 'global':
          setActiveNavElement(navElements, 2);
          break;
        case 'getTag':
          setActiveNavElement(navElements, 3);
          break;
        case 'your':
          setActiveNavElement(navElements, 1);
          renderNoArticle(col, 'No articles are here... yet.');
          break;
      }
    } else {
      switch (activeFeed) {
        case 'global':
          setActiveNavElement(navElements, 1);
          break;
        case 'getTag':
          setActiveNavElement(navElements, 2);
          break;
      }
    }

    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', onClick);
  };
  render();
}
export default HomeFeed;
