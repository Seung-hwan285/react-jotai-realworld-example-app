import React, { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { asyncArticleAtom } from '../../lib/jotai/async-atom';
import { Props, PropsData, PropsTag } from '../../lib/utils/type/article';
import { useLocation } from 'react-router-dom';
import Button from '../common/Button';
import HomePagination from './HomePagination';
import { articleFeedAtom, articleOffsetAtom } from '../../lib/jotai/article';
import useHomeArticleList from './hook/useHomeArticleList';

const FAVORITED_CLASS = 'btn btn-sm btn-primary pull-xs-right';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary pull-xs-right';

function HomeArticleTags({ tags }: PropsTag) {
  return (
    <ul className="tag-list">
      {tags?.map((tag: string, idx: number) => (
        <li className="tag-default tag-pill tag-outline" key={idx}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function HomeArticleList({ data }: PropsData) {
  const { isAuth, count, disabled, handleFavoriteClick, handleClick } =
    useHomeArticleList({
      data,
    });

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
        <Button
          disabled={isAuth}
          onClick={() => handleFavoriteClick(data.slug)}
          className={disabled ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
          // className="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i className="ion-heart"></i> {count}
        </Button>
      </div>
      <a onClick={() => handleClick(data.slug)} className="preview-link">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <span>Read more...</span>

        <HomeArticleTags tags={data.tagList} />
      </a>
    </div>
  );
}

function HomeArticleBody() {
  const [data, refreshPosts] = useAtom(asyncArticleAtom);

  const location = useLocation();

  const [feed] = useAtom(articleFeedAtom);

  useEffect(() => {
    refreshPosts();
  }, [location.pathname]);

  const mockList = Array.from({ length: 20 }, (val, idx) => idx + 1);
  const memoizedData = useMemo(() => data || [], [data]);

  return (
    <>
      {feed.feed === 'your' ? (
        <div className="article-preview">No article are here... yet.</div>
      ) : (
        <>
          {memoizedData.map((data: Props, idx: number) => (
            <HomeArticleList key={idx} data={data} />
          ))}
          <HomePagination list={mockList} />
        </>
      )}
    </>
  );
}
export default HomeArticleBody;
