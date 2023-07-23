import React from 'react';
import { Props, PropsArray, PropsTag } from '../../lib/utils/type/article';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
function ProfileTags({ tags }: PropsTag) {
  return (
    <ul className="tag-list">
      {/* eslint-disable-next-line react/prop-types */}
      {tags?.map((tag: string, idx: number) => (
        <li className="tag-default tag-pill tag-outline" key={idx}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProfileArticles({ articles }: PropsArray) {
  if (!articles) {
    return null;
  }

  const history = useNavigate();

  const handleClick = (slug: string) => {
    history(`/article/${slug}`);
  };

  return (
    <>
      {!!articles &&
        articles?.map((data: Props) => {
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
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <span>Read more...</span>

                <ProfileTags tags={data.tagList} />
              </a>
            </div>
          );
        })}
    </>
  );
}
export default ProfileArticles;
