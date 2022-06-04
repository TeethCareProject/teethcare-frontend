import React, { useState } from "react";
import { Modal, Button, Tabs } from "antd";

import CustomerServiceCreateFormContainer from "../CustomerServiceCreateForm/CustomerServiceCreateForm.container";
import DentistCreateFormContainer from "../DentistCreateForm/DentistCreateForm.container";

const CreateStaffModalContainer = () => {
  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Create Staff"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Customer Service" key="1">
            <CustomerServiceCreateFormContainer />
          </TabPane>
          <TabPane tab="Dentist" key="2">
            <DentistCreateFormContainer />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CreateStaffModalContainer;
