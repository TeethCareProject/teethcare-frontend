import React from "react";
import { Button } from "antd";
import { EnvironmentFilled, StarFilled } from "@ant-design/icons";
import "./ClinicCard.style.scss";

const ClinicCardComponent = (props) => {
  return (
    <div className="card-clinic-clinic-page-container">
      <div className="card-clinic-clinic-page-image">
        <img src={props.imgSrc} alt="clinic" />
      </div>
      <div className="card-clinic-clinic-page">
        <div className="card-clinic-clinic-page-name">{props.name}</div>
        <div className="card-clinic-specialization">
          {props.serviceArray?.map((service, index) => (
            <span key={index}>
              {index === 0 ? "" : "-"} {service?.name}
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
        <div className="card-clinic-clinic-page-button">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => props.onClick(props.id)}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCardComponent;
