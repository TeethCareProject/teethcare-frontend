import React from "react";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
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
      <Button
        type="primary"
        shape="round"
        size="large"
        icon={<PhoneOutlined />}
      >
        Contact
      </Button>
    </div>
  );
};

export default CardHomePageContent;
