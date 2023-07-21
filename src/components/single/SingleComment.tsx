import React, { useEffect, useState } from 'react';
import {
  PropsComments,
  PropsCommentsList,
  PropsCommnet,
} from '../../lib/utils/type/comment';
import { useAtom } from 'jotai';
import { readOnlyImageAtom } from '../../lib/jotai/user';
import { getLocalStroage } from '../../lib/utils/storage';
import { bodyAtom } from '../../lib/jotai/article';

function SingleCommentList({ comments }: PropsComments) {
  const [iconClass, setIconClass] = useState<React.ReactNode>(null);
  const token = getLocalStroage('token');

  useEffect(() => {
    const icon = token ? <i data-set="${id}" className="ion-trash-a" /> : '';
    setIconClass(icon);
  }, []);

  return (
    <>
      {comments &&
        comments?.map((comment: PropsCommnet) => {
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
                <span className="mod-options">{iconClass}</span>
              </div>
            </div>
          );
        })}
    </>
  );
}

function SingleCommentForm({ handleSubmit, commentList }: PropsCommentsList) {
  const [image] = useAtom(readOnlyImageAtom);
  const imageElement = image && String(image);
  const [text, setBody] = useAtom(bodyAtom);

  return (
    <>
      <form onSubmit={handleSubmit} className="card comment-form">
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
      <SingleCommentList comments={commentList} />
    </>
  );
}

function SingleComment({ handleSubmit, commentList }: PropsCommentsList) {
  const { comments }: any = commentList;

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <SingleCommentForm
            handleSubmit={handleSubmit}
            commentList={comments}
          />
        </div>
      </div>
    </>
  );
}
export default SingleComment;
