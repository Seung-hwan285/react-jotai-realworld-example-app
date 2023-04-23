function RenderData(articles, col, nav) {
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
        const Article = document.createElement('div');

        Article.className = 'article-preview';
        Article.innerHTML = /* HTML */ `
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
          </a>
        `;

        col.appendChild(Article);
        col.appendChild(nav);
      }
    );
  }
}
export default RenderData;
