import { tag_request } from '../../lib/tag/request.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import {
  handleGlobalFeedClick,
  handleTagsFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';
import HomeArticles from './HomeArticles.js';
import { article_request } from '../../lib/article/request.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';

function HomeTagList(row) {
  const col = document.createElement('div');
  col.className = 'col-md-3';

  col.innerHTML = /* HTML */ `
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list"></div>
    </div>
  `;

  row.appendChild(col);

  const tagList = document.querySelector('.tag-list');
  const spinnerContainer = LoadingSpinner();
  tagList.appendChild(spinnerContainer);

  const handleFeedClick = async (e) => {
    e.preventDefault();
    console.log(e.target);

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

    const findEvenet = feeds.find((feed) => feed.text === textContent);

    if (findEvenet) {
      findEvenet.click();
    }
  };

  const handleTagClick = async (e) => {
    e.preventDefault();

    const { textContent } = e.target;
    setLocalStroage('selectTag', textContent);
    const getTag = getLocalStroage('selectTag');
    const { articles: tagArticles } = await article_request.getTagArticles(
      getTag
    );

    paintTagList(tagArticles);
  };

  const paintTagList = async (tagArticles) => {
    const tag = getLocalStroage('selectTag');
    const col = document.querySelector('.col-md-9');

    const token = await fetchAuthUserInfo(getLocalStroage('token'));

    if (tag && token) {
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
    } else {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
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

    HomeArticles(tagArticles);
    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', handleFeedClick);
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
