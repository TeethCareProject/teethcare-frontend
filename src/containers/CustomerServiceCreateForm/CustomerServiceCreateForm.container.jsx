import React from "react";
import { notification } from "antd";
import { customerServiceCreateAccount } from "../../../services/teeth-apis/RegisterController";
//because format of cs register is the same as patient
import PatientFormValueToPatientRegisterData from "../../../mapper/PatientFormValueToPatientRegisterData";

import CustomerServiceRegisterFormComponent from "../../components/forms/CustomerServiceCreateFormComponent/CustomerServiceCreateForm.component";

const CustomerServiceCreateFormContainer = () => {
  const onFinish = async (values) => {
    try {
      await customerServiceCreateAccount(
        PatientFormValueToPatientRegisterData(values)
      );
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
      <CustomerServiceRegisterFormComponent onFinish={onFinish} />
    </>
  );
};

export default CustomerServiceCreateFormContainer;
