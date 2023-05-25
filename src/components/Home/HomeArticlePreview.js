import HomeArticleTagList from './HomeArticleTagList.js';
import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';

const FAVORITED_CLASS = 'btn btn-sm btn-primary pull-xs-right';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary pull-xs-right';

function HomeArticlePreview(articles, onClick) {
  const handleArticleClick = (slug) => {
    route(`/articles/${slug}`);
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    const slug = e.target.dataset;
    const button = e.target;
    const initialCount = button.textContent.trim();

    if (!e.target.classList.contains('ion-heart')) {
      const updateCount = String(Number(initialCount) + 1);
      const deleteCount = String(Number(initialCount) - 1);

      const className = button.className.split(' ');

      const boolean = className[className.length - 1] === 'true';

      if (boolean) {
        updateState({
          favorited: false,
          favoritesCount: deleteCount,
        });
      }

      if (!boolean) {
        updateState({
          favorited: true,
          favoritesCount: updateCount,
        });
      }

      button.innerHTML = /* HTML */ `
      <i class="ion-heart"></i> ${state.favoritesCount}
    </button>`;

      button.disabled = true;

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
              favorited: favorited,
              favoritesCount: favoritesCount,
            });
            const article = document.createElement('div');
            article.className = 'article-preview';

            const isFavorited = state.favorited === true;

            const buttonClass = isFavorited
              ? FAVORITED_CLASS
              : NOT_FAVORITED_CLASS;

            article.innerHTML = /* HTML */ `
              <div class="article-meta">
                <a href="profile.html"><img src=${author.image} /></a>
                <div class="info">
                  <a href="" class="author">${author.username}</a>
                  <span class="date">${createdAt}</span>
                </div>
                <button class="${buttonClass} ${isFavorited}">
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
            const preview = article.querySelector('.preview-link');
            button.setAttribute('data-set', slug);
            button.addEventListener('click', handleFavoriteClick);

            preview.addEventListener('click', onClick);

            article.addEventListener('click', (e) => {
              e.preventDefault();

              const tag = e.target.classList.contains('tag-pill');
              const likeButton = e.target.classList.contains('btn');
              console.log(tag);
              if (!tag && !likeButton) {
                handleArticleClick(slug);
              }
            });
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
