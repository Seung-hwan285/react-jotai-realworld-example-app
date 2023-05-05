import { tag_request } from '../../lib/tag/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import {
  createTagNavPillsHtml,
  handleGlobalFeedClick,
  handleTagsFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';

import { article_request } from '../../lib/article/request.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import HomeArticles from './HomeArticles.js';

function renderSidebar() {
  const col = document.querySelector('.col-md-3');
  col.innerHTML = `
    <div class="sidebar">
        <p>Popular Tags</p>
        <div class="tag-list"></div>
    </div>
  `;
}

async function renderFeedWithClickEvent(tagArticles) {
  const handleFeedClick = async (e) => {
    e.preventDefault();
    const getTag = getLocalStroage('selectTag');

    const { textContent } = e.target;
    const feeds = [
      {
        text: 'Your Feed',
        click: handleYourFeedClick,
      },
      {
        text: 'Global Feed',
        click: handleGlobalFeedClick,
      },
      {
        text: `#${getTag}`,
        click: handleTagsFeedClick,
      },
    ];

    const findEvent = feeds.find((feed) => feed.text === textContent);

    if (findEvent) {
      findEvent.click();
    }
  };

  const tag = getLocalStroage('selectTag');
  const col = document.querySelector('.col-md-9');
  const authToken = await fetchAuthUserInfo(getLocalStroage('token'));

  const items = [
    ...(authToken
      ? [{ text: 'Your Feed' }, { text: 'Global Feed' }, { text: `#${tag}` }]
      : [{ text: 'Global Feed' }, { text: `#${tag}` }]),
  ];

  const getTagList = createTagNavPillsHtml(items, authToken, tag);

  const feedToggleContainer = `<div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
    ${getTagList}
</ul>
</div>`;

  if (tag && authToken) {
    col.innerHTML = feedToggleContainer;
  } else {
    col.innerHTML = feedToggleContainer;
  }
  HomeArticles(tagArticles);
  const feed = document.querySelector('.feed-toggle');
  feed.addEventListener('click', handleFeedClick);
}

function HomeTagList() {
  const row = document.querySelector('.row');
  const col = document.createElement('div');
  col.className = 'col-md-3';
  row.appendChild(col);

  renderSidebar();

  const tagList = document.querySelector('.tag-list');
  const spinnerContainer = LoadingSpinner();
  tagList.appendChild(spinnerContainer);

  const handleTagClick = async (e) => {
    e.preventDefault();

    const { textContent } = e.target;
    setLocalStroage('selectTag', textContent);
    const getTag = getLocalStroage('selectTag');
    const { articles: tagArticles } = await article_request.getTagArticles(
      getTag
    );

    renderFeedWithClickEvent(tagArticles);
  };

  const render = async () => {
    const { tags } = await tag_request.getTagsList();

    col.innerHTML = `
     <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">                         
               ${
                 Array.isArray(tags) &&
                 tags
                   .map((tag) => {
                     return /* HTML */ `
                       <p class="tag-pill tag-default">${tag}</a>
                     `;
                   })
                   .join('')
               }
          </div>
        </div>
    `;
    row.appendChild(col);

    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', handleTagClick);
  };

  render();
}

export default HomeTagList;
