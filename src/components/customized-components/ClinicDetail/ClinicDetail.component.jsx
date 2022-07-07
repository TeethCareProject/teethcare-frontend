import React from "react";
import {
  StarOutlined,
  EnvironmentOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Card, Typography, Image, Row, Col } from "antd";
import "./ClinicDetail.style.scss";
import avtImg from "../../../assets/clinicImg.png";
import FeedbackPreviewComponent from "../FeedbackPreview/FeedbackPreview.component";
import ClinicOperatingTimeMapper from "../../../mapper/ClinicOperatingTimeMapper";
import { getClinicOperatingTime } from "../../../utils/convert.utils";

const ClinicDetailComponent = ({ clinicData, feedback }) => {
  const { Meta } = Card;
  return (
    <>
      <div className="clinic-detail-page-information">
        <div className="clinic-detail-page-information-img">
          <Image
            src={clinicData?.imageUrl}
            alt="clinic-img"
            fallback={avtImg}
          />
        </div>
        <div
          className="clinic-detail-page-information-text"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="clinic-detail-page-information-name"
            style={{ textAlign: "center" }}
          >
            {clinicData?.name}
          </div>
          <div
            className="clinic-detail-page-information-district"
            style={{ textAlign: "center" }}
          >
            {clinicData?.location?.ward?.district?.name}{" "}
          </div>
          <div>
            <div className="clinic-detail-page-information-rating">
              <StarOutlined /> {clinicData?.avgRatingScore}
            </div>
          </div>
        </div>
        <div className="clinic-detail-page-information-address-pc">
          <div className="clinic-detail-page-information-address-title">
            <EnvironmentOutlined /> Clinic address
          </div>
          <div>{clinicData?.location?.address}</div>
          <div>
            <Typography.Title level={4} style={{ margin: "0 auto" }}>
              <div>Operating Hours: </div>
            </Typography.Title>
            <div>Morning: {getClinicOperatingTime(clinicData, "morning")}</div>
            <div>Evening: {getClinicOperatingTime(clinicData, "evening")}</div>
          </div>
        </div>
      </div>
      <div className="clinic-detail-page-banner">
        <Image src={clinicData?.imageUrl} alt="clinic-img" fallback={avtImg} />
      </div>
      <div className="clinic-detail-page-information-address-mobile">
        <div className="clinic-detail-page-information-address-title">
          <EnvironmentOutlined /> Clinic address
        </div>
        <div>{clinicData?.location?.address}</div>
        <div>
          <Typography.Title level={4} style={{ margin: "0 auto" }}>
            <div>Operating Hours: </div>
          </Typography.Title>
          <div>
            Morning:{" "}
            {ClinicOperatingTimeMapper(clinicData)?.startTimeShift1 +
              ":00 - " +
              ClinicOperatingTimeMapper(clinicData)?.endTimeShift1 +
              ":00"}
          </div>
          <div>
            Evening:{" "}
            {ClinicOperatingTimeMapper(clinicData)?.startTimeShift2 +
              ":00 - " +
              ClinicOperatingTimeMapper(clinicData)?.endTimeShift2 +
              ":00"}
          </div>
        </div>
      </div>
      <div className="clinic-detail-page-description">
        <Typography.Title level={3}>About us:</Typography.Title>
        <div>{clinicData?.description}</div>
      </div>
      <div className="clinic-detail-page-feedback-container">
        <div style={{ fontSize: "2em", fontWeight: "bold" }}>Feedbacks</div>
        <FeedbackPreviewComponent feedbacks={feedback?.content} />
      </div>
      <div className="clinic-detail-page-service-container">
        <div className="clinic-detail-page-services-title">Our services:</div>
        <Row justify="space-around" className="clinic-card-list-row">
          {clinicData?.serviceOfClinicResponses
            ?.filter((service, index) => index <= 5)
            .map((service, index) => (
              <Col key={index} span={6}>
                <Card
                  className="clinic-card-homepage"
                  hoverable
                  //   style={{ height: 300 }}
                  cover={
                    <Image
                      alt="example"
                      src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                      style={{ height: 250 }}
                    />
                  }
                  onClick={service.onClick}
                >
                  <Meta
                    title={service?.name}
                    description={service?.description}
                  />
                </Card>
              </Col>
            ))}
        </Row>
        <div className="service-slider">
          {clinicData?.serviceOfClinicResponses
            ?.filter((service, index) => index <= 5)
            .map((service, index) => (
              <div style={{ width: 200, marginRight: 50 }}>
                <Card
                  className="clinic-card-homepage"
                  hoverable
                  //   style={{ height: 300 }}
                  cover={
                    <Image
                      alt="example"
                      src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                      style={{ height: 400 }}
                    />
                  }
                  onClick={service.onClick}
                >
                  <Meta
                    title={service?.name}
                    description={service?.description}
                  />
                </Card>
              </div>
            ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100px",
            }}
          >
            <RightCircleOutlined
              style={{ color: "#3A8EF6", fontSize: "200%" }}
            />
            <div style={{ width: 60, textAlign: "center" }}>See All</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicDetailComponent;
