import React, { Fragment } from "react";
import { Row, Col, Card } from "antd";

import clinicImg from "../../assets/clinicImg.png";
import { StarFilled } from "@ant-design/icons";

import ClinicCardComponent from "../../components/customized-components/ClinicCard/ClinicCard.component";
import "./ClinicCardList.style.scss";

const ClinicCardListComponent = ({ layoutDirection, listData }) => {
  const { Meta } = Card;
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
              <ClinicCardComponent clinic={clinic} />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClinicCardListComponent;
