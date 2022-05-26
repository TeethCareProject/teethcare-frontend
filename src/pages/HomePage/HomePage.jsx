import React, { Fragment, useState } from "react";
import { Col, Row, Button, Card, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import CardHomePageContent from "../../components/CardHomePageContent/CardHomePageContent";
import CardHomePageClinic from "../../components/CardHomePageClinic/CardHomePageClinic";

import homePageImg from "../../assets/homepage_image.png";
import cardHomePage1 from "../../assets/cardImg1.png";
import cardHomePage2 from "../../assets/cardImg2.png";
import cardHomePage3 from "../../assets/cardImg3.png";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClinicsAPI } from "../../services/teeth-apis/ClinicController";
import setClinicStorageHandler from "../../redux/clinic/clinic.action";
import { useHistory } from "react-router-dom";

import "./HomePage.style.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const clinics = useSelector((state) => state.clinics.clinics);
  console.log(clinics);

  useEffect(() => {
    const getClinic = async () => {
      const clinicsArray = await getClinicsAPI();
      dispatch(setClinicStorageHandler(clinicsArray.data));
    };
    getClinic().catch(console.error);
  }, []);
  return (
    <div>
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
              size="large"
              icon={<SearchOutlined />}
            >
              Find your clinic now!
            </Button>
          </Col>
          <Col>
            <img src={homePageImg} alt="HomePageImage" />
          </Col>
        </Row>
      </div>
      <div>
        <Row className="site-card-wrapper" justify="space-around">
          <Col span={5}>
            <Card className="card" bordered={false}>
              <CardHomePageContent
                context={{
                  imgUrl: cardHomePage1,
                  title: "24/24 Supporting",
                  description:
                    "Contact with us whenever you want, take advantage of the free advice of our experts",
                }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="card" bordered={false}>
              <CardHomePageContent
                context={{
                  imgUrl: cardHomePage2,
                  title: "Medical Check Up",
                  description:
                    "Post-examination to give you the most suitable service you need",
                }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="card" bordered={false}>
              <CardHomePageContent
                context={{
                  imgUrl: cardHomePage3,
                  title: "Best Offer",
                  description:
                    "Reducer the price of your offer if you find somewhere cheaper on others website",
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="card-clinic-container">
        <div className="card-clinic-title">Top rated dental clinics</div>
        <Row justify="space-between">
          {clinics
            .filter((clinic) => clinic.id <= 4)
            .map((clinic) => (
              <Col span={7}>
                <CardHomePageClinic key={clinic.id} clinic={clinic} />
              </Col>
            ))}
        </Row>
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
