import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import useProfileInfo from './hook/info';
import ProfileArticles from './ProfileArticles';
import ProfileFeed from './ProfileFeed';

function ProfileInfo() {
  const { handleFeedClick, feed, isPending, articles } = useProfileInfo();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileFeed feed={feed} onClick={handleFeedClick} />

            {isPending ? (
              <LoadingSpinner />
            ) : (
              <ProfileArticles articles={articles} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileInfo;
