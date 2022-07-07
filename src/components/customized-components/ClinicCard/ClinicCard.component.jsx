import React from "react";
import { Button, Image } from "antd";
import { EnvironmentFilled, StarFilled } from "@ant-design/icons";
import clinicImg from "../../../assets/clinicImg.png";

const ClinicCardComponent = ({ clinic }) => {
  return (
    <div
      className="clinic-card-element"
      style={{
        display: "flex",
        width: "60vw",
        alignItems: "center",
        border: "1px solid #d6cbcb",
        borderRadius: "10px",
        marginBottom: "60px",
        position: "relative",
      }}
    >
      <div style={{ width: "40%" }}>
        <Image src={clinic?.imageUrl} alt="clinic-img" fallback={clinicImg} />
      </div>
      <div
        style={{ marginLeft: "20px", width: "50%" }}
        className="clinic-card-content"
      >
        <div
          className="clinic-name"
          style={{ fontSize: "1.8em", fontWeight: "bold", marginBottom: 5 }}
        >
          {clinic.name}
        </div>
        <div
          className="card-clinic-specialization"
          style={{ marginBottom: 10 }}
        >
          {clinic.serviceOfClinicResponses.map((service, index) => (
            <span key={index}>
              {index === 0 ? "" : "-"} {service?.name}
            </span>
          ))}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          className="clinic-address"
        >
          <EnvironmentFilled style={{ marginRight: 5 }} />{" "}
          <span style={{ marginRight: "5px" }}>
            {clinic.location.ward.district.name +
              " - " +
              clinic.location.ward.district.province.name}
          </span>
        </div>
        <div className="card-home-page-rating">
          <div>{clinic.avgRatingScore}</div>
          <StarFilled style={{ color: "#FFCB45", marginLeft: 3 }} />
        </div>
        <div
          style={{
            position: "absolute",
            right: "3%",
            bottom: "5%",
          }}
          className="card-clinic-clinic-page-button"
        >
          <Button
            className="view-detail-btn"
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
