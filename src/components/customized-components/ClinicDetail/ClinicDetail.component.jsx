import React from "react";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card, Typography, Image } from "antd";
import "./ClinicDetail.style.scss";
import avtImg from "../../../assets/clinicImg.png";
import FeedbackPreviewComponent from "../FeedbackPreview/FeedbackPreview.component";
import { convertMillisecondsToHour } from "../../../utils/convert.utils";

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
        <div>
          <div className="clinic-detail-page-information-name">
            {clinicData?.name}
          </div>
          <div className="clinic-detail-page-information-district">
            {clinicData?.location?.ward?.district?.name}{" "}
          </div>
          <div>
            <div className="clinic-detail-page-information-rating">
              <StarOutlined /> {clinicData?.avgRatingScore}
            </div>
          </div>
        </div>
        <div className="clinic-detail-page-information-address">
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
              {convertMillisecondsToHour(clinicData?.startTimeShift1) +
                " - " +
                convertMillisecondsToHour(clinicData?.endTimeShift1)}
            </div>
            <div>
              Evening:{" "}
              {convertMillisecondsToHour(clinicData?.startTimeShift2) +
                " - " +
                convertMillisecondsToHour(clinicData?.endTimeShift2)}
            </div>
          </div>
        </div>
      </div>
      <div className="clinic-detail-page-banner">
        <Image src={clinicData?.imageUrl} alt="clinic-img" fallback={avtImg} />
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
        <div className="clinic-detail-page-services">
          {clinicData?.serviceOfClinicResponses?.map((service, index) => (
            <Card
              key={index}
              hoverable
              style={{ width: 400, height: 400 }}
              //TODO: change img Url
              cover={
                <img
                  alt="example"
                  src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                />
              }
              onClick={service.onClick}
            >
              <Meta title={service?.name} description={service?.description} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClinicDetailComponent;
