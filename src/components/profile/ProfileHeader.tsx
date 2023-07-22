import React from 'react';
import useProfileHeader from './hook/useHeader';
import Button from '../common/Button';
import { PropsLoading } from '../../lib/utils/type/article';

function LoadingSkeleton({ loading, user }: PropsLoading) {
  return (
    <div className="loading-skeleton">
      {loading ? (
        <div className="skeleton-image"></div>
      ) : (
        <img src={`${user?.user?.image}`} className="user-img" />
      )}

      {loading ? (
        <div className="skeleton-text"></div>
      ) : (
        <p>{`${user?.user?.bio}`}</p>
      )}
    </div>
  );
}

function ProfileHeader() {
  const { loading, handleSettingClick, user } = useProfileHeader();

  return (
    <>
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <LoadingSkeleton user={user} loading={loading} />

              <Button
                onClick={handleSettingClick}
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <i className="ion-plus-round"></i> Follow {user?.user?.username}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
