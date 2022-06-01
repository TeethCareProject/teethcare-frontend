import React from "react";
import { Row, Button } from "antd";

import HomePageContentCardPreview from "../../components/customized-components/HomePageContentCardPreview/HomePageContentCardPreview.component";
import ClinicCardContainer from "../../containers/ClinicCardContainer/ClinicCardContainer.container";

import homePageImg from "../../assets/homepage_image.png";
import IntroductionPart from "../../components/customized-components/IntroductionPart/IntroductionPart.component";
import { useHistory } from "react-router-dom";

import "./HomePage.style.css";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <IntroductionPart homePageImg={homePageImg} />
      <HomePageContentCardPreview />
      <div className="card-clinic-container">
        <div className="card-clinic-title">Top rated dental clinics</div>
        <ClinicCardContainer layoutDirection="row" />
      </div>
      <Row justify="center">
        <Button
          className="viewClinicBtn"
          type="primary"
          shape="round"
          size="large"
          onClick={() => history.push("/clinic")}
        >
          <span>View all dental clinics</span>
        </Button>
      </Row>
    </div>
  );
};

export default HomePage;
