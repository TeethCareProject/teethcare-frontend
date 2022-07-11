import React from "react";
import { Divider, Button, Typography } from "antd";
import clinicImg from "../../../assets/clinicImg.png";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./ServiceDetail.style.scss";

const ServiceDetailComponent = ({ service, bookingHandler, returnHandler }) => {
  return (
    <div className="service-detail-page" style={{ margin: "20px 30px" }}>
      <div className="service-detail-container">
        <div style={{ width: "100%" }}>
          <div
            className="service-image-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <img
                style={{ width: "100%", height: "35vh", marginRight: "20px" }}
                src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                alt="serviceImg"
              />
              <div
                className="service-content-container"
                style={{ width: "50vw" }}
              >
                <div>
                  <div>
                    <Typography.Title level={2} style={{ marginBottom: 10 }}>
                      {service?.name}
                    </Typography.Title>
                    <Typography.Title level={4}>Description:</Typography.Title>
                    <div>{service.description}</div>
                  </div>
                  <div>
                    <Typography.Title level={4}>Price</Typography.Title>
                    <div>{service.price + " "} VND</div>
                  </div>
                  <div>
                    <Typography.Title level={4}>Duration</Typography.Title>
                    <div>{`${service.duration} month`}</div>
                  </div>
                </div>
                <Divider />
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={bookingHandler}
                >
                  Booking this service
                </Button>
              </div>
              <div
                className="service-clinic-info"
                style={{
                  display: "flex",
                  marginTop: "28px",
                  border: "1px solid #d6cbcb",
                  borderRadius: "10px",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => returnHandler()}
              >
                <div style={{ width: "45%", height: "100%" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={clinicImg}
                    alt="clinicImage"
                  />
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    lineHeight: "2.5em",
                    fontSize: "1.2em",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {service?.clinic?.name}
                  </div>
                  <div className="service-clinic-location">
                    <EnvironmentOutlined />{" "}
                    {service.clinic?.location.ward.district.name}
                  </div>
                  <div className="service-clinic-rating">
                    <StarOutlined /> {service.clinic?.avgRatingScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailComponent;
