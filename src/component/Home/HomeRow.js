import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { getLocalStroage } from '../../utils/storage.js';
import {
  handleGlobalFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';

function HomeRow(HomeContainer) {
  const container = document.createElement('div');
  container.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-9';

  row.appendChild(col);
  container.appendChild(row);
  HomeContainer.appendChild(container);

  const handleFeedClick = (e) => {
    // 이벤트 중지시켜야함 a요소의 기본 동작인 페이지 이동이 발생해서 페이지가 다시 로드되기 때문에
    // render 함수에서 다시 col 요소에 innerHTML을 추가한다. 그래서 이전에 추가한 HTML이 사라짐
    e.preventDefault();
    const { textContent } = e.target;

    if (textContent === 'Your Feed') {
      handleYourFeedClick();
    }

    if (textContent === 'Global Feed') {
      handleGlobalFeedClick();
    }
  };

  const render = async () => {
    const token = await fetchAuthUserInfo(getLocalStroage('token'));

    if (token) {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>
      `;
    } else {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>
      `;
    }

    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', handleFeedClick);
  };

  render();
}
export default HomeRow;
