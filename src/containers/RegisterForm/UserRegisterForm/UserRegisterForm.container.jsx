import React from "react";
import { notification } from "antd";
import { patientRegisterAPI } from "../../../services/teeth-apis/RegisterController";
import { useHistory } from "react-router-dom";
import UserRegisterForm from "../../../components/forms/UserRegisterForm/UserRegisterForm";

const UserRegisterFormContainer = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const { data } = await patientRegisterAPI(
        values.username,
        values.password,
        values.confirmPassword,
        values.firstName,
        values.lastName,
        values.gender,
        values.patientEmail,
        values.phoneNumber
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
      <UserRegisterForm onFinish={onFinish} />
    </>
  );
};

export default UserRegisterFormContainer;
