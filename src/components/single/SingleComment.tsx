import React from 'react';
import { PropsCommentsList, PropsCommnet } from '../../lib/utils/type/comment';
import useImageAndText from './hook/useImageAndText';
import useCommentList from './hook/useCommentList';

function SingleCommentList() {
  const { iconClass, comments, handleClick } = useCommentList();

  return (
    <>
      {!!comments &&
        comments?.comments?.map((comment: PropsCommnet) => {
          return (
            <div key={comment.id} className="card">
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <a href="/profile/author" className="comment-author">
                  <img
                    src={`${comment.author.image}`}
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="/profile/jacob-schmidt" className="comment-author">
                  {comment.author.username}
                </a>
                <span className="date-posted">{comment.createdAt}</span>
                <span
                  onClick={() => handleClick(comment.id)}
                  className="mod-options"
                >
                  {iconClass}
                </span>
              </div>
            </div>
          );
        })}
    </>
  );
}

function SingleCommentForm({ onSubmit }: PropsCommentsList) {
  const { imageElement, text, setBody } = useImageAndText();

  return (
    <>
      <form onSubmit={onSubmit} className="card comment-form">
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            value={text.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBody({ body: e.target.value })
            }
          />
        </div>
        <div className="card-footer">
          <img className="comment-author-img" src={imageElement} />
          <button className="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>
      <SingleCommentList />
    </>
  );
}

function SingleComment({ onSubmit }: PropsCommentsList) {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <SingleCommentForm onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
export default SingleComment;
