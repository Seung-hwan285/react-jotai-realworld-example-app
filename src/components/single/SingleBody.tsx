import React from 'react';
import { BodyTags, PropsArticle } from '../../lib/utils/type/article';

function SingleBodyTags({ tags }: BodyTags) {
  return (
    <ul className="tag-list">
      {tags?.map((tag: string) => {
        return (
          <li key={tag} className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        );
      })}
    </ul>
  );
}

function SingleBody({ article }: PropsArticle) {
  if (!article) {
    return null;
  }

  return (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <h2 id="introducing-ionic">{article?.title}</h2>
          <p>{article?.body}</p>
          <SingleBodyTags tags={article?.tagList} />
        </div>
      </div>
    </>
  );
}
export default SingleBody;
