import HomeArticleTagList from './HomeArticleTagList.js';
import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';

const FAVORITED_CLASS = 'btn btn-sm btn-primary pull-xs-right';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary pull-xs-right';

function HomeArticlePreview(articles, onClick) {
  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    const slug = e.target.dataset;
    const button = e.target;
    const initialCount = button.textContent.trim();

    if (!e.target.classList.contains('ion-heart')) {
      const updateCount = String(Number(initialCount) + 1);
      const deleteCount = String(Number(initialCount) - 1);

      updateState({
        favorited: !state.favorited,
        favoritesCount: state.favorited ? updateCount : deleteCount,
      });

      button.innerHTML = /* HTML */ `
      <i class="ion-heart"></i> ${state.favorited ? updateCount : deleteCount}
    </button>`;

      const { set } = slug;

      if (state.favorited) {
        await article_request.favorite(set, getLocalStroage('token'));
      } else {
        await article_request.cancelFavorite(set, getLocalStroage('token'));
      }
    }
  };

  const render = () => {
    const col = document.querySelector('.col-md-9');
    const spinner = document.querySelector('.spinner');
    if (articles) {
      if (spinner) {
        spinner.remove();
      }
      if (articles && Array.isArray(articles)) {
        articles.map(
          ({
            author,
            body,
            createdAt,
            description,
            favorited,
            favoritesCount,
            slug,
            tagList,
            title,
            updatedAt,
          }) => {
            updateState({
              favoritesCount: favoritesCount,
            });
            const article = document.createElement('div');
            article.className = 'article-preview';

            article.innerHTML = /* HTML */ `
              <div class="article-meta">
                <a href="profile.html"><img src=${author.image} /></a>
                <div class="info">
                  <a href="" class="author">${author.username}</a>
                  <span class="date">${createdAt}</span>
                </div>
                <button
                  class="${state.favorited} ? ${FAVORITED_CLASS} : ${NOT_FAVORITED_CLASS}"
                >
                  <i class="ion-heart"></i> ${state.favoritesCount}
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>${title}</h1>
                <p>${description}</p>
                <span>Read more...</span>
                ${Array.isArray(tagList) && HomeArticleTagList(tagList)}
              </a>
            `;

            col.append(article);

            const button = article.querySelector('button');
            button.setAttribute('data-set', slug);
            button.addEventListener('click', handleFavoriteClick);
            article.addEventListener('click', onClick);
          }
        );
      }
    }
  };

  render();
}

const initialState = {
  favorited: false,
  favoritesCount: 0,
};

const updateState = (nextState) => {
  state = { ...state, ...nextState };
};

let state = initialState;

export default HomeArticlePreview;
