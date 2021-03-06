import React from "react";
import cardHomePage1 from "../../../assets/cardImg1.png";
import cardHomePage2 from "../../../assets/cardImg2.png";
import cardHomePage3 from "../../../assets/cardImg3.png";

import HomePageContentCardComponent from "../HomePageContentCard/HomePageContentCard.component";

import "./HomePageContentCardPreview.style.css";

const HomePageContentCardPreviewComponent = () => {
  return (
    <div>
      <div className="site-card-wrapper" justify="space-around">
        <div className="site-card">
          <HomePageContentCardComponent
            context={{
              imgUrl: cardHomePage1,
              title: "24/24 Supporting",
              description:
                "Contact with us whenever you want, take advantage of the free advice of our experts",
            }}
          />
        </div>
        <div className="site-card">
          <HomePageContentCardComponent
            context={{
              imgUrl: cardHomePage2,
              title: "Medical Check Up",
              description:
                "Post-examination to give you the most suitable service you need",
            }}
          />
        </div>
        <div className="site-card">
          <HomePageContentCardComponent
            context={{
              imgUrl: cardHomePage3,
              title: "Best Offer",
              description:
                "Reducer the price of your offer if you find somewhere cheaper on others website",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContentCardPreviewComponent;
