import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { getLocalStroage, getSessionStroage } from '../../utils/storage.js';

import HomeArticles from './HomeArticles.js';
import { setCookie } from '../../utils/cookie.js';
import HomeTagList from './HomeTagList.js';
import HomeFeed from './HomeFeed.js';
import { article_request } from '../../lib/article/request.js';

import { tag_request } from '../../lib/tag/request.js';

function renderHomeMain() {
  const homeContainer = document.querySelector('.home-page');
  const container = document.createElement('div');
  container.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-9';

  row.appendChild(col);
  container.appendChild(row);
  homeContainer.appendChild(container);
}

function renderPageNumberList() {
  return Array.from({ length: 14 }, (val, idx) => {
    if (idx === 0) return '<<';
    if (idx === 1) return '<';
    if (idx === 12) return '>';
    if (idx === 13) return '>>';
    return String(idx - 1);
  });
}

function HomeMain() {
  renderHomeMain();
  const handleFeedClick = async (e) => {
    e.preventDefault();
    const getTag = getSessionStroage('selectTag');

    const textContent = e.target.textContent.trim();

    switch (textContent) {
      case 'Global Feed':
        updateState({ activeFeed: 'global' });
        break;
      case `#${getTag.trim()}`:
        updateState({ activeFeed: 'getTag' });
        break;
      case 'Your Feed':
        updateState({ activeFeed: 'your' });
        break;
    }

    render();
  };

  const render = async () => {
    const getTag = getSessionStroage('selectTag');

    const authToken = await fetchAuthUserInfo(getLocalStroage('token'));
    setCookie('token', JSON.stringify(authToken), 7);
    const col = document.querySelector('.col-md-9');
    const parms = new URLSearchParams(window.location.search);
    const activePage = Number(parms.get('page') || 1);

    switch (state.activeFeed) {
      case 'global':
        const { articles: articles } = await article_request.getAllArticles(
          activePage
        );
        updateState({ articles });
        updateState({
          pageNumber: renderPageNumberList(),
        });
        break;
      case 'getTag':
        const { articles: tagArticles } = await article_request.getTagArticles(
          getTag
        );
        updateState({ articles: tagArticles });
        updateState({
          pageNumber: renderPageNumberList(),
        });
        break;
      case 'your':
        updateState({ articles: [] });
        updateState({ pageNumber: [] });
        break;
      default:
        break;
    }

    HomeFeed({
      activeFeed: state.activeFeed,
      onClick: handleFeedClick,
    });

    HomeArticles({
      articles: state.articles,
      pageNumber: state.pageNumber,
    });
  };

  const initTags = async () => {
    const { tags } = await tag_request.getTagsList();

    HomeTagList({
      tags: tags,
      handleFeedClick,
    });
  };

  initTags();

  render();
}
const initalState = {
  activeFeed: 'global',
  articles: [],
  pageNumber: [],
};

let state = initalState;

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};
export default HomeMain;
