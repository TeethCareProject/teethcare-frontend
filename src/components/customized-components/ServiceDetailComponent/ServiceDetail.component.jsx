import React from "react";
import { Divider, Button } from "antd";
import clinicImg from "../../../assets/clinicImg.png";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";

const ServiceDetailComponent = ({ service }) => {
  return (
    <div style={{ margin: "20px 30px" }}>
      <div style={{ fontSize: "2em", fontWeight: "bold", marginBottom: 10 }}>
        {service.name}
      </div>
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
            <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              Description:
            </div>
            <div>{service.description}</div>
          </div>
          <div>
            <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>Price</div>
            <div>{service.money}VND</div>
          </div>
          <div>
            <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              Duration
            </div>
            <div>{`${service.duration} month`}</div>
          </div>
          <Divider />
          <Button type="primary" shape="round" size="large">
            Send request to clinic
          </Button>
          <div style={{ display: "flex", marginTop: "35px" }}>
            <div>
              <img
                style={{ width: "20vw", height: "15vw" }}
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
              <div style={{ fontWeight: "bold" }}>{service.clinic.name}</div>
              <div>
                <EnvironmentOutlined /> {service.clinic.location.address}
              </div>
              <div>
                <StarOutlined /> {service.clinic.avgRatingScore}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailComponent;
