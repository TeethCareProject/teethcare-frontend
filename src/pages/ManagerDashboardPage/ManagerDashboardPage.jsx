import React, { useState } from "react";
import StaffManagementTableContainer from "../../containers/StaffManagementTable/StaffManagementTable.container";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { navigationList } from "./ManagerDashboardPage.tabs";

const elementList = [
  <div>Dashboard element</div>,
  <StaffManagementTableContainer />,
  <div>Report request</div>,
];

const ManagerDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <h1>Manager Dashboard</h1>
      </div>
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

export default ManagerDashboardPage;
