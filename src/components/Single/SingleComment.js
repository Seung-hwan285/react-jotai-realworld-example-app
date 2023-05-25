import {
  appendChildrenToParent,
  comment_request,
  createCommentForm,
  createComments,
  createElement,
} from './index.js';

function renderComment({ comment }) {
  const commentCard = createComments([comment]);

  const commentsContainer = document.querySelector('.comment-box');
  commentsContainer.insertAdjacentHTML('beforeend', commentCard);
}

function renderSingle(article, comments, image) {
  const row = createElement('div', 'row');
  const col = createElement(
    'div',
    'col-xs-12 col-md-8 offset-md-2 comment-box'
  );

  if (!image) {
    return;
  }

  const commentForm = createCommentForm(image);
  const commentCard = createComments(comments);

  col.insertAdjacentHTML('beforeend', commentForm);
  col.insertAdjacentHTML('beforeend', commentCard);
  appendChildrenToParent(row, col);

  const pageElement = document.querySelector('.page');
  pageElement.insertAdjacentHTML('beforeend', row.innerHTML);
}

function SingleComment({ user, comment, token }) {
  const { article } = user;
  const { comments } = comment;

  if (!token) {
    return;
  }

  const { image } = token;

  renderSingle(article, comments, image);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { pathname } = window.location;
    const slug = pathname.split('/')[2];
    const textarea = e.target
      .closest('.comment-form')
      .querySelector('textarea');

    const data = await comment_request.createComment(slug, textarea.value);

    textarea.value = '';
    renderComment(data);
    render();
  };

  const handleCommentClick = async (e) => {
    const { set } = e.target.dataset;
    const { pathname } = window.location;
    const slug = pathname.split('/')[2];

    const commentElement = e.target.closest('.card-container');
    const hr = commentElement.previousElementSibling;

    if (commentElement) {
      hr.remove();
      commentElement.remove();
    }

    await comment_request.deleteComment(slug, set);
  };

  const render = () => {
    const form = document.querySelector('.comment-form');
    const buttons = document.querySelectorAll('.ion-trash-a');

    form?.addEventListener('submit', handleCommentSubmit);

    buttons.forEach((button) => {
      button.addEventListener('click', handleCommentClick);
    });
  };
  render();
}

export default SingleComment;
