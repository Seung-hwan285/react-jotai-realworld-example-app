import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import {
  handleGlobalFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';
import HomeArticles from './HomeArticles.js';
import HomeTagList from './HomeTagList.js';
import { setCookie } from '../../utils/cookie.js';

function HomeMain(banner) {
  const container = document.createElement('div');
  container.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-9';

  row.appendChild(col);
  container.appendChild(row);
  banner.appendChild(container);

  const handleFeedClick = (e) => {
    console.log(e.target);
    e.preventDefault();
    const { textContent } = e.target;
    const feeds = [
      { text: 'Your Feed', click: handleYourFeedClick },
      { text: 'Global Feed', click: handleGlobalFeedClick },
    ];

    const findEvent = feeds.find((feed) => feed.text === textContent);

    if (findEvent) {
      findEvent.click();
    }
  };

  const render = async () => {
    const token = await fetchAuthUserInfo(getLocalStroage('token'));
    setCookie('token', JSON.stringify(token), 7);

    if (token) {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>
      `;
    } else {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>
      `;
    }

    HomeArticles(col);
    HomeTagList(row);

    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', handleFeedClick);
  };
  render();
}
export default HomeMain;
