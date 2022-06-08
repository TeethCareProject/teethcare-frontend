import React from "react";
import { Row, Button } from "antd";

import HomePageContentCardPreviewComponent from "../../components/customized-components/HomePageContentCardPreview/HomePageContentCardPreview.component";
import ClinicCardContainer from "../../containers/ClinicCard/ClinicCard.container";
import RoutePath from "../../routers/Path";
import homePageImg from "../../assets/homepage_image.png";
import IntroductionPartComponent from "../../components/customized-components/IntroductionPart/IntroductionPart.component";
import { useHistory } from "react-router-dom";

import "./HomePage.style.css";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <IntroductionPartComponent homePageImg={homePageImg} />
      <HomePageContentCardPreviewComponent />
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
          onClick={() => history.push(RoutePath.CLINIC_PAGE)}
        >
          <span>View all dental clinics</span>
        </Button>
      </Row>
    </div>
  );
};

export default HomePage;
