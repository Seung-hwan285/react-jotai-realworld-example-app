"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderComment({
  comment
}, token) {
  const commentCard = (0, _index.createComments)([comment], token);
  const commentsContainer = document.querySelector('.comment-box');
  commentsContainer.insertAdjacentHTML('beforeend', commentCard);
}
function renderSingle({
  article,
  comments,
  image,
  token
}) {
  const row = (0, _index.createElement)('div', 'row');
  const col = (0, _index.createElement)('div', 'col-xs-12 col-md-8 offset-md-2 comment-box');
  if (!image) {
    return;
  }
  const commentForm = (0, _index.createCommentForm)(image);
  const commentCard = (0, _index.createComments)(comments, token);
  col.insertAdjacentHTML('beforeend', commentForm);
  col.insertAdjacentHTML('beforeend', commentCard);
  (0, _index.appendChildrenToParent)(row, col);
  const pageElement = document.querySelector('.page');
  pageElement.insertAdjacentHTML('beforeend', row.innerHTML);
}
function SingleComment({
  user,
  comment,
  token
}) {
  const article = user.article;
  const comments = comment.comments;
  if (!token) {
    return;
  }
  const image = token.image;
  const singleData = {
    article,
    comments,
    image,
    token
  };
  renderSingle(singleData);
  const handleCommentSubmit = async function (e) {
    e.preventDefault();
    const pathname = window.location.pathname;
    const slug = pathname.split('/')[2];
    const textarea = e.target.closest('.comment-form').querySelector('textarea');
    const data = await _index.comment_request.createComment(slug, textarea.value);
    textarea.value = '';
    renderComment(data, token);
    render();
  };
  const handleCommentClick = async function (e) {
    const set = e.target.dataset.set;
    const pathname = window.location.pathname;
    const slug = pathname.split('/')[2];
    const commentElement = e.target.closest('.card-container');
    const hr = commentElement.previousElementSibling;
    if (commentElement) {
      hr.remove();
      commentElement.remove();
    }
    await _index.comment_request.deleteComment(slug, set);
  };
  const render = function () {
    const form = document.querySelector('.comment-form');
    const buttons = document.querySelectorAll('.ion-trash-a');
    form?.addEventListener('submit', handleCommentSubmit);
    buttons.forEach(function (button) {
      button.addEventListener('click', handleCommentClick);
    });
  };
  render();
}
var _default = SingleComment;
exports.default = _default;