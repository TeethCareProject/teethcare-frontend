import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./DentistDashboardPage.tabs";

const DentistDashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <h1>Dentist Dashboard</h1>
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

export default DentistDashboardPage;
