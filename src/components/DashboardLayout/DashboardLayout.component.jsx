import React from "react";
import { Row, Col, Space } from "antd";
import DashboardSideBarComponent from "../DashboardNavigationSideBar/NavigationSideBar.component";

const DashboardLayout = ({ navigationList, elementList, currentTab }) => {
  return (
    <>
      <Row>
        <Col>
          <DashboardSideBarComponent items={navigationList} />
        </Col>
        <Col flex="auto">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {elementList[currentTab]}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardLayout;
