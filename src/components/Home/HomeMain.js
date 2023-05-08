import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';

import HomeArticles from './HomeArticles.js';
import { setCookie } from '../../utils/cookie.js';
import HomeTagList from './HomeTagList.js';
import HomeFeed from './HomeFeed.js';
import { article_request } from '../../lib/article/request.js';
import { domRemove } from '../../utils/helper/mainPagination.js';

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
// TODO : 피드 active 이벤트 구현 및 렌더링 변경

function HomeMain() {
  const getTag = getLocalStroage('selectTag');
  renderHomeMain();

  const handleFeedClick = async (e) => {
    e.preventDefault();

    const { textContent } = e.target;
    switch (textContent) {
      case 'Global Feed':
        updateState({ activeFeed: 'global' });
        break;
      case `#${getTag}`:
        updateState({ activeFeed: 'getTag' });
        break;
      case 'Your Feed':
        updateState({ activeFeed: 'your' });
        break;
    }

    render();
  };

  const render = async () => {
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
          pageNumber: [
            '<<',
            '<',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '>',
            '>>',
          ],
        });
        break;
      case 'getTag':
        const { articles: tagArticles } = await article_request.getTagArticles(
          getTag
        );
        updateState({ articles: tagArticles });
        updateState({
          pageNumber: [
            '<<',
            '<',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '>',
            '>>',
          ],
        });
        break;
      case 'your':
        updateState({ articles: [] });
        updateState({ pageNumber: [] });
        const noArticles = document.createElement('div');
        noArticles.className = 'article-preview';
        noArticles.textContent = 'no aritlce...';
        col.appendChild(noArticles);
        break;
      default:
        break;
    }

    HomeFeed({
      activeFeed: state.activeFeed,
      onClick: handleFeedClick,
    });

    HomeArticles({
      state: state,
    });
    HomeTagList();
  };

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
