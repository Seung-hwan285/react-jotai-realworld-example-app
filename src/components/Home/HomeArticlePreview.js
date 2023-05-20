import HomeArticleTagList from './HomeArticleTagList.js';
import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';

function HomeArticlePreview(articles, onClick) {
  const handleArticleFavoriteClick = async (e) => {
    e.preventDefault();
    const slug = e.target.dataset;

    const button = e.target;

    const initialCount = button.textContent.trim();
    const updateCount = String(Number(initialCount) + 1);

    button.innerHTML = `
        <i class="ion-heart"></i> ${updateCount}
    `;
    updateState({
      favoritesCount: updateCount,
    });

    const { set } = slug;
    await article_request.favorite(set, getLocalStroage('token'));
  };

  const state = {
    favoritesCount: 0,
  };

  const updateState = (key, value) => {
    state[key] = value;
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
            updateState('favoritesCount', favoritesCount);
            const article = document.createElement('div');
            article.className = 'article-preview';

            article.innerHTML = /* HTML */ `
              <div class="article-meta">
                <a href="profile.html"><img src=${author.image} /></a>
                <div class="info">
                  <a href="" class="author">${author.username}</a>
                  <span class="date">${createdAt}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
            button.addEventListener('click', handleArticleFavoriteClick);
            article.addEventListener('click', onClick);
          }
        );
      }
    }
  };

  render();
}

export default HomeArticlePreview;
