import React from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileInfo from '../../components/profile/ProfileInfo';

function ProfilePage() {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <ProfileInfo />
    </div>
  );
}

export default ProfilePage;
