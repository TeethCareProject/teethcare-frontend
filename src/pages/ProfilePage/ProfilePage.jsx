import React from "react";
import ProfileFormContainer from "../../containers/ProfileForm/ProfileForm.container";
import MobileNavigationBar from "../../containers/MobileNavigationBar/MobileNavigationBar.container";

const ProfilePage = () => {
  return (
    <>
      <MobileNavigationBar title="Teethcare" />
      <ProfileFormContainer />
    </>
  );
};

export default ProfilePage;
