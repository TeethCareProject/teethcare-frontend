import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./AdminDashboardPage.tabs";
import { Space, Typography } from "antd";
import { useSelector } from "react-redux";
import AccountStatusConstants from "../../constants/AccountStatusConstants";

const AdminDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const status = useSelector((state) => state.authentication.user?.status);

  return (
    <>
      {status === AccountStatusConstants.PENDING ? (
        <div>Your account is processing. Please waiting...</div>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
};

export default AdminDashboardPage;
