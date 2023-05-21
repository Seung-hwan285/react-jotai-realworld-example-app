import { article_request } from '../../lib/article/request.js';
import { createElement } from '../../utils/helper/dom.js';
import { getLocalStroage } from '../../utils/storage.js';

function ProfileArticle({ feed, user }) {
  const render = async () => {
    const page = document.querySelector('.articles-toggle');
    const { username } = user;

    const token = getLocalStroage('token');
    switch (feed) {
      case 'my':
        const { articles: articleUsername } =
          await article_request.getUserArticles(username, token);
        updateState({
          articles: articleUsername,
        });
        break;
      case 'favorite':
        const { articles: articleFavorite } =
          await article_request.getUserFavortieArticles(username, token);
        updateState({
          articles: articleFavorite,
        });
        break;
      default:
        const { articles } = await article_request.getUserArticles(
          username,
          token
        );
        updateState({
          articles: articles,
        });
        break;
    }

    if (state.articles && Array.isArray(state.articles)) {
      state.articles.map(
        ({
          author,
          body,
          createdAt,
          description,
          favoritesCount,
          slug,
          tagList,
          title,
          updatedAt,
        }) => {
          const aritlce = createElement('div', 'article-preview');

          aritlce.innerHTML = /* HTML */ `
          <div class="article-meta">
            <a href=""><img src=${user.image} /></a>
            <div class="info">
              <a href="" class="author">${username}</a>
              <span class="date">${title}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> ${favoritesCount}
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>${title}</h1>
            <p>${body}</p>
            <span>Read more...</span>
        <ul class="tag-list">
      ${tagList
        .map((tag) => {
          return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
        })
        .join('')}
    </ul>
          </a>
        </div>
        `;
          page.appendChild(aritlce);
        }
      );
    }
  };

  render();
}

const initialState = {
  articles: [],
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;

export default ProfileArticle;
