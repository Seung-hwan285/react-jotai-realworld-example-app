import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';
import { comment_request } from '../../lib/comment/request.js';
import {
  renderCommentForm,
  renderComments,
} from '../../utils/helper/comment.js';

function renderComment({ comment }) {
  const commentCard = renderComments([comment]);

  const commentsContainer = document.querySelector('.comment-box');
  commentsContainer.insertAdjacentHTML('beforeend', commentCard);
}

function renderSingle(article, comments) {
  const row = createElement('div', 'row');
  const col = createElement(
    'div',
    'col-xs-12 col-md-8 offset-md-2 comment-box'
  );

  const commentForm = renderCommentForm(article.author.image);
  const commentCard = renderComments(comments);

  col.insertAdjacentHTML('beforeend', commentForm);
  col.insertAdjacentHTML('beforeend', commentCard);
  appendChildrenToParent(row, col);

  const pageElement = document.querySelector('.page');
  pageElement.insertAdjacentHTML('beforeend', row.innerHTML);
}

function SingleComment({ user, comment }) {
  const { article } = user;
  const { comments } = comment;

  renderSingle(article, comments);

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

    form.addEventListener('submit', handleCommentSubmit);
    buttons.forEach((button) => {
      button.addEventListener('click', handleCommentClick);
    });
  };
  render();
}

export default SingleComment;
