import React from 'react';
import { PropsArticle } from '../../lib/utils/type/article';

function SingleBanner({ article }: PropsArticle) {
  return (
    <>
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>

          <div className="article-meta">
            <a href="/profile/eric-simons">
              <img src={`${article?.author.image}`} />
            </a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">
                {article?.author.username}
              </a>
              <span className="date">{article?.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleBanner;
