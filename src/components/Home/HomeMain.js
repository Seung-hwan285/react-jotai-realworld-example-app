import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import {
  getLocalStroage,
  getSessionStroage,
  setSessionStroage,
} from '../../utils/storage.js';

import HomeArticles from './HomeArticles.js';
import { setCookie } from '../../utils/cookie.js';
import HomeTagList from './HomeTagList.js';
import HomeFeed from './HomeFeed.js';
import { article_request } from '../../lib/article/request.js';
import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function renderHomeMain() {
  const homeContainer = document.querySelector('.home-page');
  const container = createElement('div', 'container page');
  const row = createElement('div', 'row');
  const col = createElement('div', 'col-md-9');

  appendChildrenToParent(row, col);
  appendChildrenToParent(container, row);
  appendChildrenToParent(homeContainer, container);
}

function renderPageNumberList() {
  const initFirst = Array.from({ length: 10 }, (val, idx) => idx + 1);
  const initSecond = Array.from({ length: 10 }, (val, idx) => idx + 11);
  const symbols = ['<<', '<', '>', '>>'];

  const firstList = symbols.slice(0, 2).concat(initFirst, symbols.slice(2, 4));
  const secondList = symbols
    .slice(0, 2)
    .concat(initSecond, symbols.slice(2, 4));

  const pageNumberList = Array.from(firstList).concat(Array.from(secondList));
  return pageNumberList;
}

function HomeMain() {
  renderHomeMain();

  const handleTagListClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('tag-pill')) {
      const tag = e.target.textContent.trim();
      setSessionStroage('selectTag', tag);

      updateState({
        activeFeed: 'getTag',
      });
      render();
    }
  };

  const handleFeedClick = async (e) => {
    e.preventDefault();
    const getTag = getSessionStroage('selectTag');
    const textContent = e.target.textContent.trim();

    const feeds = [
      { text: 'Global Feed', feed: 'global' },
      { text: `#${getTag && getTag.trim()}`, feed: 'getTag' },
      { text: 'Your Feed', feed: 'your' },
    ];
    const findFeed = feeds.find((feed) => feed.text === textContent);

    if (findFeed) {
      updateState({ activeFeed: findFeed.feed });
    }
    render();
  };

  const render = async () => {
    const getTag = getSessionStroage('selectTag');

    const token = getLocalStroage('token');
    const authToken = await fetchAuthUserInfo(token);
    setCookie('token', JSON.stringify(authToken), 7);

    const parms = new URLSearchParams(window.location.search);
    const activePage = Number(parms.get('page') || 1);

    switch (state.activeFeed) {
      case 'global':
        const { articles: articles } = await article_request.getAllArticles(
          activePage === 1 ? 0 : activePage + 10,
          !!token && token
        );
        updateState({ articles: articles, pageNumber: renderPageNumberList() });

        break;

      case 'getTag':
        const { articles: tagArticles } = await article_request.getTagArticles(
          getTag
        );
        updateState({
          articles: tagArticles,
          pageNumber: [],
        });
        break;

      case 'your':
        updateState({ articles: [], pageNumber: [] });
        if (!token) {
          const { articles: articles } = await article_request.getAllArticles(
            token
          );
          updateState({
            activeFeed: 'global',
            articles: articles,
          });
        }
        break;
      default:
        break;
    }

    HomeFeed({
      activeFeed: state.activeFeed,
      onClick: handleFeedClick,
    });

    HomeArticles({
      pageNumber: state.pageNumber,
      articles: state.articles,
      onClick: handleTagListClick,
    });
  };

  const initTags = () => {
    const spinner = document.querySelector('.spinner');
    HomeTagList({
      onClickFeed: handleFeedClick,
      onClickTag: handleTagListClick,
    });

    if (spinner) {
      spinner.remove();
    }
    render();
  };

  initTags();

  return { render };
}

const initalState = {
  activeFeed: 'global',
  articles: [],
  pageNumber: [],
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};
let state = initalState;

export default HomeMain;
