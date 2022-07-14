import React from "react";
import { Row, Col } from "antd";
import DashboardSideBarComponent from "../DashboardNavigationSideBar/NavigationSideBar.component";
import "./DashboardLayout.style.scss";

const DashboardLayout = ({ navigationList, elementList, currentTab }) => {
  return (
    <>
      <Row className="dashboard-menu-md">
        <DashboardSideBarComponent
          items={navigationList}
          selectedKey={navigationList[currentTab].key}
          mode="horizontal"
        />
      </Row>
      <Row
        className="dashboard"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col span={4} className="dashboard-menu-lg">
          <DashboardSideBarComponent
            items={navigationList}
            selectedKey={navigationList[currentTab].key}
            mode="inline"
          />
        </Col>
        <Col flex="auto" sm={24} md={20} lg={20}>
          <div>{elementList[currentTab]}</div>
        </Col>
      </Row>
      <Row className="dashboard-menu-sm">
        <DashboardSideBarComponent
          items={navigationList}
          selectedKey={navigationList[currentTab].key}
          mode="horizontal"
        />
      </Row>
    </>
  );
};

export default DashboardLayout;
