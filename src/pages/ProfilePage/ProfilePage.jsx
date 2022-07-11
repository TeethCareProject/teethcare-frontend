import React from "react";
import ProfileFormContainer from "../../containers/ProfileForm/ProfileForm.container";
import MobileMenuBar from "../../containers/MobileMenuBar/MobileMenuBar.container";
import RoutePath from "../../routers/Path";

const ProfilePage = () => {
  return (
    <>
      <MobileMenuBar title="My Profile" location={RoutePath.HOME_PAGE} />
      <ProfileFormContainer />
    </>
  );
};

export default ProfilePage;
