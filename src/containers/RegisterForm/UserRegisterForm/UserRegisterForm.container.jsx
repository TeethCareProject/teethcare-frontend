import React from "react";
import { notification } from "antd";
import { patientRegisterAPI } from "../../../services/teeth-apis/RegisterController";
import { useHistory } from "react-router-dom";
import UserRegisterForm from "../../../components/forms/UserRegisterForm/UserRegisterForm.component";
import UserFormValueToUserRegisterData from "../../../mapper/UserFormValueToUserRegisterData";
const UserRegisterFormContainer = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      await patientRegisterAPI(UserFormValueToUserRegisterData(values));
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
      <UserRegisterForm onFinish={onFinish} />
    </>
  );
};

export default UserRegisterFormContainer;
