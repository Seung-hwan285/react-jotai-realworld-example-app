import React from 'react';
import {
  Comments,
  PropsCommentsList,
  PropsCommnet,
} from '../../lib/utils/type/comment';
import useImageAndText from './hook/useImageAndText';
import useCommentList from './hook/useCommentList';
import { useAtom } from 'jotai';
import { readOnlySlug } from '../../lib/jotai/user';
import { CommentAPI } from '../../lib/utils/request/comment';
import { commentList } from '../../lib/jotai/comment';

function SingleCommentList() {
  const { iconClass } = useCommentList();

  const [slugAtom] = useAtom(readOnlySlug);
  const [comments, setComments] = useAtom(commentList);

  const handleClick = async (id: number) => {
    try {
      const { slug }: any = slugAtom;
      const { data } = await CommentAPI.deleteComment(slug, id);

      setComments((prev: Comments) => ({
        comments: prev.comments.filter(
          (comment: PropsCommnet) => comment.id !== id,
        ),
      }));

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

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

function SingleCommentForm({ handleSubmit }: PropsCommentsList) {
  const { imageElement, text, setBody } = useImageAndText();

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
      <SingleCommentList />
    </>
  );
}

function SingleComment({ handleSubmit }: PropsCommentsList) {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <SingleCommentForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
export default SingleComment;
