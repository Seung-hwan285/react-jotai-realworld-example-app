import { getLocalStroage } from '../../utils/storage.js';
import { createTagNavPillsHtml } from '../../utils/helper/feedToggle.js';

function HomeFeed({ activeFeed, onClick }) {
  console.log(activeFeed);
  const col = document.querySelector('.col-md-9');
  const getTag = getLocalStroage('selectTag');

  const token = getLocalStroage('token');

  const items = [
    ...(token
      ? [{ text: 'Your Feed' }, { text: 'Global Feed' }, { text: `#${getTag}` }]
      : [{ text: 'Global Feed' }, { text: `#${getTag}` }]),
  ];

  const getTagList = createTagNavPillsHtml(items, token, getTag);

  const feedToggleContainer = `<div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
    ${getTagList}
</ul>
</div>`;

  const render = () => {
    if (getTag && token) {
      col.innerHTML = feedToggleContainer;
    } else {
      col.innerHTML = feedToggleContainer;
    }
    const noArticles = document.createElement('div');

    if (token) {
      const globalFeedElement = document.querySelector(
        '.nav-pills .nav-item:nth-child(2) a'
      );

      const tagFeedElement = document.querySelector(
        '.nav-pills .nav-item:nth-child(3) a'
      );

      const yourFeedElement = document.querySelector(
        '.nav-pills .nav-item:nth-child(1) a'
      );

      if (activeFeed === 'global') {
        globalFeedElement.classList.add('active');
        tagFeedElement.classList.remove('active');
      }
      if (activeFeed !== 'global') {
        globalFeedElement.classList.remove('active');
        tagFeedElement.classList.add('active');
      }
      if (activeFeed === 'your') {
        yourFeedElement.classList.add('active');
        globalFeedElement.classList.remove('active');
        tagFeedElement.classList.remove('active');
        noArticles.className = 'article-preview';
        noArticles.textContent = 'no aritlce...';
        col.appendChild(noArticles);
      }
    } else {
      const globalFeedElement = document.querySelector(
        '.nav-pills .nav-item:nth-child(1) a'
      );

      const tagFeedElement = document.querySelector(
        '.nav-pills .nav-item:nth-child(2) a'
      );

      if (activeFeed === 'global') {
        globalFeedElement.classList.add('active');
        tagFeedElement.classList.remove('active');
      }
      if (activeFeed !== 'global') {
        globalFeedElement.classList.remove('active');
        tagFeedElement.classList.add('active');
      }
    }

    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', onClick);
  };
  render();
}
export default HomeFeed;
