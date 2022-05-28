import React from "react";
import { StarFilled } from "@ant-design/icons";
import "./CardHomePageClinic.style.css";
import clinicImage from "../../../assets/clinicImg.png";

const CardHomePageClinic = ({ clinic }) => {
  return (
    <div className="card-home-page-clinic">
      <div className="card-home-page-image">
        <img src={clinicImage} alt="clinic" />
      </div>
      <div className="card-home-page-detail">
        <div>
          {clinic?.name} - {clinic.location?.ward?.district?.name}
        </div>
        <div className="card-home-page-rating">
          <div>{clinic.avgRatingScore}</div>
          <StarFilled style={{ color: "#FFCB45" }} />
        </div>
      </div>
    </div>
  );
};

export default CardHomePageClinic;
