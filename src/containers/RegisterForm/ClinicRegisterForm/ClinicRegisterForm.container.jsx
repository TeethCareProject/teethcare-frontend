import React from "react";
import { managerRegister } from "../../../services/teeth-apis/RegisterController";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

import RoutePath from "../../../routers/Path";

import ClinicRegisterFormComponent from "../../../components/forms/ClinicRegisterForm/ClinicRegisterForm.component";
import ClinicFormValueToClinicRegisterData from "../../../mapper/ClinicFormValueToClinicRegisterData";

const ClinicRegisterFormContainer = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      await managerRegister(ClinicFormValueToClinicRegisterData(values));
      history.push(RoutePath.LOGIN_PAGE);
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
      <ClinicRegisterFormComponent onFinishHandle={onFinish} />
    </>
  );
};

export default ClinicRegisterFormContainer;
