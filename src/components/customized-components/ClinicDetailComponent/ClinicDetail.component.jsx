import React from "react";
// import {}

const ClinicDetailComponent = (props) => {
  return (
    <div>
      <div>
        <img src={props.imgSrc} alt="clinic-img" />
      </div>
      <div>
        <div>{props.name}</div>
        <div>{props.location.ward.district.name} </div>
        <div>
          <div></div>
          <div>{props.avgRatingScore}</div>
          <div></div>
        </div>
      </div>
      <div>
        <div>Clinic address</div>
      </div>
    </div>
  );
};

export default ClinicDetailComponent;
