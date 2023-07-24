import React from 'react';
import { PropsArticle } from '../../lib/utils/type/article';
import useSingleBanner from './hook/useSingleBanner';
import Button from '../common/Button';

function SingleBanner({ article }: PropsArticle) {
  if (!article) {
    return null;
  }

  const { userAtom, handleClick } = useSingleBanner();

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

            {article.author.username === userAtom && (
              <>
                <Button
                  onClick={() => handleClick(article.slug)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="ion-trash-a"></i>
                  &nbsp; Delete Article
                </Button>
                &nbsp;&nbsp;
                <Button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post{' '}
                  <span className="counter">{article.favoritesCount}</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleBanner;
