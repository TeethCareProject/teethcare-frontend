import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout.component";
import { elementList, navigationList } from "./PatientDashboardPage.tabs";

const PatientDashboardPage = () => {
  const { tab } = useParams();
  const [currentTab, setCurrentTab] = useState(tab ? tab : 0);

  return (
    <DashboardLayout
      navigationList={navigationList.map((item, index) => ({
        ...item,
        onClick: () => setCurrentTab(index),
      }))}
      elementList={elementList}
      currentTab={currentTab}
    />
  );
};

export default PatientDashboardPage;
