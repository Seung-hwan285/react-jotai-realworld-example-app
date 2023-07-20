import React from 'react';
import { PropsArray } from '../../lib/utils/type/article';

function ProfileArticles({ articles }: PropsArray) {
  return (
    <>
      {articles &&
        articles.map((data: any) => {
          return (
            <div key={data.slug} className="article-preview">
              <div className="article-meta">
                <a href="/profile/eric-simons">
                  <img src={`${data.author.image}`} alt="Author" />
                </a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author"></a>
                  <span className="date">{data.author.username}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> {data.favoritesCount}
                </button>
              </div>
              <a
                href="/article/how-to-buil-webapps-that-scale"
                className="preview-link"
              >
                <h1>{data.body}</h1>
                <p>{data.description}</p>
                <span>Read more...</span>

                {data.tagList.map((tag: string) => (
                  <ul className="tag-list" key={new Date().toISOString()}>
                    <li className="tag-default tag-pill tag-outline">{tag}</li>
                  </ul>
                ))}
              </a>
            </div>
          );
        })}
    </>
  );
}
export default ProfileArticles;
