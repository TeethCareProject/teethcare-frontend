import React from "react";
import { Col, Row, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./IntroductionPart.style.scss";
import RoutePath from "../../../routers/Path";

const IntroductionPartComponent = ({ homePageImg }) => {
  const history = useHistory();
  return (
    <div className="introduction-part">
      <Row justify="space-around" align="middle">
        <Col>
          <div className="title">TeethCare - A home for your teeth</div>
          <div className="description">
            <div>Care for you and your smile</div>
            <div>Catering to all your dental needs and desires</div>
          </div>
          <Button
            className="findBtn"
            type="primary"
            shape="round"
            icon={<SearchOutlined />}
            onClick={() => history.push(RoutePath.CLINIC_PAGE)}
          >
            Find your clinic now!
          </Button>
        </Col>
        <Col>
          <img src={homePageImg} alt="HomePageImage" />
        </Col>
      </Row>
    </div>
  );
};

export default IntroductionPartComponent;
