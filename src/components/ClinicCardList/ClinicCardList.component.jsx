import React, { Fragment } from "react";
import { Row, Col, Card, Image } from "antd";

import clinicImg from "../../assets/clinicImg.png";
import { StarFilled } from "@ant-design/icons";

import ClinicCardComponent from "../../components/customized-components/ClinicCard/ClinicCard.component";
import "./ClinicCardList.style.scss";

const ClinicCardListComponent = ({ layoutDirection, listData }) => {
  const { Meta } = Card;
  return (
    <Fragment>
      {layoutDirection === "row" ? (
        <>
          <Row justify="space-between" className="clinic-card-list-row">
            {listData
              ?.filter((clinic, index) => index <= 2)
              .map((clinic, index) => (
                <Col key={index} span={6}>
                  <Card
                    className="clinic-card-homepage"
                    hoverable
                    //   style={{ height: 300 }}
                    cover={
                      <Image
                        alt="example"
                        src={clinic?.imageUrl}
                        fallback={clinicImg}
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
          <div className="clinic-slider">
            {listData
              ?.filter((clinic, index) => index <= 5)
              .map((clinic, index) => (
                <div style={{ width: 600, marginRight: 50 }}>
                  <Card
                    className="clinic-card-homepage"
                    hoverable
                    //   style={{ height: 300 }}
                    cover={
                      <Image
                        alt="example"
                        src={clinic?.imageUrl}
                        fallback={clinicImg}
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
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="card-clinic-preview">
          {listData?.map((clinic, index) => (
            <div key={index}>
              <ClinicCardComponent clinic={clinic} />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClinicCardListComponent;
