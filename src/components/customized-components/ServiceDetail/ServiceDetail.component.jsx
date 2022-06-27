import React from "react";
import { Divider, Button, Typography } from "antd";
import clinicImg from "../../../assets/clinicImg.png";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";

const ServiceDetailComponent = ({ service, bookingHandler }) => {
  return (
    <div style={{ margin: "20px 30px" }}>
      <Typography.Title level={2} style={{ marginBottom: 10 }}>
        {service?.name}
      </Typography.Title>
      <div
        style={{
          display: "flex",
          lineHeight: "2.2em",
        }}
      >
        <div>
          <img
            style={{ width: "50vw", height: "35vw", marginRight: "20px" }}
            src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
            alt="serviceImg"
          />
        </div>
        <div>
          <div>
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
          <Divider />
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={bookingHandler}
          >
            Booking this service
          </Button>
          <div style={{ display: "flex", marginTop: "28px" }}>
            <div>
              <img
                style={{ width: "20vw", height: "14vw" }}
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
              <div style={{ fontWeight: "bold" }}>{service?.clinic?.name}</div>
              <div>
                <EnvironmentOutlined /> {service.clinic?.location.address}
              </div>
              <div>
                <StarOutlined /> {service.clinic?.avgRatingScore}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailComponent;
