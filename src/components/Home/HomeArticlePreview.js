import HomeArticleTagList from './HomeArticleTagList.js';

function HomeArticlePreview(articles) {
  const render = async () => {
    const col = document.querySelector('.col-md-9');

    if (articles) {
      if (document.querySelector('.spinner'))
        document.querySelector('.spinner').remove();

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
                  <i class="ion-heart"></i> ${favoritesCount}
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>${title}</h1>
                <p>${description}</p>
                <span>Read more...</span>

                ${Array.isArray(tagList) && HomeArticleTagList(tagList)}
              </a>
            `;

            col.appendChild(article);

            // const tagListElement = document.querySelectorAll('.preview-link');
            // tagListElement.forEach((tagElement) => {
            //   tagElement.removeEventListener('click', handleArticleTagClick);
            //   tagElement.addEventListener('click', handleArticleTagClick);
            // });
          }
        );
      }
    }
  };

  render();
}

export default HomeArticlePreview;
