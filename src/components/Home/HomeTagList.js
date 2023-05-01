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

// TODO : 태그 클릭하면 tag 값들이 렌더링 된다.
// [x] : 사용자는 태그에서 클릭한다.
// [x] : 메인 화면 Feed에 #태그 값이 추가로 생성되어야한다.
// [x] : Global Feed 클릭시 새로고침되는 현상.
// [x] : #tag 클릭시 토글 안바뀌는 현상
// [x] : 사용자는 태그에서 클릭하면 태그 값에 해당하는 값을 API 콜요청을 보낸다
// [x] : 사용자는 API 콜 요청이 화면에 렌더링이 된다.
// [x] : tag api call 데이터 이전 데이터가 계속불러와짐. 현재 데이터로 갱신이 안되는 현상
// [] : 새로고침시 데이터 날라가서 없어지는 현상

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
    const { articles } = await article_request.getTagArticles(getTag);
    paintTagList(articles);
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

    HomeArticles(col, tagArticles);
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
