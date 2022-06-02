import React from "react";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import "./ClinicDetail.style.scss";
import avtImg from "../../../assets/clinicImg.png";
import FeedbackPreviewComponent from "../FeedbackPreview/FeedbackPreview.component";

const ClinicDetailComponent = ({ currentClinic, feedback }) => {
  const { Meta } = Card;

  return (
    <>
      <div className="clinic-detail-page-information">
        <div className="clinic-detail-page-information-img">
          <img src={avtImg} alt="clinic-img" />
        </div>
        <div>
          <div className="clinic-detail-page-information-name">
            {currentClinic?.name}
          </div>
          <div className="clinic-detail-page-information-district">
            {currentClinic?.location?.ward?.district.name}{" "}
          </div>
          <div>
            <div className="clinic-detail-page-information-rating">
              <StarOutlined /> {currentClinic?.avgRatingScore}
            </div>
            <div></div>
          </div>
        </div>
        <div className="clinic-detail-page-information-address">
          <div className="clinic-detail-page-information-address-title">
            <EnvironmentOutlined /> Clinic address
          </div>
          <div>{currentClinic?.location?.address}</div>
          <Button shape="round" type="primary" size="large">
            Send request to clinic
          </Button>
        </div>
      </div>
      <div className="clinic-detail-page-banner">
        <img src={avtImg} alt="clinic-img" />
      </div>
      <div className="clinic-detail-page-description">
        {currentClinic.description}
      </div>
      <div className="clinic-detail-page-feedback-container">
        <div style={{ fontSize: "2em", fontWeight: "bold" }}>Feedbacks</div>
        <FeedbackPreviewComponent feedbacks={feedback.content} />
      </div>
      <div className="clinic-detail-page-service-container">
        <div className="clinic-detail-page-services-title">Our services:</div>
        <div className="clinic-detail-page-services">
          {currentClinic.serviceOfClinicResponses?.map((service, index) => (
            <Card
              key={index}
              hoverable
              style={{ width: 400, height: 400 }}
              cover={
                <img
                  alt="example"
                  src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                />
              }
            >
              <Meta title={service.name} description={service.description} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClinicDetailComponent;
