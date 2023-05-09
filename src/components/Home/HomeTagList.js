import { article_request } from '../../lib/article/request.js';
import HomeFeed from './HomeFeed.js';
import { setSessionStroage } from '../../utils/storage.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import HomeArticlePreview from './HomeArticlePreview.js';

function renderSidebar() {
  const row = document.querySelector('.row');
  const col = document.querySelector('.col-md-3');
  col.innerHTML = `
    <div class="sidebar">
        <p>Popular Tags</p>
        <div class="sidebar tag-list"></div>
    </div>
  `;
  row.appendChild(col);
}

function renderTagList(tags) {
  const tagList = document.querySelector('.sidebar .tag-list');

  tagList.innerHTML = tags
    .map((tag) => {
      return /* HTML*/ `
       <p class="tag-pill tag-default">${tag}</a>
    `;
    })
    .join('');
}

async function updateArticleByTag(tag, handleFeedClick) {
  const tagList = document.querySelector('.col-md-9');

  const spinnerContainer = LoadingSpinner();

  tagList.appendChild(spinnerContainer);
  const { articles: tagArticles } = await article_request.getTagArticles(tag);

  updateState({
    activeFeed: 'getTag',
    onClick: handleFeedClick,
  });

  // 개수에0 따라서 페이지네이션 생성
  HomeFeed(state);
  HomeArticlePreview(tagArticles);
}

function HomeTagList({ tags, handleFeedClick }) {
  const row = document.querySelector('.row');
  const col = document.createElement('div');
  col.className = 'col-md-3';
  row.appendChild(col);

  if (document.querySelector('.col-md-3')) {
    document.querySelector('.col-md-3').remove();
    row.appendChild(col);
  }

  renderSidebar();

  const handleTagClick = async (e) => {
    e.preventDefault();
    const tag = e.target.textContent;

    setSessionStroage('selectTag', tag);

    await updateArticleByTag(tag, handleFeedClick);
  };

  const spinner = document.querySelector('.spinner');
  const render = async () => {
    renderSidebar();

    const tagList = document.querySelector('.tag-list');
    const spinnerContainer = LoadingSpinner();
    tagList.appendChild(spinnerContainer);

    renderTagList(tags);
    const sidebar = document.querySelector('.sidebar');

    sidebar.addEventListener('click', handleTagClick);
  };
  render();
}

const initialState = {
  articles: [],
  getTag: '',
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};

let state = initialState;

export default HomeTagList;
