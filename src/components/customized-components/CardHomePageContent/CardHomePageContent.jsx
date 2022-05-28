import React from "react";
import "./CardHomePageContent.style.css";

const CardHomePageContent = ({ context }) => {
  return (
    <div className="homepage_card_container">
      <div>
        <img
          className="homepage_card_img"
          src={context.imgUrl}
          alt="CardHomePage"
        />
      </div>
      <div className="homepage_card_content">
        <div className="homepage_card_title">{context.title}</div>
        <div className="homepage_card_description">{context.description}</div>
      </div>
    </div>
  );
};

export default CardHomePageContent;
