import React from 'react';
import { useAtom } from 'jotai';
import { articleFeedAtom } from '../../lib/jotai/article';
function HomeFeed() {
  const [feedAtom, setFeed] = useAtom(articleFeedAtom);

  const handleClick = (feed: string) => {
    setFeed({ feed: feed, tag: '' });
  };

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <span
            onClick={() => handleClick('your')}
            className={`nav-link ${feedAtom.feed === 'your' ? 'active' : ''}`}
          >
            Your Feed
          </span>
        </li>
        <li className="nav-item">
          <span
            onClick={() => handleClick('global')}
            className={`nav-link ${feedAtom.feed === 'global' ? 'active' : ''}`}
          >
            Global Feed
          </span>
        </li>

        <li className="nav-item">
          <span
            onClick={() => handleClick('tag')}
            className={`nav-link ${feedAtom.tag !== '' ? 'active' : ''}`}
          >
            {feedAtom.tag ? `#${feedAtom.tag}` : ''}
          </span>
        </li>
      </ul>
    </div>
  );
}
export default HomeFeed;
