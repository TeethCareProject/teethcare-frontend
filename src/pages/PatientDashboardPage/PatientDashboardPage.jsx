import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { navigationList } from "./PatientDashboardPage.tabs";

const elementList = [
  <div>Dashboard element</div>,
  <div>My booking</div>,
  <div>My appointment</div>,
];

const ManagerDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <h1>My Dashboard</h1>
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
