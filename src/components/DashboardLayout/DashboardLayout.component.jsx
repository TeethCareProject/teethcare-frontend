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
      <Row>
        <Col span={4} className="dashboard-menu-lg">
          <DashboardSideBarComponent
            items={navigationList}
            selectedKey={navigationList[currentTab].key}
            mode="inline"
          />
        </Col>
        <Col flex="auto" span={24}>
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
