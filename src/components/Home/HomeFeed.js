import { getLocalStroage } from '../../utils/storage.js';
import {
  createTagNavPillsHtml,
  handleGlobalFeedClick,
  handleTagsFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';

function HomeFeed({ getTag }) {
  const token = getLocalStroage('token');
  const col = document.querySelector('.col-md-9');

  const handleFeedClick = async (e) => {
    e.preventDefault();

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

    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', handleFeedClick);
  };
  render();
}
export default HomeFeed;
