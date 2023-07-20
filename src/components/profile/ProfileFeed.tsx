import React from 'react';
import { PropsFeed } from '../../lib/utils/type/article';

function ProfileFeed({ feed, onClick }: PropsFeed) {
  return (
    <>
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <button
              onClick={() => onClick('my')}
              className={feed === 'my' ? `nav-link active` : 'nav-link'}
            >
              My Articles
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => onClick('favorite')}
              className={feed === 'favorite' ? `nav-link active` : 'nav-link'}
            >
              Favorited Articles
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
export default ProfileFeed;
