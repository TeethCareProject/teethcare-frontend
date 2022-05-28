import React from "react";
import { Col, Row, Card } from "antd";
import cardHomePage1 from "../../../assets/cardImg1.png";
import cardHomePage2 from "../../../assets/cardImg2.png";
import cardHomePage3 from "../../../assets/cardImg3.png";

import CardHomePageContent from "../CardHomePageContent/CardHomePageContent";

const CardHomePageContentPreview = () => {
  return (
    <div>
      <Row className="site-card-wrapper" justify="space-around">
        <Col span={5}>
          <Card className="card" bordered={false}>
            <CardHomePageContent
              context={{
                imgUrl: cardHomePage1,
                title: "24/24 Supporting",
                description:
                  "Contact with us whenever you want, take advantage of the free advice of our experts",
              }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card className="card" bordered={false}>
            <CardHomePageContent
              context={{
                imgUrl: cardHomePage2,
                title: "Medical Check Up",
                description:
                  "Post-examination to give you the most suitable service you need",
              }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card className="card" bordered={false}>
            <CardHomePageContent
              context={{
                imgUrl: cardHomePage3,
                title: "Best Offer",
                description:
                  "Reducer the price of your offer if you find somewhere cheaper on others website",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardHomePageContentPreview;
