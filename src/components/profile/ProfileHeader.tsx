import React from 'react';
import useProfileHeader from './hook/useHeader';
import Button from '../common/Button';

function ProfileHeader() {
  const { handleSettingClick, user } = useProfileHeader();

  return (
    <>
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={`${user?.image}`} className="user-img" />
              <h4>{user?.username}</h4>
              <p>{`${user?.bio}`}</p>
              <Button
                onClick={handleSettingClick}
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <i className="ion-plus-round"></i> Edit Page {user?.username}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
