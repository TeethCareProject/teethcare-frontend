import React from "react";
import ClinicDetailContainer from "../../containers/ClinicDetail/ClinicDetail.container";
import MobileNavigationBar from "../../containers/MobileNavigationBar/MobileNavigationBar.container";

const ClinicDetailPage = () => {
  return (
    <>
      <MobileNavigationBar title="Teethcare" />
      <ClinicDetailContainer />
    </>
  );
};

export default ClinicDetailPage;
