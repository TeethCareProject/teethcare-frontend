import React from "react";
import { Button } from "antd";
import { EnvironmentFilled, StarFilled } from "@ant-design/icons";
import clinicImg from "../../../assets/clinicImg.png";

const ClinicCardComponent = ({ clinic }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "60vw",
        alignItems: "center",
        border: "1px solid #d6cbcb",
        borderRadius: "10px",
        marginBottom: "60px",
      }}
    >
      <div>
        <img style={{ height: "300px" }} src={clinicImg} alt="clinic" />
      </div>
      <div style={{ lineHeight: "3em", marginLeft: "20px", width: "50%" }}>
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          {clinic.name}
        </div>
        <div className="card-clinic-specialization">
          {clinic.serviceOfClinicResponses.map((service, index) => (
            <span key={index}>
              {index === 0 ? "" : "-"} {service?.name}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EnvironmentFilled />{" "}
          <span style={{ marginRight: "5px" }}>
            {clinic.location.ward.district.name +
              " - " +
              clinic.location.ward.district.province.name}
          </span>
        </div>
        <div className="card-home-page-rating">
          <div>{clinic.avgRatingScore}</div>
          <StarFilled style={{ color: "#FFCB45" }} />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="card-clinic-clinic-page-button"
        >
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={clinic.onClick}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCardComponent;
