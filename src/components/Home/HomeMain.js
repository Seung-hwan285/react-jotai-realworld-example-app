import {
  getLocalStroage,
  getSessionStroage,
  setSessionStroage,
} from '../../utils/storage.js';

import {
  setCookie,
  fetchAuthUserInfo,
  article_request,
  appendChildrenToParent,
  createElement,
  createPageNumberList,
  HomeTagList,
  HomeFeed,
  HomeArticles,
} from './index.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';

function renderHomeMain() {
  const homeContainer = document.querySelector('.home-page');
  const container = createElement('div', 'container page');
  const row = createElement('div', 'row');
  const col = createElement('div', 'col-md-9');

  appendChildrenToParent(row, col);
  appendChildrenToParent(container, row);
  appendChildrenToParent(homeContainer, container);
}

async function getArticlesPromise() {
  const getTag = getSessionStroage('selectTag');

  const token = getLocalStroage('token');
  const parms = new URLSearchParams(window.location.search);
  const activePage = Number(parms.get('page') || 1);

  switch (state.activeFeed) {
    case 'global':
      const { articles } = await article_request.getAllArticles(
        activePage === 1 ? 0 : activePage + 10,
        !!token && token
      );
      updateState({ articles: articles, pageNumber: createPageNumberList() });
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
        const { articles } = await article_request.getAllArticles(token);
        updateState({
          activeFeed: 'global',
          articles: articles,
        });
      }
      break;

    default:
      break;
  }
  return state.articles;
}

function HomeMain() {
  renderHomeMain();

  const handleTagListClick = (e) => {
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
    const token = getLocalStroage('token');
    const authTokenPromise = fetchAuthUserInfo(token);
    const articlesPromise = getArticlesPromise();

    const [authToken] = await Promise.all([authTokenPromise]);

    setCookie('token', JSON.stringify(authToken), 7);

    HomeFeed({
      activeFeed: state.activeFeed,
      onClick: handleFeedClick,
    });

    HomeArticles({
      articles: [],
    });

    const spinner = LoadingSpinner();
    const col = document.querySelector('.col-md-9');
    col.appendChild(spinner);
    await articlesPromise;

    HomeArticles({
      pageNumber: state.pageNumber,
      articles: state.articles,
      onClick: handleTagListClick,
    });
  };

  render();

  const initTags = () => {
    HomeTagList({
      onClickFeed: handleFeedClick,
      onClickTag: handleTagListClick,
    });
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
