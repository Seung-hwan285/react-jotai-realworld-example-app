import { article_request } from '../../lib/article/request.js';

import HomeArticlePreview from './HomeArticlePreview.js';
import HomeFeed from './HomeFeed.js';
import { setLocalStroage } from '../../utils/storage.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';
import { tag_request } from '../../lib/tag/request.js';
import { domRemove } from '../../utils/helper/mainPagination.js';

function renderSidebar() {
  const row = document.querySelector('.row');
  const col = document.querySelector('.col-md-3');
  col.innerHTML = `
    <div class="sidebar">
        <p>Popular Tags</p>
        <div class="tag-list"></div>
    </div>
  `;
  row.appendChild(col);
}

function renderTagList(tags) {
  const tagList = document.querySelector('.tag-list');
  tagList.innerHTML = tags
    .map((tag) => {
      return /* HTML*/ `
       <p class="tag-pill tag-default">${tag}</a>
    `;
    })
    .join('');
}

async function updateArticleByTag(tag) {
  const tagList = document.querySelector('.col-md-9');
  domRemove(document.querySelectorAll('.article-preview'));
  domRemove(document.querySelectorAll('.page-item'));

  const spinnerContainer = LoadingSpinner();

  tagList.appendChild(spinnerContainer);
  const { articles: tagArticles } = await article_request.getTagArticles(tag);

  updateState({
    getTag: tag,
    articles: tagArticles,
  });

  HomeFeed(state);
  HomeArticlePreview(state);
}

function HomeTagList() {
  const row = document.querySelector('.row');
  const col = document.createElement('div');
  col.className = 'col-md-3';
  row.appendChild(col);

  if (document.querySelector('.col-md-3')) {
    document.querySelector('.col-md-3').remove();
    row.appendChild(col);
  }

  renderSidebar();

  const tagList = document.querySelector('.tag-list');
  const spinnerContainer = LoadingSpinner();
  tagList.appendChild(spinnerContainer);

  const handleTagClick = async (e) => {
    e.preventDefault();
    const tag = e.target.textContent;
    setLocalStroage('selectTag', tag);
    await updateArticleByTag(tag);
  };

  const render = async () => {
    const { tags } = await tag_request.getTagsList();
    renderSidebar();
    renderTagList(tags);
    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', handleTagClick);
  };
  render();
}

const initialState = {
  articles: [],
  getTag: '',
  authToken: '',
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};

let state = initialState;

export default HomeTagList;
