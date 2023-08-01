import React from 'react';
import {
  Props,
  PropsArray,
  PropsData,
  PropsTag,
} from '../../lib/utils/type/article';
import Button from '../common/Button';
import useArticleList from './hook/useArticleList';
import { Link } from 'react-router-dom';

const FAVORITED_CLASS = 'btn btn-sm btn-primary pull-xs-right';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary pull-xs-right';

function ProfileTags({ tags }: PropsTag) {
  return (
    <ul className="tag-list">
      {tags.map((tag: string, idx: number) => (
        <li className="tag-default tag-pill tag-outline" key={idx}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProfileArticleList({ slug, data }: PropsData) {
  const { count, disabled, handleFavoriteClick } = useArticleList({
    data,
  });

  return (
    <div key={slug} className="article-preview">
      <div className="article-meta">
        <a href="/profile/eric-simons">
          <img src={`${data.author.image}`} alt="Author" />
        </a>
        <div className="info">
          <a href="/profile/eric-simons" className="author"></a>
          <span className="date">{data.author.username}</span>
        </div>
        <Button
          onClick={() => handleFavoriteClick(data.slug)}
          className={disabled ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
          // className="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i className="ion-heart"></i> {count}
        </Button>
      </div>

      <Link to={`/article/${data.slug}`} className="preview-link">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <span>Read more...</span>

        <ProfileTags tags={data.tagList} />
      </Link>
    </div>
  );
}

function NoArticles() {
  return (
    <div>
      <div className="article-preview">No article are here... yet.</div>
    </div>
  );
}

function ProfileArticles({ articles }: PropsArray) {
  return (
    <>
      {!articles || articles.length === 0 ? (
        <NoArticles />
      ) : (
        articles.map((data: Props) => (
          <div key={data.slug}>
            <ProfileArticleList slug={data.slug} data={data} />
          </div>
        ))
      )}
    </>
  );
}
export default ProfileArticles;
