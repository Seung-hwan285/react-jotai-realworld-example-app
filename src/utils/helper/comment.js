export const renderCommentForm = (image) => {
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

export const renderComments = (comments) => {
  return comments
    .map((comment) => {
      return `
        <hr/>
          <div class="card card-container">
            <div class="card-block">
              <p class="card-text">
                    ${comment.body}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src=${comment.author.image}
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">${comment.username}</a>
              <span class="date-posted">${comment.createdAt}</span>
                <span class="mod-options">
                <i data-set="${comment.id}" class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join('');
};
