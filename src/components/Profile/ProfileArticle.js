import {
  article_request,
  createElement,
  getLocalStroage,
  HomeArticleTagList,
} from './index.js';
import LoadingSpinner from '../../commons/LoadingSpinner.js';

function renderSpinner() {
  const col = document.querySelector('.articles-toggle');
  const spinnerContainer = LoadingSpinner();
  col.appendChild(spinnerContainer);
}

function removeSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.remove();
}

function ProfileArticle({ feed, user }) {
  const handleFavoriteClick = async (e) => {
    const slug = e.target.dataset;

    const button = e.target;
    const initialCount = button.textContent.trim();

    const deleteCount = String(Number(initialCount) - 1);

    if (button.classList.contains('clicked')) {
      return;
    }
    button.classList.add('clicked');

    if (Number(initialCount) <= 0) {
      return;
    }

    updateState({
      favoritesCount: deleteCount,
    });

    button.innerHTML = /* HTML */ `
      <i class="ion-heart"></i>${state.favoritesCount}
    `;

    const { set } = slug;

    if (Number(initialCount) > 0) {
      await article_request.cancelFavorite(set, getLocalStroage('token'));
    }
  };

  const render = async () => {
    const col = document.querySelector('.articles-toggle');
    const { username } = user;

    const token = getLocalStroage('token');
    switch (feed) {
      case 'my':
        renderSpinner();
        const { articles: articleUsername } =
          await article_request.getUserArticles(username, token);
        updateState({
          articles: articleUsername,
        });
        removeSpinner();
        break;
      case 'favorite':
        renderSpinner();
        const { articles: articleFavorite } =
          await article_request.getUserFavortieArticles(username, token);
        updateState({
          articles: articleFavorite,
        });
        removeSpinner();
        break;
      default:
        renderSpinner();
        const { articles } = await article_request.getUserArticles(
          username,
          token
        );
        removeSpinner();

        updateState({
          articles: articles,
        });
        break;
    }

    if (Array.isArray(state.articles)) {
      LoadingSpinner();
      state.articles.map(({ body, favoritesCount, slug, tagList, title }) => {
        const ariticle = createElement('div', 'article-preview');
        updateState({
          favoritesCount: favoritesCount,
        });
        ariticle.innerHTML = /* HTML */ `
          <div class="article-meta">
            <a href=""><img src=${user.image} /></a>
            <div class="info">
              <a href="" class="author">${username}</a>
              <span class="date">${title}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> ${state.favoritesCount}
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>${title}</h1>
            <p>${body}</p>
            <span>Read more...</span>
         ${Array.isArray(tagList) && HomeArticleTagList(tagList)}
          </a>
        </div>
        `;
        col.appendChild(ariticle);
        const button = ariticle.querySelector('button');
        button.setAttribute('data-set', slug);
        button.addEventListener('click', handleFavoriteClick);
      });
    }
  };

  render();
}

const initialState = {
  articles: [],
  favoritesCount: 0,
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;

export default ProfileArticle;
