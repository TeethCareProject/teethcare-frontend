import React, { useState } from "react";
import AccountManagementTableContainer from "../../containers/AccountManagementTable/AccountManagementTable.container";
import ReportManagementTableContainer from "../../containers/ReportManagementTable/ReportManagementTable.container";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { navigationList } from "./AdminDashboardPage.tabs";
import { Space, Typography } from "antd";

const elementList = [
  <div>Dashboard element</div>,
  <AccountManagementTableContainer />,
  <ReportManagementTableContainer />,
  <div>account request</div>,
];

const AdminDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Space style={{ padding: "1rem 0" }}>
        <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      </Space>
      <DashboardLayout
        navigationList={navigationList.map((item, index) => ({
          ...item,
          onClick: () => setCurrentTab(index),
        }))}
        elementList={elementList}
        currentTab={currentTab}
      />
    </>
  );
};

export default AdminDashboardPage;
