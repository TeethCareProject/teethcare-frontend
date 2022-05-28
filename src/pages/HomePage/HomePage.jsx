import React from "react";
import { Row, Button } from "antd";

import CardHomePageContentPreview from "../../components/customized-components/CardHomePageContentPreview/CardHomePageContentPreview";
import CardClinicContainer from "../../containers/CardClinicContainer/CardClinicContainer";

import homePageImg from "../../assets/homepage_image.png";
import IntroductionPart from "../../components/customized-components/IntroductionPart/IntroductionPart";
import { useHistory } from "react-router-dom";

import "./HomePage.style.css";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <IntroductionPart homePageImg={homePageImg} />
      <CardHomePageContentPreview />
      <div className="card-clinic-container">
        <div className="card-clinic-title">Top rated dental clinics</div>
        <CardClinicContainer layoutDirection="row" />
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
