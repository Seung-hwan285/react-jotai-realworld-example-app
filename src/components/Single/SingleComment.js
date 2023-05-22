import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function renderCommentForm(comments) {
  return comments.map((comment) => {
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
          <img src=${comment.author.image} class="comment-author-img" />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>
    `;
  });
}
function renderComments(comments) {
  return comments
    .map((comment) => {
      console.log(comment);
      return `
        <hr/>
          <div class="card">
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
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join('');
}

function SingleComment({ comments }) {
  const row = createElement('div', 'row');
  const col = createElement('div', 'col-xs-12 col-md-8 offset-md-2');
  const getCommentForm = renderCommentForm(comments);
  const getComment = renderComments(comments);

  col.insertAdjacentHTML('beforeend', getCommentForm);
  col.insertAdjacentHTML('beforeend', getComment);
  appendChildrenToParent(row, col);

  const render = () => {
    const pageElement = document.querySelector('.page');
    pageElement.insertAdjacentHTML('beforeend', row.innerHTML);
  };
  render();
}
export default SingleComment;
