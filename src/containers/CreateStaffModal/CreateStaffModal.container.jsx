import React, { useState } from "react";
import { Modal, Button, Tabs } from "antd";

import CustomerServiceRegisterFormComponent from "../../components/forms/CustomerServiceCreateForm/CustomerServiceCreateForm.component";

import DentistCreateFormComponent from "../../components/forms/DentistCreateForm/DentistCreateForm.component";
import DentistFormValueToDentistData from "../../mapper/DentistFormValueToDentistData";

import { RoleConstant } from "../../constants/RoleConstants";

import { notification } from "antd";
import {
  customerServiceCreateAccount,
  dentistCreateAccount,
} from "../../services/teeth-apis/RegisterController";
import PatientFormValueToPatientRegisterData from "../../mapper/PatientFormValueToPatientRegisterData";

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

  const onFinish = async (values, role) => {
    try {
      if (role === RoleConstant.CUSTOMER_SERVICE) {
        await customerServiceCreateAccount(
          PatientFormValueToPatientRegisterData(values)
        );
      } else {
        await dentistCreateAccount(DentistFormValueToDentistData(values));
      }
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while register, try again later`,
        duration: 2,
      });
    }
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
            <CustomerServiceRegisterFormComponent
              onFinish={(e) => onFinish(e, RoleConstant.CUSTOMER_SERVICE)}
            />
          </TabPane>
          <TabPane tab="Dentist" key="2">
            <DentistCreateFormComponent
              onFinish={(e) => onFinish(e, RoleConstant.DENTIST)}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CreateStaffModalContainer;
