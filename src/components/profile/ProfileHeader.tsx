import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { asyncUserAtom } from '../../lib/jotai/async-atom';

function ProfileHeader() {
  const [user] = useAtom(asyncUserAtom);

  return (
    <>
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={`${user?.image}`} className="user-img" />
              <h4>{user?.username}</h4>
              <p>{`${user?.bio}`}</p>
              <Link
                to={'/setting'}
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <i className="ion-plus-round"></i> Edit Page {user?.username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
