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
          <Space
            align="center"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {elementList[currentTab]}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default DashboardLayout;
