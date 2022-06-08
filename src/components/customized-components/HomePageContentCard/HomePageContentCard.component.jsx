import React from "react";
import "./HomePageContentCard.style.css";

const HomePageContentCardComponent = ({ context }) => {
  return (
    <div className="homepage-card-container">
      <div>
        <img
          className="homepage-card-img"
          src={context.imgUrl}
          alt="CardHomePage"
        />
      </div>
      <div className="homepage-card-content">
        <div className="homepage-card-title">{context.title}</div>
        <div className="homepage-card-description">{context.description}</div>
      </div>
    </div>
  );
};

export default HomePageContentCardComponent;
