import { article_request } from '../../lib/article/request.js';
import HomeFeed from './HomeFeed.js';
import { setSessionStroage } from '../../utils/storage.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import HomeArticlePreview from './HomeArticlePreview.js';

import { tag_request } from '../../lib/tag/request.js';

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
  const { articles: tagArticles } = await article_request.getTagArticles(tag);

  updateState({
    activeFeed: 'getTag',
    articles: tagArticles,
    onClick: handleFeedClick,
  });

  HomeFeed(state);
  HomeArticlePreview(state.articles);
}

function HomeTagList({ onClick }) {
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

    await updateArticleByTag(tag, onClick);
  };

  const render = async () => {
    const tagList = document.querySelector('.sidebar .tag-list');
    const spinnerContainer = LoadingSpinner();
    tagList.appendChild(spinnerContainer);
    const { tags } = await tag_request.getTagsList();

    renderTagList(tags);

    spinnerContainer.remove();
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
