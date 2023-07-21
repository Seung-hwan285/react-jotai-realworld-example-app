import React from 'react';
import { PropsArray, PropsTag } from '../../lib/utils/type/article';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
function ProfileTagList({ tagList }: PropsTag) {
  return (
    <ul className="tag-list">
      {/* eslint-disable-next-line react/prop-types */}
      {tagList?.map((tag: string) => (
        <li
          className="tag-default tag-pill tag-outline"
          key={new Date().toISOString()}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProfileArticles({ articles }: PropsArray) {
  const histoyr = useNavigate();

  const handleClick = (slug: string) => {
    histoyr(`/article/${slug}`);
  };

  return (
    <>
      {articles &&
        articles.map((data: any) => {
          return (
            <div
              onClick={() => handleClick(data.slug)}
              key={data.slug}
              className="article-preview"
            >
              <div className="article-meta">
                <a href="/profile/eric-simons">
                  <img src={`${data.author.image}`} alt="Author" />
                </a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author"></a>
                  <span className="date">{data.author.username}</span>
                </div>
                <Button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> {data.favoritesCount}
                </Button>
              </div>
              <a className="preview-link">
                <h1>{data.body}</h1>
                <p>{data.description}</p>
                <span>Read more...</span>

                <ProfileTagList tagList={data.tagList} />
              </a>
            </div>
          );
        })}
    </>
  );
}
export default ProfileArticles;
