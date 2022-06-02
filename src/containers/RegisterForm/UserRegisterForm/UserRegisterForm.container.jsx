import React from "react";
import { notification } from "antd";
import { patientRegisterAPI } from "../../../services/teeth-apis/RegisterController";
import { useHistory } from "react-router-dom";
import UserRegisterFormComponent from "../../../components/forms/UserRegisterForm/UserRegisterForm.component";
import UserFormValueToUserRegisterData from "../../../mapper/UserFormValueToUserRegisterData";

import RoutePath from "../../../routers/Path";
const UserRegisterFormContainer = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      await patientRegisterAPI(UserFormValueToUserRegisterData(values));
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
      <UserRegisterFormComponent onFinish={onFinish} />
    </>
  );
};

export default UserRegisterFormContainer;
