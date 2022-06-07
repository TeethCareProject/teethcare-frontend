<<<<<<<< HEAD:src/containers/ClinicCard/ClinicCard.container.jsx
import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, notification, Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import RoutePath from "../../routers/Path";

import clinicImg from "../../assets/clinicImg.png";
import { useHistory, generatePath } from "react-router-dom";

import { getClinics } from "../../services/teeth-apis/ClinicController";

import ClinicCardComponent from "../../components/customized-components/ClinicCard/ClinicCard.component";

const ClinicCardContainer = ({ clinicData, layoutDirection }) => {
  const history = useHistory();

  const handleClick = (clinicId) => {
    history.push(
      generatePath(RoutePath.CLINIC_DETAIL_PAGE, {
        clinicId,
      })
    );
  };
========
import React, { Fragment } from "react";
import { Row, Col, Card } from "antd";

import clinicImg from "../../assets/clinicImg.png";
import { StarFilled } from "@ant-design/icons";

import ClinicCardComponent from "../../components/customized-components/ClinicCard/ClinicCard.component";
import "./ClinicCardList.style.scss";
>>>>>>>> TEET-86:src/components/ClinicCardList/ClinicCardList.component.jsx

const ClinicCardListComponent = ({ layoutDirection, listData }) => {
  const { Meta } = Card;
<<<<<<<< HEAD:src/containers/ClinicCard/ClinicCard.container.jsx
  const [clinics, setClinics] = useState([]);

  var filterClinicArray = clinicData || clinics;

  const fetchingClinic = async () => {
    try {
      const { data } = await getClinics();
      const mapperClinicData = data?.content?.map((clinic) => ({
        ...clinic,
        onClick: () => handleClick(clinic?.id),
      }));
      setClinics(mapperClinicData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching clinic, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchingClinic();
  }, []);

========
>>>>>>>> TEET-86:src/components/ClinicCardList/ClinicCardList.component.jsx
  return (
    <Fragment>
      {layoutDirection === "row" ? (
        <Row justify="space-between">
          {listData
            ?.filter((clinic, index) => index <= 2)
            .map((clinic, index) => (
              <Col key={index} span={6}>
                <Card
                  className="clinic-card-homepage"
                  hoverable
                  //   style={{ height: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={clinicImg}
                      style={{ height: 400 }}
                    />
                  }
                  onClick={clinic.onClick}
                >
                  <Meta
                    className="card-clinic-content"
                    description={
                      <div>
                        <div className="card-clinic-description">
                          {clinic?.name} - {clinic.location?.address}
                        </div>
                        <div className="card-home-page-rating">
                          <div style={{ color: "#FFCB45" }}>
                            {`${clinic.avgRatingScore} `}
                          </div>
                          <StarFilled style={{ color: "#FFCB45" }} />
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      ) : (
        <div className="card-clinic-preview">
          {listData?.map((clinic, index) => (
            <div key={index}>
<<<<<<<< HEAD:src/containers/ClinicCard/ClinicCard.container.jsx
              <ClinicCardComponent
                clinic={clinic}
                handleClick={clinic.onClick}
              />
========
              <ClinicCardComponent clinic={clinic} />
>>>>>>>> TEET-86:src/components/ClinicCardList/ClinicCardList.component.jsx
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClinicCardListComponent;
