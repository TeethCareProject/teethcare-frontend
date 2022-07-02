import React from "react";
import "./ClinicPage.style.scss";
import ClinicCardListContainer from "../../containers/ClinicCardList/ClinicCardList.container";
import MobileNavigationBar from "../../containers/MobileNavigationBar/MobileNavigationBar.container";

const ClinicPage = () => {
  return (
    <>
      <MobileNavigationBar title="Teethcare" />
      <ClinicCardListContainer />
    </>
  );
};

export default ClinicPage;
