import React from "react";
import ProfileFormContainer from "../../containers/ProfileForm/ProfileForm.container";
import MobileMenuBar from "../../containers/MobileMenuBar/MobileMenuBar.container";

const ProfilePage = () => {
  return (
    <>
      <MobileMenuBar title="Teethcare" />
      <ProfileFormContainer />
    </>
  );
};

export default ProfilePage;
