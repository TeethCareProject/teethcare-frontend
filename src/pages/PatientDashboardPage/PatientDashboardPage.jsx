import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./PatientDashboardPage.tabs";

const ManagerDashboardPage = () => {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab ? tab : 0);

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <h1>Patient Dashboard</h1>
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
