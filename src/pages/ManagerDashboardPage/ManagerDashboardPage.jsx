import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./ManagerDashboardPage.tabs";
import CreateStaffModalContainer from "../../containers/CreateStaffModal/CreateStaffModal.container";
import { useParams } from "react-router-dom";

const ManagerDashboardPage = () => {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab ? tab : 0);

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
      <CreateStaffModalContainer />
    </>
  );
};

export default ManagerDashboardPage;
