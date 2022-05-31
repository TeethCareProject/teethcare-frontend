import React from "react";
import { Button } from "antd";
import { EnvironmentFilled, StarFilled } from "@ant-design/icons";
const CardClinicComponent = (props) => {
  return (
    <div>
      <div>
        <img src={props.imgSrc} alt="clinic" />
      </div>
      <div className="card-clinic-clinic-page">
        <div className="card-clinic-clinic-page-name">{props.name}</div>
        <div className="card-clinic-specialization">
          {props.serviceArray?.map((service, index) => (
            <span key={index}>
              {index == 0 ? "" : "-"} {service?.name}
            </span>
          ))}
        </div>
        <div className="card-clinic-location">
          <EnvironmentFilled />{" "}
          <span>{props.district + " - " + props.province}</span>
        </div>
        <div className="card-home-page-rating">
          <div>{props.avgRatingScore}</div>
          <StarFilled style={{ color: "#FFCB45" }} />
        </div>
        <div>
          <Button type="primary" shape="round" size="large">
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardClinicComponent;
