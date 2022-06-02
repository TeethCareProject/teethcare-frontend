import React from "react";
import { Button } from "antd";
import { EnvironmentFilled, StarFilled } from "@ant-design/icons";
import "./ClinicCard.style.scss";
import clinicImg from "../../../assets/clinicImg.png";

const ClinicCardComponent = ({ clinic, onClick }) => {
  return (
    <div className="card-clinic-clinic-page-container">
      <div className="card-clinic-clinic-page-image">
        <img src={clinicImg} alt="clinic" />
      </div>
      <div className="card-clinic-clinic-page">
        <div className="card-clinic-clinic-page-name">{clinic.name}</div>
        <div className="card-clinic-specialization">
          {clinic.serviceOfClinicResponses.map((service, index) => (
            <span key={index}>
              {index === 0 ? "" : "-"} {service?.name}
            </span>
          ))}
        </div>
        <div className="card-clinic-location">
          <EnvironmentFilled />{" "}
          <span>
            {clinic.location.ward.district.name +
              " - " +
              clinic.location.ward.district.province.name}
          </span>
        </div>
        <div className="card-home-page-rating">
          <div>{clinic.avgRatingScore}</div>
          <StarFilled style={{ color: "#FFCB45" }} />
        </div>
        <div className="card-clinic-clinic-page-button">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => onClick(clinic.id)}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCardComponent;
