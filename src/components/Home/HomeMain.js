import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import {
  createNavPillsHtml,
  handleGlobalFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';
import HomeArticles from './HomeArticles.js';
import HomeTagList from './HomeTagList.js';
import { setCookie } from '../../utils/cookie.js';

function HomeMain(homeContainer) {
  const container = document.createElement('div');
  container.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-9';

  row.appendChild(col);
  container.appendChild(row);
  homeContainer.appendChild(container);

  const handleFeedClick = (e) => {
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
    const authToken = await fetchAuthUserInfo(getLocalStroage('token'));
    setCookie('token', JSON.stringify(authToken), 7);

    const items = [
      ...(authToken
        ? [{ text: 'Your Feed' }, { text: 'Global Feed' }]
        : [{ text: 'Global Feed' }]),
    ];

    const getTagList = createNavPillsHtml(items, authToken);

    const feedToggleContainer = /*HTML */ `<div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
        ${getTagList}
</ul>

</div>`;

    if (authToken) {
      col.innerHTML = feedToggleContainer;
    } else {
      col.innerHTML = feedToggleContainer;
    }

    HomeArticles();
    HomeTagList();

    const feed = document.querySelector('.feed-toggle');

    feed.addEventListener('click', handleFeedClick);
  };
  render();
}
export default HomeMain;
