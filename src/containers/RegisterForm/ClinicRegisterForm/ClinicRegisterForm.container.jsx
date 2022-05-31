import React from "react";
import { managerRegisterAPI } from "../../../services/teeth-apis/RegisterController";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

import ClinicRegisterForm from "../../../components/forms/ClinicRegisterForm/ClinicRegisterForm";

const ClinicRegisterFormContainer = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      const { data } = await managerRegisterAPI(
        values.username,
        values.password,
        values.confirmPassword,
        values.firstName,
        values.lastName,
        values.gender,
        values.phoneNumber,
        values.clinicName,
        values.clinicTaxCode,
        values.clinicAddress,
        values.ward
      );
      console.log(data);
      history.push("/login");
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
      <ClinicRegisterForm onFinishHandle={onFinish} />
    </>
  );
};

export default ClinicRegisterFormContainer;
