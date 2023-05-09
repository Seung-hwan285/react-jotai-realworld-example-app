import { article_request } from '../../lib/article/request.js';
import HomeFeed from './HomeFeed.js';
import { setLocalStroage } from '../../utils/storage.js';
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

  HomeFeed(state);
  HomeArticlePreview(tagArticles);
}

// TODO: HomeTagList 상태관리로 리팩토링
// [x] : 사용자는 태그리스트를 클릭한다.
// [x] : 사용자는 태그 값이 로컬스토리지에 저장한다.
// [x] : 태그를 값이 feed 에 들어간다
// [x] : feed 에 이벤트 핸들러가 한번만 등록되므로 다시 클릭하면 a태그를 클릭하는 것처럼 변해서 새로고침이 일어남
// [x] : 태그 값이 변경되면 태그 active 값이 들어가야한다.
// [x] : 태그 값에 해당하는 article 목록이 렌더링된다.
// [x] : #quia 클릭이 안된다.
// [] : 초기에 태그리스트 로딩스피너가 안나온다.

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

    setLocalStroage('selectTag', tag);

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
