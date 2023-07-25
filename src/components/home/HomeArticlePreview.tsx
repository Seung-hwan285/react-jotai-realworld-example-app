import React, { Suspense, useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { asyncArticleAtom, refreshAtom } from '../../lib/jotai/async-atom';
import { Props, PropsData } from '../../lib/utils/type/article';
import { useLocation } from 'react-router-dom';
import { loadable } from 'jotai/utils';
import { ArticlesAPI } from '../../lib/utils/request/articles';
function HomeArticleList({ slug, data }: PropsData) {
  return (
    <div key={slug} className="article-preview">
      <div className="article-meta">
        <a href="/profile/eric-simons">
          <img src={data?.author?.image} />
        </a>
        <div className="info">
          <a href="/profile/eric-simons" className="author">
            {data?.author?.username}
          </a>
        </div>

        <a
          href="/article/how-to-build-webapps-that-scale"
          className="preview-link"
        >
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <span>Read more...</span>

          <ul className="tag-list">
            {data &&
              data?.tagList?.map((tag: string, idx: number) => {
                return (
                  <li key={idx} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                );
              })}
          </ul>
        </a>
      </div>
    </div>
  );
}

function HomeArticleBody() {
  const [refressh, setRefresh] = useAtom(refreshAtom);
  const [data] = useAtom(asyncArticleAtom);

  useEffect(() => {
    setRefresh(!refressh);
  }, []);

  return (
    <>
      {data &&
        data?.map((data: Props) => {
          const MemoComponent = React.memo(HomeArticleList);
          // eslint-disable-next-line react/jsx-key
          return <MemoComponent data={data} />;
        })}
    </>
  );
}
export default HomeArticleBody;
