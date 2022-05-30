import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { navigationList } from "./CustomerServiceDashboardPage.tabs";

const elementList = [
  <div>Dashboard element</div>,
  <div>Booking managemnt</div>,
  <div>My clinic</div>,
];

const CustomerServiceDashboardPage = () => {
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

export default CustomerServiceDashboardPage;
