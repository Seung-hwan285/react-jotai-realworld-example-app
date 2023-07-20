import React from 'react';
import { PropsFeed } from '../../lib/utils/type/article';
import Button from '../common/Button';

function ProfileFeed({ feed, onClick }: PropsFeed) {
  return (
    <>
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <Button
              onClick={() => onClick('my')}
              className={feed === 'my' ? `nav-link active` : 'nav-link'}
            >
              My Articles
            </Button>
          </li>
          <li className="nav-item">
            <Button
              onClick={() => onClick('favorite')}
              className={feed === 'favorite' ? `nav-link active` : 'nav-link'}
            >
              Favorited Articles
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
export default ProfileFeed;
