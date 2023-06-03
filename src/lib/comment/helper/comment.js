export const createCommentForm = (image) => {
  return /* HTML */ `
    <hr />
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src=${image} class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  `;
};

export const createComments = (comments, token) => {
  return comments
    .map(({ body, author, createdAt, id }) => {
      const iconClass =
        author.username === token.username
          ? `<i data-set="${id}" class="ion-trash-a"></i>`
          : '';

      return `
        <hr/>
          <div class="card card-container">
            <div class="card-block">
              <p class="card-text">
                    ${body}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src=${author.image}
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">${author.username}</a>
              <span class="date-posted">${createdAt}</span>
                <span class="mod-options">
                ${iconClass}
              </span>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join('');
};
