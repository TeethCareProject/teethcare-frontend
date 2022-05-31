import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import {
  elementList,
  navigationList,
} from "./CustomerServiceDashboardPage.tabs";

const CustomerServiceDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <h1>Customer service Dashboard</h1>
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
