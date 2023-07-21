import React from 'react';
import { PropsArticle } from '../../lib/utils/type/article';

type BodyTags = {
  tags?: string[];
};

function SingleBodyTag({ tags }: BodyTags) {
  return (
    <ul className="tag-list">
      {tags?.map((tag: string) => {
        return (
          <li
            key={new Date().toISOString()}
            className="tag-default tag-pill tag-outline"
          >
            {tag}
          </li>
        );
      })}
    </ul>
  );
}

function SingleBody({ article }: PropsArticle) {
  return (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <h2 id="introducing-ionic">{article?.title}</h2>
          <p>{article?.body}</p>
          <SingleBodyTag tags={article?.tagList} />
        </div>
      </div>
    </>
  );
}
export default SingleBody;
