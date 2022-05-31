import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./AdminDashboardPage.tabs";
import { Space, Typography } from "antd";

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
